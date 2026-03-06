fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json").then(res => res.json()).then(data => { console.log("XAU:", data.usd.xau); }).catch(console.error);
