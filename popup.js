const toggleBtn = document.getElementById("toggle");

chrome.storage.local.get("enabled", (data) => {
  const enabled = data.enabled ?? true; // default ON
  toggleBtn.textContent = enabled ? "Disable Enlarger" : "Enable Enlarger";
});

toggleBtn.addEventListener("click", () => {
  chrome.storage.local.get("enabled", (data) => {
    const enabled = !(data.enabled ?? true);
    chrome.storage.local.set({ enabled });
    toggleBtn.textContent = enabled ? "Disable Enlarger" : "Enable Enlarger";
  });
});
