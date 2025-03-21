document.getElementById("capture-text").addEventListener("click", async () => {
  // Request the background service worker to take a screenshot
  chrome.runtime.sendMessage({ type: "takeScreenshot" });
});

// Handle the ChatGPT response from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "displayResponse") {
    document.getElementById("response-text").innerText = message.answer;
  }
});
