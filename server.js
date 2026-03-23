const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// main API
app.post("/contact", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const response = await fetch(
      "https://poojachaudhary.infinityfree.me/myapi/api/saveContact.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
        }),
      }
    );

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    // JSON safe parse
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (err) {
      res.status(500).json({
        message: "PHP not returning JSON",
        raw: text,
      });
    }

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// IMPORTANT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
