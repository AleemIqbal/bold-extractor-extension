chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractEmTags") {
      const emTags = [...document.querySelectorAll('em')].map(em => em.textContent);
      sendResponse(emTags);
    }
  });