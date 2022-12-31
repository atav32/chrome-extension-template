console.log("%c popup", "color: #0bb");

const port = chrome.runtime.connect({ name: "popup" });

const startButton = document.querySelector("#start-button");
const stopButton = document.querySelector("#stop-button");

const updateButtonState = () => {
  const isRunning = JSON.parse(localStorage.getItem("isRunning"));
  console.log("%c isRunning", "color: #b0b", isRunning);
  startButton.disabled = isRunning;
  stopButton.disabled = !isRunning;
};

const init = () => {
  updateButtonState();

  port.postMessage({
    event: "init",
    source: "popup",
  });

  startButton.addEventListener("click", () => {
    console.log("%c popup click start", "color: #b0b", event);
    localStorage.setItem("isRunning", "true");
    updateButtonState();
    port.postMessage({
      event: "start",
      source: "start_button",
    });
  });

  stopButton.addEventListener("click", () => {
    console.log("%c popup click stop", "color: #b0b", event);
    localStorage.setItem("isRunning", "false");
    updateButtonState();
    port.postMessage({
      event: "stop",
      source: "stop_button",
    });
  });
};

init();
