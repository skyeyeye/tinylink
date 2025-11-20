const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

router.post("/", async (req, res) => {
    console.log("REQ BODY:", req.body);

  const { targetUrl, code } = req.body;

  // Validate URL
  if (!targetUrl || !isValidUrl(targetUrl)) {
    return res.status(400).json({ error: "Invalid targetUrl" });
  }

//   let finalCode = code;
let finalCode = code && code.trim() !== "" ? code.trim() : null;

  console.log(finalCode)
  // If user gave custom code → validate it
  if (finalCode) {
    if (!CODE_REGEX.test(finalCode)) {
      return res.status(400).json({ error: "Invalid code format" });
    }

    const exists = await Link.findOne({ code: finalCode });
    if (exists) return res.status(409).json({ error: "Code already exists" });
  }

  // Auto-generate code
  if (!finalCode) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    while (true) {
      finalCode = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

      const exists = await Link.findOne({ code: finalCode });
      if (!exists) break;
    }
  }

  const link = await Link.create({
    code: finalCode,
    targetUrl
  });

  return res.status(201).json(link);
});

router.get("/", async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
});

router.get("/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: "Not found" });
  res.json(link);
});

router.delete("/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: "Not found" });

  await Link.deleteOne({ code: req.params.code });
  res.json({ ok: true });
});

module.exports = router;
