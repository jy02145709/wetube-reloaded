const { startSession } = require("mongoose");

const statrBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");
let stream;
let recoder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};
const handleStop = () => {
  statrBtn.innerText = "Download Recording";
  statrBtn.removeEventListener("click", handleStop);
  statrBtn.addEventListener("click", handleDownload);
  recoder.stop();
};
const handleStart = () => {
  statrBtn.innerText = "Stop Recording";
  statrBtn.removeEventListener("click", handleStart);
  statrBtn.addEventListener("click", handleStop);
  recoder = new MediaRecorder(stream);
  recoder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recoder.start();
};
const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
init();

statrBtn.addEventListener("click", handleStart);
