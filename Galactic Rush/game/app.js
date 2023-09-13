const gameCanvas = document.querySelector("#game");
const ctx = gameCanvas.getContext("2d");
const stats = document.querySelector(".stats");
const pointsElement = document.querySelector(".points");
const livesElement = document.querySelector(".lives");
const startGameElement = document.querySelector(".start__game");
const startGameButton = document.querySelector(".start__game__button");
const pauseGameButton = document.querySelector(".plause__game");
const backToMenuButton = document.querySelector(".back__menu");
const backToMenuButton2 = document.querySelector(".back__menu2");
const gameOverElement = document.querySelector(".game__over");
const restartButton = document.querySelector(".restart");
const endScoreElement = document.querySelector(".end__score");
const freepik = document.querySelector(".freepik");
const curtain = document.querySelector(".curtain");

gameCanvas.width = innerWidth;
gameCanvas.height = innerHeight;

if (!localStorage.getItem("score")) {
  localStorage.setItem("score", 0);
}

if (localStorage.getItem("curtain")) {
  curtain.classList.add("hide");
  startGameElement.classList.remove("hide");
  stats.classList.remove("hide");
  freepik.classList.remove("hide");
} else {
  localStorage.setItem("curtain", 1);
  curtain.style.animation = "animation-out 2s ease forwards";
  setTimeout(() => {
    startGameElement.classList.remove("hide");
  }, 800);
  setTimeout(() => {
    stats.classList.remove("hide");
    freepik.classList.remove("hide");
  }, 2000);
}

const Player = {
  x: 200,
  y: innerHeight / 2,
  velocityX: 0,
  velocityY: 0,
  radius: 40,
  points: 0,
  lives: 3,
  speed: 6,
};

let meteors;
let meteorVelocity = 10;
let pause = true;

const images = ["meteor1.png", "meteor2.png", "meteor3.png", "meteor4.png"];

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomImage(images) {
  return images[Math.floor(Math.random() * images.length)];
}

function getDistance(x1, y1, x2, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

startGameButton.addEventListener("click", () => {
  startGameElement.classList.add("hide");
  pause = false;
});

pauseGameButton.addEventListener("click", () => {
  startGameElement.classList.remove("hide");
  pause = true;
});

restartButton.addEventListener("click", () => {
  location.reload();
});

backToMenuButton.addEventListener("click", () => {
  window.location.assign("../start.html");
  localStorage.removeItem("curtain");
});

class Meteor {
  constructor(x, y, radius, velocity, image) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    this.image = image;
  }

  draw() {
    let image = new Image();
    image.src = `images/${this.image}`;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.drawImage(
      image,
      0,
      0,
      450,
      450,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    // ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (Player.points >= 4000) {
      this.velocity = meteorVelocity + 2;
      Player.x = 300;
    }
    if (Player.points >= 8000) {
      this.velocity = meteorVelocity + 4;
      Player.x = 400;
    }
    if (Player.points >= 14000) {
      this.velocity = meteorVelocity + 5;
      Player.x = 450;
    }

    this.x -= this.velocity;
    if (this.x <= 0 - this.radius) {
      Player.points += randomIntFromRange(30, 50);
      pointsElement.innerHTML = `Punkty: ${Player.points}`;
      init();
    }

    if (
      getDistance(Player.x, Player.y, this.x, this.y) <
      this.radius + Player.radius
    ) {
      Player.lives--;
      livesElement.innerHTML = `Życia: ${Player.lives}`;
      init();
    }

    this.draw();
  }
}

function init() {
  meteors = [];
  let radius = 40;

  for (i = 0; i <= 3; i++) {
    let y = randomIntFromRange(0 + radius, gameCanvas.height - radius);
    let x = gameCanvas.width + radius;

    //tworzenie jeszcze raz przeszkody jeśli któraś nałoży się na inną
    if (i !== 0) {
      for (let j = 0; j < meteors.length; j++) {
        if (getDistance(x, y, meteors[j].x, meteors[j].y) - radius * 2 < 0) {
          y = randomIntFromRange(0 + radius, gameCanvas.height - radius);

          j = -1;
        }
      }
    }

    meteors.push(new Meteor(x, y, radius, meteorVelocity, randomImage(images)));
  }
}

function setPlayer() {
  Player.x += Player.velocityX * Player.speed;
  Player.y += Player.velocityY * Player.speed;
  let image2 = new Image();
  image2.src = "images/statek.png";

  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.arc(Player.x, Player.y, Player.radius, 0, Math.PI * 2, true);
  ctx.drawImage(
    image2,
    0,
    0,
    503,
    364,
    Player.x - Player.radius,
    Player.y - Player.radius + 8,
    Player.radius * 2,
    Player.radius * 1.6
  );
  // ctx.stroke();
  ctx.closePath();

  //blokowanie gracza żeby nie mógł wyjść poza obszar gry
  if (Player.y - Player.radius < 0) {
    Player.y = Player.radius;
  } else if (Player.y + Player.radius > gameCanvas.height) {
    Player.y = gameCanvas.height - Player.radius;
  } else if (Player.x - Player.radius < 0) {
    Player.x = Player.radius;
  } else if (Player.x + Player.radius > gameCanvas.width) {
    Player.x = gameCanvas.width - Player.radius;
  }

  if (Player.lives == 0) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    pause = true;
    gameOverElement.classList.remove("hide");
    endScoreElement.innerText = `Zdobyte punkty: ${Player.points}`;
    if (Player.points > localStorage.getItem("score")) {
      localStorage.removeItem("score");
      localStorage.setItem("score", Player.points);
    }

    backToMenuButton2.addEventListener("click", () => {
      window.location.assign("../start.html");
      localStorage.removeItem("curtain");
    });
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" || e.code == "KeyW") {
    Player.velocityX = 0;
    Player.velocityY = -1;
  } else if (e.code == "ArrowDown" || e.code == "KeyS") {
    Player.velocityX = 0;
    Player.velocityY = 1;
  } else if (e.code == "Escape") {
    pause = true;
    startGameElement.classList.remove("hide");
  }
}

function stopMove() {
  Player.velocityX = 0;
  Player.velocityY = 0;
}

function animate() {
  requestAnimationFrame(animate);
  if (!pause) {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    meteors.forEach((meteor) => {
      meteor.update();
    });
    setPlayer();
    document.addEventListener("keydown", changeDirection);
    document.addEventListener("keyup", stopMove);
  }
}

setPlayer();
init();
animate();
