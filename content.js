function upgradeShikiText(node) {
  if (
    node.classList &&
    node.classList.contains("shiki") &&
    node.classList.contains("text-sm")
  ) {
    node.classList.remove("text-sm");
    node.classList.add("text-lg");
  }
}

function runUpgrade() {
  document.querySelectorAll(".shiki.text-sm").forEach(upgradeShikiText);
}

let observer = null;

function startObserver() {
  if (observer) return; // already running
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          upgradeShikiText(node);
          node.querySelectorAll?.(".shiki.text-sm").forEach(upgradeShikiText);
        }
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  runUpgrade();
}

function stopObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

// Check state on load
chrome.storage.local.get("enabled", (data) => {
  if (data.enabled ?? true) {
    startObserver();
  }
});

// Listen for changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    if (changes.enabled.newValue) {
      startObserver();
    } else {
      stopObserver();
    }
  }
});
