Peter_pan_song="";
Harry_potter_theme_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
song_name = "";
scoreRightWrist = 0;
songa = "";


function setup(){
    canvas = createCanvas(600,570);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Peter_pan_song = loadSound("acoustic-vibe-124586.mp3");
    Harry_potter_theme_song = loadSound("timeless-love-songs-139541.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#34ebe5");
    stroke("#34ebe5");

    song_name = Peter_pan_song.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.1){
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song.stop();
        if(song_name == false){
            Peter_pan_song.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: acoustic vibe";
        }
    }
    song_name = Harry_potter_theme_song.isPlaying();
    console.log(song_name);
    
    fill("#34ebe5");
    stroke("#34ebe5");

    if (scoreRightWrist > 0.1){
        circle(rightWrist_x,rightWrist_y,20);
   Peter_pan_song.stop();
        if(song_name == false){
           Harry_potter_theme_song.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: guitarvibe";
        }


    } 
}




function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);


        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}