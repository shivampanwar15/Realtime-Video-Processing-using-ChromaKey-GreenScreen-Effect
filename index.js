//declaration of variable
var Video, c_out, CanvasContext, tempCanvas, tempCanvasContext; 
var r1,g1,b1;

// capturing web cam video
Video = document.querySelector("#VideoCam");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      Video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
}


//intiliazation

function init() {

  c_out = document.getElementById("c1");
  CanvasContext = c_out.getContext("2d");
  Video.addEventListener("play", computeFrame);
  colorselector();

}
//function to change bg
function computeFrame() { 
 

  CanvasContext.drawImage(Video, 0, 0, Video.videoWidth, Video.videoHeight);
  frame = CanvasContext.getImageData(0, 0, Video.videoWidth, Video.videoHeight);

  for (let i = 0; i < frame.data.length / 4; i++) {
    let r = frame.data[i * 4 + 0];
    let g = frame.data[i * 4 + 1];
    let b = frame.data[i * 4 + 2];
    if (r > 180 && r < 255 && g > 180 && g < 255 && b > 180 && b < 255) {
      frame.data[i * 4 + 0] = r1;
      frame.data[i * 4 + 1] = g1;
      frame.data[i * 4 + 2] = b1;
    }
  
  }
    CanvasContext.putImageData(frame, 0, 0);
    setTimeout(computeFrame, 0);
  
}
//function for bg color
function colorselector(){
  
  var red = document.getElementById('Red');
  var green = document.getElementById('Green');
  var blue= document.getElementById('Blue');
  
  r1 = red.value;
  g1 = green.value;
  b1 = blue.value;

  computeFrame();
  
  }

//content loader

  document.addEventListener("DOMContentLoaded", () => {
    init();
  });






