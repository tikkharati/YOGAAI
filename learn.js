
/* Initialize variables
let video;
let poseNet;
let pose;
let skeleton;
let thirtysecs;
let posesArray = ['Mountain', 'Tree', 'Downward Dog', 'Warrior I', 'Warrior II', 'Chair'];
var imgArray = new Array();

var poseImage;

let yogi;
let poseLabel;

var targetLabel;
var errorCounter;
var iterationCounter;
var poseCounter;
var target;

var timeLeft;

function setup() {
  // Create canvas and position it
  var canvas = createCanvas(640, 480);
  canvas.position(130, 210);

  // Create video capture element and hide it
  video = createCapture(VIDEO);
  video.hide();

   // Load PoseNet model and set up event listener for pose detection
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);


  // Load images into an array
  imgArray[0] = new Image();
  imgArray[0].src = 'imgs/mountain.svg';
  imgArray[1] = new Image();
  imgArray[1].src = 'imgs/tree.svg';
  imgArray[2] = new Image();
  imgArray[2].src = 'imgs/dog.svg';
  imgArray[3] = new Image();
  imgArray[3].src = 'imgs/warrior1.svg';
  imgArray[4] = new Image();
  imgArray[4].src = 'imgs/warrior2.svg';
  imgArray[5] = new Image();
  imgArray[5].src = 'imgs/chair.svg';
  

  // Initialize counters and target pose
  poseCounter = 0;
  targetLabel = 1;
  target = posesArray[poseCounter];
  document.getElementById("poseName").textContent = target;
  timeLeft = 10;
  document.getElementById("time").textContent = "00:" + timeLeft;
  errorCounter = 0;
  iterationCounter = 0;
  document.getElementById("poseImg").src = imgArray[poseCounter].src;
  

    // Set up options for the neural network
  let options = {
    inputs: 34,
    outputs: 6,
    task: 'classification',
    debug: true
  }
  


  
  // Load the pre-trained model for pose classification
  yogi = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'modelv2/model2.json',
    metadata: 'modelv2/model_meta2.json',
    weights: 'modelv2/model.weights2.bin',
  };
  yogi.load(modelInfo, yogiLoaded);
}
  
function yogiLoaded(){
  console.log("Model ready!");
  classifyPose();
}

function classifyPose(){
   // Check if a pose is detected
  if (pose) {
    let inputs = [];
     // Extract the coordinates of each keypoint and add them to the inputs array
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }

    // Classify the pose using the neural network
    yogi.classify(inputs, gotResult);
  } else {
    console.log("Pose not found");
      // If no pose is found, wait and try again
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  document.getElementById("welldone").textContent = "";
  document.getElementById("sparkles").style.display = "none";
  if (results[0].confidence > 0.60) {
    console.log("Confidence");

    // Check if the classified label matches the target label
    if (results[0].label == targetLabel.toString()){
      console.log(targetLabel);
      iterationCounter = iterationCounter + 1;

      console.log(iterationCounter)
      
      if (iterationCounter == 10) {
        console.log("30!")
        iterationCounter = 0;
        nextPose();}
      else{
        console.log("doin this")
        timeLeft = timeLeft - 1;
        if (timeLeft < 10){
          document.getElementById("time").textContent = "00:0" + timeLeft;
        }else{
        document.getElementById("time").textContent = "00:" + timeLeft;}
        setTimeout(classifyPose, 1000);}}
    else{
      errorCounter = errorCounter + 1;
      console.log("error");
      if (errorCounter >= 4){
        console.log("four errors");
        iterationCounter = 0;
        timeLeft = 10;
        if (timeLeft < 10){
          document.getElementById("time").textContent = "00:0" + timeLeft;
        }else{
        document.getElementById("time").textContent = "00:" + timeLeft;}
        errorCounter = 0;
        setTimeout(classifyPose, 100);
      }else{
        setTimeout(classifyPose, 100);
      }}}
  else{
    console.log("what we really don to want")
    setTimeout(classifyPose, 100);
}}


function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  document.getElementById("rectangle").style.display = "none";
  console.log('poseNet ready');
}

function draw() {
  push();
  //# to do review this
  translate(video.width, 0);
  scale(-1,1);
  image(video, 0, 0, video.width, video.height);
  
  if (pose) {

     // Draw the skeleton on the video feed
     strokeWeight(8);
     stroke(244, 194, 194);
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      // work on it..
    
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }
  }
  pop();
}

function nextPose(){

   // Check if all poses have been completed
  if (poseCounter >= 5) {
    console.log("Well done, you have learnt all poses!");
    document.getElementById("finish").textContent = "Amazing!";
    document.getElementById("welldone").textContent = "All poses done.";
    document.getElementById("sparkles").style.display = 'block';
  }else{
    console.log("Well done, you  done all poses!");
    
    errorCounter = 0;
    iterationCounter = 0;
    poseCounter = poseCounter + 1;
    targetLabel = poseCounter + 1;
    console.log("next pose target label" + targetLabel)
    target = posesArray[poseCounter];
    document.getElementById("poseName").textContent = target;
    document.getElementById("welldone").textContent = "Well done, next pose!";
    document.getElementById("sparkles").style.display = 'block';
    document.getElementById("poseImg").src = imgArray[poseCounter].src;
    console.log("classifying again");
    timeLeft = 10;
    document.getElementById("time").textContent = "00:" + timeLeft;
    setTimeout(classifyPose, 4000)}
}
*/


let video;
let poseNet;
let pose;
let skeleton;
let thirtysecs;
let posesArray = ['Mountain', 'Tree', 'Downward Dog', 'Warrior I', 'Warrior II', 'Chair'];
var imgArray = new Array();

var poseImage;

let yogi;
let poseLabel;

var targetLabel;
var errorCounter;
var iterationCounter;
var poseCounter;
var target;

var timeLeft;

function setup() {
  // Create canvas and position it
  var canvas = createCanvas(640, 480);
  canvas.position(0, 600);

  video = createVideo(['imgs/changed.mp4'], videoLoaded);
  //video.size(640,480);
  const constraints = {
    video: { width: { max: 640 }, height: { max: 480 } }
};   



navigator.mediaDevices.getUserMedia(constraints).
 then((stream) => { video.srcObject = stream });

  // Create a preloaded video element
  //video = createVideo(['imgs/ratidemo.mp4'], videoLoaded);
 //video.play();


  // Load images into an array
  imgArray[0] = new Image();
  imgArray[0].src = 'imgs/mountain.svg';
  imgArray[1] = new Image();
  imgArray[1].src = 'imgs/tree.svg';
  imgArray[2] = new Image();
  imgArray[2].src = 'imgs/dog.svg';
  imgArray[3] = new Image();
  imgArray[3].src = 'imgs/warrior1.svg';
  imgArray[4] = new Image();
  imgArray[4].src = 'imgs/warrior2.svg';
  imgArray[5] = new Image();
  imgArray[5].src = 'imgs/chair.svg';

  // Initialize counters and target pose
  poseCounter = 0;
  targetLabel = 1;
  target = posesArray[poseCounter];
  document.getElementById("poseName").textContent = target;
  timeLeft = 10;
  document.getElementById("time").textContent = "00:" + timeLeft;
  errorCounter = 0;
  iterationCounter = 0;
  document.getElementById("poseImg").src = imgArray[poseCounter].src;

  // Set up options for the neural network
  let options = {
    inputs: 34,
    outputs: 6,
    task: 'classification',
    debug: true
  }

  // Load the pre-trained model for pose classification
  yogi = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'modelv2/model2.json',
    metadata: 'modelv2/model_meta2.json',
    weights: 'modelv2/model.weights2.bin',
  };
  yogi.load(modelInfo, yogiLoaded);
}

function yogiLoaded() {
  video.play();
  console.log("Model ready!");
}

function videoLoaded() {
  console.log("Video ready!");
//  video.play();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  classifyPose();
}

function classifyPose(){
  // Check if a pose is detected
 if (pose) {
   let inputs = [];
    // Extract the coordinates of each keypoint and add them to the inputs array
   for (let i = 0; i < pose.keypoints.length; i++) {
     let x = pose.keypoints[i].position.x;
     let y = pose.keypoints[i].position.y;
     inputs.push(x);
     inputs.push(y);
   }

   // Classify the pose using the neural network
   yogi.classify(inputs, gotResult);
 } else {
   console.log("Pose not found");
     // If no pose is found, wait and try again
   setTimeout(classifyPose, 100);
 }
}

function gotResult(error, results) {
 document.getElementById("welldone").textContent = "";
 document.getElementById("sparkles").style.display = "none";
 if (results[0].confidence > 0.60) {
   console.log("Confidence");

   // Check if the classified label matches the target label
   if (results[0].label == targetLabel.toString()){
     console.log(targetLabel);
     iterationCounter = iterationCounter + 1;

     console.log(iterationCounter)
     
     if (iterationCounter == 10) {
       console.log("30!")
       iterationCounter = 0;
       nextPose();}
     else{
       console.log("doin this")
       timeLeft = timeLeft - 1;
       if (timeLeft < 10){
         document.getElementById("time").textContent = "00:0" + timeLeft;
       }else{
       document.getElementById("time").textContent = "00:" + timeLeft;}
       setTimeout(classifyPose, 1000);}}
   else{
     errorCounter = errorCounter + 1;
     console.log("error");
     if (errorCounter >= 4){
       console.log("four errors");
       iterationCounter = 0;
       timeLeft = 10;
       if (timeLeft < 10){
         document.getElementById("time").textContent = "00:0" + timeLeft;
       }else{
       document.getElementById("time").textContent = "00:" + timeLeft;}
       errorCounter = 0;
       setTimeout(classifyPose, 100);
     }else{
       setTimeout(classifyPose, 100);
     }}}
 else{
   console.log("what we really don to want")
   setTimeout(classifyPose, 100);
}}


function gotPoses(poses) {
 if (poses.length > 0) {
   pose = poses[0].pose;
   skeleton = poses[0].skeleton;
 }
}

function modelLoaded() {
 document.getElementById("rectangle").style.display = "none";
 console.log('poseNet ready');
}

function draw() {
 push();
 //# to do review this
 translate(video.width, 0);
 scale(-1,1);
 image(video, 0, 0, video.width, video.height);
 
 if (pose) {

    // Draw the skeleton on the video feed
    strokeWeight(8);
    stroke(244, 194, 194);
   for (let i = 0; i < skeleton.length; i++) {
     let a = skeleton[i][0];
     let b = skeleton[i][1];
     // work on it..
   
     line(a.position.x, a.position.y, b.position.x, b.position.y);
   }
 }
 pop();
}

function nextPose(){

  // Check if all poses have been completed
 if (poseCounter >= 5) {
   console.log("Well done, you have learnt all poses!");
   document.getElementById("finish").textContent = "Amazing!";
   document.getElementById("welldone").textContent = "All poses done.";
   document.getElementById("sparkles").style.display = 'block';
 }else{
   console.log("Well done, you  done all poses!");
   
   errorCounter = 0;
   iterationCounter = 0;
   poseCounter = poseCounter + 1;
   targetLabel = poseCounter + 1;
   console.log("next pose target label" + targetLabel)
   target = posesArray[poseCounter];
   document.getElementById("poseName").textContent = target;
   document.getElementById("welldone").textContent = "Well done, next pose!";
   document.getElementById("sparkles").style.display = 'block';
   document.getElementById("poseImg").src = imgArray[poseCounter].src;
   console.log("classifying again");
   timeLeft = 10;
   document.getElementById("time").textContent = "00:" + timeLeft;
   setTimeout(classifyPose, 4000)}
}

