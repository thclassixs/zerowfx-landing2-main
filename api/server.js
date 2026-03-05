const express = require("express");
const fs = require("fs");
const fsPromises = require("fs").promises;
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Trust proxy for getting real IP behind nginx/cloudflare
app.set("trust proxy", true);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "CHANGE_THIS_SECRET_IN_PRODUCTION",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour login session
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  })
);

const FILE_PATH = path.join(__dirname, "subscribers.json");
const ADMIN_PAGE = path.join(__dirname, "subscribers.html");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "0fx";

// Simple in-memory rate limiter for /subscribe
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 subscribes per IP per hour

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Ensure JSON file exists
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

// HOME → login page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// ---------- SAVE EMAIL ----------
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: "Email required" });

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Get client IP
    const ip = req.headers['cf-connecting-ip'] ||
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.ip ||
      'unknown';

    // Rate limiting
    if (isRateLimited(ip)) {
      return res.status(429).json({ success: false, message: "Too many requests. Try again later." });
    }

    const raw = await fsPromises.readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);

    // Check if email already exists (check both string and object formats)
    const exists = data.some(entry =>
      (typeof entry === 'string' && entry === email) ||
      (typeof entry === 'object' && entry.email === email)
    );

    if (!exists) {
      // Try to get country from Cloudflare header or IP lookup
      let country = 'Unknown';
      let countryCode = 'XX';

      if (req.headers['cf-ipcountry']) {
        countryCode = req.headers['cf-ipcountry'];
        // Basic country code to name mapping
        const countryNames = {
          'MA': 'Morocco', 'FR': 'France', 'US': 'United States', 'GB': 'United Kingdom',
          'DE': 'Germany', 'ES': 'Spain', 'IT': 'Italy', 'CA': 'Canada', 'JP': 'Japan',
          'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'EG': 'Egypt', 'TN': 'Tunisia',
          'DZ': 'Algeria', 'PT': 'Portugal', 'NL': 'Netherlands', 'BE': 'Belgium'
        };
        country = countryNames[countryCode] || countryCode;
      }

      const subscriber = {
        email: email,
        ip: ip,
        country: country,
        countryCode: countryCode,
        createdAt: new Date().toISOString()
      };

      data.push(subscriber);
      await fsPromises.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------- LOGIN ----------
app.post("/admin/check-password", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// ---------- PROTECTED ROUTE ----------
app.get("/admin/subscribers", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/admin");
  }
  res.sendFile(ADMIN_PAGE);
});

// ---------- API to GET subscribers ----------
app.get("/subscribers", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const raw = await fsPromises.readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    res.json(data);
  } catch (err) {
    console.error("Read subscribers error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
