document.getElementById("extractButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractEmTags" }, (response) => {
      if (response) {
        const uniqueEmTextArray = removeDuplicates(response);
        const emText = uniqueEmTextArray.join(", ");
        copyToClipboard(emText);
      }
    });
  });
});

function removeDuplicates(array) {
  return [...new Set(array)];
}

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}