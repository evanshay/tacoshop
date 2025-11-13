// index.js
const express = require("express");
const axios = require("axios");
const _ = require("lodash");

// Try to import ESM-only module safely
(async () => {
  try {
    await import("evernote-mcp-server");
    console.log("🧩 Evernote MCP module detected successfully.");
  } catch (err) {
    console.log("⚠️ Could not load evernote-mcp-server (ESM module).");
  }
})();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("🌮 TacoShop initialized!");
console.log("Example lodash usage:", _.shuffle(["beef", "chicken", "fish"]));

// A playful in-memory menu
const tacos = [
  { id: 1, name: "Al Pastor", spice: 7 },
  { id: 2, name: "Carne Asada", spice: 5 },
  { id: 3, name: "Fish Taco", spice: 3 },
  { id: 4, name: "Birria", spice: 8 },
];

// Endpoint: get random taco
app.get("/", async (req, res) => {
  const randomTaco = _.sample(tacos);

  // Try to fetch a taco fact for fun
  let fact = "Tacos are happiness in folded form.";
  try {
    const response = await axios.get("https://taco-1150.twil.io/taco");
    fact = response.data.fact || fact;
  } catch (err) {
    console.log("Could not fetch taco fact, using fallback.");
  }

  res.send(`
    <h1>🌮 Welcome to TacoShop!</h1>
    <p>Today's special: <b>${randomTaco.name}</b> (Spice level ${randomTaco.spice}/10)</p>
    <p><i>${fact}</i></p>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ TacoShop is serving on port ${PORT}`);
});
