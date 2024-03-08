const express = require("express");
const { createPrompt, getStoryFromGPT, textToSpeech } = require("./openai.js");

const app = express();

app.use(express.json());

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/analyse", async (request, response) => {
  const imageDescriptions = request.body.descriptions;

  const prompt = createPrompt(imageDescriptions);
  const chatResponse = await getStoryFromGPT(prompt);
  const audioBuffer = await textToSpeech(chatResponse);

  response.set("Content-Type", "audio/mpeg");
  response.send(audioBuffer);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on :${port}`);
});
