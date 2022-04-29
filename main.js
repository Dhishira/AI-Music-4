song_1 = "";
song_2 = "";

scoreLeftWrist = 0;

status_1 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
  song_1 = loadSound("music2.mp3");
  song_2 = loadSound("music.mp3");
}

function setup()
{
  canvas = createCanvas(600,325);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video,modelLoaded);
  posenet.on('pose',gotposes);
}

function modelLoaded()
{
  console.log("Posenet is Intialized!");
}

function gotposes(results)
{
  if(results.length > 0)
  {
    console.log(results);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log(scoreLeftWrist);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftwristX - " + leftWristX+ "leftwristY - " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightwristX - " + rightWristX+ "rightwristY - " + rightWristY);
  }
}

function draw()
{
  image(video,0,0,600,325);
  fill("#F72F28");
  stroke("#F72F28")

  song_peter_pan = song_1.isplaying();

  if(scoreLeftWrist > 0.2)
  {
    circle(leftWristX,leftWristY,20);
    song_2.stop();
    if(song_peter_pan == false)
    {
      song_1.play();
      document.getElementById("song_name").innerHTML = "Song Name - Peter Pan";
    }
  }
}
