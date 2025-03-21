document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    console.log("Selected text:", selectedText);
    chrome.runtime.sendMessage({ type: "selectedText", text: selectedText });
  }
});
