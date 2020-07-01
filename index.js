let video;
let poseNet;
let poses = [];
let leftw_cur; //left wrist point
var brake_min
var brake_max;

//Do the initialization
function setup() {
  let canvas = createCanvas(500,500);  
    load_unity(); //load unity
    canvas.parent('videoContainer');
 // Video capture
  video = createCapture(VIDEO);
  video.size(width, height);
    
brake_min=width/2+20; //experimental values ,feel free to alterfor best results
brake_max=width/2+60;


    

// Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
   
  });
  
  // Hide the video element, and just show the canvas
  video.hide();
leftw_cur=0;
    }

function draw() {
  
    image(video, 0, 0, width, height);
    
    
    //iterate through poses
for (let i = 0; i < poses.length; i++) {
    if(i>0){ //skipping other poses using only first pose
        continue;
    }
    
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    
       
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j]; 
        
         if(keypoint.part=="leftWrist" && unity_loaded()){  
            
            
            leftw_cur=keypoint.position.x;
            
    
            if(leftw_cur<brake_max && leftw_cur>brake_min){
                ApplyBrake();
            }
            
            else if(leftw_cur<=brake_min){
               moveforward();
            }
            
            
             else if(leftw_cur>=brake_max){
               movebackward();
            }
            
            
            
            
           }
        
        
     }
   }
   
drawKeypoints();
}

function modelReady(){
  select('#status').html('Start Playing')
}


function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    if(i>0){
        continue;
    }
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
       
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        
       
      }
    }
  }
}










    

