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
  try {
    console.log("Speech synthesis initializing.");
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: textInput,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    console.log("Speech synthesis complete.");
    return buffer;
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
