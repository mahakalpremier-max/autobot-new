const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/webhook", (req, res) => {

  const VERIFY_TOKEN = "mahakal123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  }

  res.send("Webhook Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
