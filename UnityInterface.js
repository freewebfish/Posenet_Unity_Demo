
/*Functionality to handle unity related tasks
 Load unity
 Moveforward
 Movebackward
 Applybrake
 */

let unityInstance;
function load_unity(){
unityInstance = UnityLoader.instantiate("unityContainer", "Build/Build_posenet_auto.json", {onProgress: UnityProgress});


}


function moveforward(){
unityInstance.SendMessage("Auto","Posenet",1);  
    
}


function ApplyBrake(){
unityInstance.SendMessage("Auto","Posenet",0);  
    
}


function movebackward(){
unityInstance.SendMessage("Auto","Posenet",2);  
    
}

