console.log("%c background", "color: #0bb");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("%c message", "color: #b0b", message, sender);
  if (message.action === "start") {
    sendResponse(() => ({
      message: "started",
    }));
  }
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("%c background on connect", "color: #b0b", port.name);
  extensionPort = port;
  port.onMessage.addListener((message) => {
    console.log("%c port message", "color: #b0b", message, port);
    setTimeout(() => {
      port.postMessage({
        name: port.name,
        answer: "post message received",
        sender: "background",
      });
    });
  });
});
