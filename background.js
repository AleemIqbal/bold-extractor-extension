chrome.browserAction.onClicked.addListener((tab) => {
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