const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ TEST route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// ✅ CONTACT API (MAIN)
app.post("/contact", async (req, res) => {
  try {
    console.log("Received:", req.body); // debug

    const response = await fetch(
      "https://poojachaudhary.infinityfree.me/myapi/api/saveContact.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(req.body),
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ❗ IMPORTANT PORT FIX (Render के लिए)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
