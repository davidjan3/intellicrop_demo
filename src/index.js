import Cropper from "intellicrop";

const fileUploadInput = document.getElementById("file-input");
const srcImage = document.getElementById("src-img");
const cropperCanvas = document.getElementById("cropper-canvas");
const debugCanvas = document.getElementById("debug-canvas");
const applyButton = document.getElementById("apply-button");
const rotRightButton = document.getElementById("rotate-right-button");
const rotLeftButton = document.getElementById("rotate-left-button");

fileUploadInput?.addEventListener(
  "change",
  function (e) {
    srcImage.src = URL.createObjectURL((e.target).files[0]);
  },
  false
);

let cropper;

srcImage.onload = () => {
  cropper = new Cropper(cropperCanvas, srcImage, {
    useEdgeDetection: true,
    debugCanvas: debugCanvas,
  });
};

applyButton.onclick = () => {
  const resultImage = cropper.getResult();
  cropper.discard();
  resultImage.onload = () => {
    debugCanvas.width = resultImage.width;
    debugCanvas.height = resultImage.height;
    debugCanvas.getContext("2d").drawImage(resultImage, 0, 0);
  };
};

rotRightButton.onclick = () => {
  cropper.rotateRight();
};

rotLeftButton.onclick = () => {
  cropper.rotateLeft();
};
