const gameBody = document.getElementById("game-body");
const chancess = document.getElementById("chances")
var secs = document.getElementById("timer").textContent;
var balloonId = 0;

var img = [
   "balloon2.png",
   "balloon3.png",
   "balloon5.png",
];

//chaces
var chances = 5;


//function for making the balloon

function makeBalloon(){
  randomImage = img[getRandomInt(0, img.length)];
  gameBody.innerHTML += `<img src="./assets/${randomImage}" class='balloon-image' id="balloon${balloonId}">`;
  let balloon = document.getElementById("balloon" + balloonId);
  // console.log("3", balloon)
  balloon.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  balloon.style.animationDuration =`${getRandomInt(2, 5)}s`;
  balloon.onclick = () => {
    balloonDestruct(balloon);
  };

}

//function to cheack the player missed the balloon

function checkCollision(balloon) {
  if(balloon.getBoundingClientRect().top <= 0) {
    chances--;
    
    return true;
  }
  return false;
}

//function to make disappear the balloon

function balloonDestruct(balloon) {
  balloon.style.display='none';
  // console.log("CHECK 1", balloonId)
  balloonId++;

  // console.log(balloonId)
  makeBalloon();
}

//timer
var timer = setInterval(function () {
  secs--;
  document.getElementById("timer").textContent = secs;
  let balloon = document.getElementById("balloon" + balloonId);

  if (checkCollision(balloon) == true ) {
    balloonDestruct(balloon);
    if (chances == 0) {
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if (secs <= 0) {
    clearInterval(timer);
    location.href = './win.html';
  }
},
1000);

//make the balloon to fly
makeBalloon(balloonId);


function getRandomInt(max,min) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min)) + min;
}

//baground audio
const backgroundSound = new Audio (
  "./assets/shinchan_theme_song.mp3"
);
backgroundSound.play();
backgroundSound.loop = true;

//shoot sound

const expAudio = new Audio ("./assets/shot.mp3");
gameBody.onclick=() => {
  expAudio.currentTime = 0;
  expAudio.play();
};




