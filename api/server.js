const express = require("express");
const fs = require("fs");
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
    secret: "VERY_SECRET_KEY_CHANGE_ME",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour login session
  })
);

const FILE_PATH = path.join(__dirname, "subscribers.json");
const ADMIN_PAGE = path.join(__dirname, "subscribers.html");
const ADMIN_PASSWORD = "pass"; // change!

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
  const { email } = req.body;

  if (!email) return res.status(400).json({ success: false, message: "Email required" });

  const data = JSON.parse(fs.readFileSync(FILE_PATH));

  // Check if email already exists (check both string and object formats)
  const exists = data.some(entry => 
    (typeof entry === 'string' && entry === email) ||
    (typeof entry === 'object' && entry.email === email)
  );

  if (!exists) {
    // Get client IP
    const ip = req.headers['cf-connecting-ip'] || 
               req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.ip || 
               'unknown';

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
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  }

  res.json({ success: true });
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
app.get("/subscribers", (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const data = JSON.parse(fs.readFileSync(FILE_PATH));
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));
