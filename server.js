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

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    res.json({ raw: text }); // temporary debug
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

   const text = await response.text();

console.log("PHP RAW RESPONSE:", text);

try {
  const data = JSON.parse(text);
  res.json(data);
} catch (err) {
  res.status(500).json({
    status: "error",
    message: "Invalid response from PHP",
    raw: text,
  });
}
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
