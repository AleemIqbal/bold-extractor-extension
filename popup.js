let uniqueEmTextArray = [];

document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extractEmTags" }, (response) => {
      if (response) {
        uniqueEmTextArray = removeDuplicates(response);
        displayResult(uniqueEmTextArray);
      }
    });
  });
});

function removeDuplicates(array) {
  return [...new Set(array)];
}

function displayResult(emTags) {
  const resultDiv = document.getElementById("result");
  const column = document.createElement("div");

  column.className = "column";

  emTags.forEach((tag) => {
    const words = tag.split(", ");
    words.forEach((word) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.textContent = word;
      column.appendChild(cell);
    });
  });

  resultDiv.appendChild(column);
}

function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

document.getElementById("result").addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
    const keyword = event.target.textContent;
    copyToClipboard(keyword);
  }
});

document.getElementById("copyAll").addEventListener("click", () => {
  const emTextArray = uniqueEmTextArray.flatMap(tag => tag.split(", "));
  const uniqueEmTextArrayWithoutDuplicates = removeDuplicates(emTextArray);
  const emText = uniqueEmTextArrayWithoutDuplicates.join(", ");
  copyToClipboard(emText);
});