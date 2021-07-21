music = "";
music2 = "";

statusofthesong = "";
statusofthesongright = "";

scoreoftherightwrist = 0;
scoreoftheleftwrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet has been initialized');
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreoftheleftwrist  = results[0].pose.keypoints[9].score;
        scoreoftherightwrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("left wrist x : " + leftWristX);
        console.log("left wrist y : " + leftWristY);
        console.log("right wrist x : " + rightWristX);
        console.log("right wrist y : " + rightWristY);
    }
}

function draw(){
    image(video,0,0,600,400);
    statusofthesong = music.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreoftheleftwrist > 0.2){
        circle(leftWristX,leftWristY,20);
        music2.stop();

        if(statusofthesong == false){
        music.play();
        document.getElementById("song_name").innerHTML = "Song : harry potter theme"
        }
    }

    statusofthesongright = music2.isPlaying();

    if(scoreoftherightwrist > 0.2){
        circle(rightWristX,rightWristY,20);
        music.stop();

        if(statusofthesongright == false){
            music2.play();
            document.getElementById("song_name").innerHTML = "Song : peter pan song";
        }
    }
}