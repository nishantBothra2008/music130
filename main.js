var song_one = "";

var leftWristY = 0;
var leftWristX = 0;
var rightWristX = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload() {
    song_one = loadSound("song_one.mp3");
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(400, 300);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX =" + leftWristX, "leftWristY =" + leftWristY, "rightWristX =" + rightWristX, "rightWristY =" + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of left wrist =" + scoreLeftWrist + "Score of right wrist =" + scoreRightWrist);
    }
}

function draw() {
    image(video, 0, 0, 400, 300);
    fill("darkcyan");
    stroke("aliceblue");
    
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        if (leftWristY >= 0 && leftWristY <= 100) {
            document.getElementById("song_speed").innerHTML = "Speed is 0.5x";
            song_one.rate(0.5);
        }
        else if (leftWristY >= 100 && leftWristY <= 200) {
            document.getElementById("song_speed").innerHTML = "Speed is 1x";
            song_one.rate(1);
        }
        else if (leftWristY >= 200 && leftWristY <= 300) {
            document.getElementById("song_speed").innerHTML = "Speed is 1.5x";
            song_one.rate(1.5);
        }
        else if (leftWristY >= 300 && leftWristY <= 400) {
            document.getElementById("song_speed").innerHTML = "Speed is 2x";
            song_one.rate(2);
        }
        else if (leftWristY >= 400) {
            document.getElementById("song_speed").innerHTML = "Speed is 2.5x";
            song_one.rate(2.5);
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        number_leftWrist_y = Number(leftWristY);
        double_y = floor(leftWristY * 2);
        divide_y = double_y/1000;
        document.getElementById("song_volume").innerHTML = "Volume is" + divide_y;
        song_one.setVolume(divide_y);
    }
}

function playing_music() {
    song_one.play();
    song_one.setVolume(1);
    song_one.setRate(1);
}

































    