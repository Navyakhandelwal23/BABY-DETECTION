object= []

function setup(){
    canvas= createCanvas(640,420)
    canvas.center()
    video= createCapture(VIDEO)
    video.hide()
    objectDetector= ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML= "status:detecting objects"
}

img= ""

status= ""




function draw(){
    image(video, 0,0,640,420)
    if(status!= ""){
        objectDetector.detect(video, gotResults)
        for(i= 0;i<object.length;i++){
            if(object[i].label=="person"){

         
            document.getElementById("status").innerHTML= "STATUS: baby found"
            fill("red")
            percent= floor(object[i].confidence*100)
            text (object[i].label+" "+percent, object[i].x+15, object[i].y+15)
            noFill()
            stroke("red")
            rect(object[i].x,object[i].y, object[i].width,  object[i].height)
            }
            else{
                document.getElementById("status").innerHTML= "status: baby not found"
            }
        }
    }
}


function modelLoaded(){
    console.log("model is loaded")
    status= true
    
}


function gotResults(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)
    object= results
}
