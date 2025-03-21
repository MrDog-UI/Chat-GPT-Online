import Tesseract from 'tesseract.js';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "takeScreenshot") {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, async (dataUrl) => {
      if (dataUrl) {
        const extractedText = await extractTextFromImage(dataUrl);

        // Send the extracted text to ChatGPT API
        const chatGPTResponse = await fetchChatGPTResponse(extractedText);
        chrome.runtime.sendMessage({ type: "displayResponse", answer: chatGPTResponse });
      }
    });
  }
});

async function extractTextFromImage(imageDataUrl) {
  const { data: { text } } = await Tesseract.recognize(imageDataUrl, 'eng');
  console.log("Extracted text:", text);
  return text;
}

async function fetchChatGPTResponse(text) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
