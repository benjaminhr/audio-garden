const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getStoryFromGPT(content) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
    temperature: 0,
    max_tokens: 100,
  });

  return response.choices[0].message.content;
}

function createPrompt(descriptions) {
  const imageDescriptions = descriptions.join("\n");
  const prompt = `Using the following descriptions of garden images, create a short story which should be creative, calm, peaceful, and meditative.\n${imageDescriptions}`;
  return prompt;
}

async function textToSpeech(textInput) {
  const outputFile = path.resolve("./output.mp3");

  try {
    console.log("Speech synthesis initializing.");
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: textInput,
    });

    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(outputFile, buffer);
    console.log("Speech synthesis complete.");
  } catch (error) {
    console.log("Speech synthesis failed.");
    console.error(error);
  }
}

module.exports = {
  getStoryFromGPT,
  createPrompt,
  textToSpeech,
};
