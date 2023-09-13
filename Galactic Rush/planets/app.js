const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");
const popup = document.querySelector(".popup");
const popupPlanetName = document.querySelector(".planet__name");
const popupPlanetDiscription = document.querySelector(".planet__discription");
const popupCloseButton = document.querySelector(".popup__close");
const startMainButton = document.querySelector(".start__main__button");
const startContent = document.querySelector(".start__content");
const startGameButton = document.querySelector(".start__level__button");
const bestScore = document.querySelector(".best-score");
const bestScoreElement = document.querySelector(".best__score");
const message = document.querySelector(".message");
const messageCloseButton = document.querySelector(".message__close");
const curtain = document.querySelector(".curtain");
const freepik = document.querySelector(".freepik");

canvas.width = innerWidth;
canvas.height = innerHeight;

let score;
localStorage.getItem("score")
  ? (score = localStorage.getItem("score"))
  : (score = 0);

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// Event Listeners
startMainButton.addEventListener("click", () => {
  curtain.style.animation = "animation-in 3s ease forwards";
  setTimeout(() => {
    bestScoreElement.classList.remove("hide");
    freepik.classList.remove("hide");
    bestScore.innerText = `Rekord: ${score}`;

    if (!localStorage.getItem("message")) {
      localStorage.setItem("message", 1);
      message.classList.remove("hide");
    }

    if (score >= 17000 && !localStorage.getItem("Endmessage")) {
      message.innerHTML = `<h1>Wiadomość</h1>
      <p><span>Od: </span> Mikołaj Kopernik</p>
      <p><span>Do: </span> Ciebie</p>
      <div class="message__content">
        Witaj ponownie! Widzę, że udało Ci się zbadać każdą z planet. Świetna informacja! Jestem bardzo wdzięczny za twoją pomoc, twoje starania bardzo mi pomogły zaspokoić moją ciekawość jak i uzupełniy moją wiedzę. Teraz możesz próbować pobić swój aktualny rekord i zdobyć nowy. Jeszcze raz dzięki i mam nadzieję, że jeszcze się zobaczymy w przyszłości.
      </div>

      <button class="end__message__close">X</button>`;
      localStorage.setItem("Endmessage", 1);
      message.classList.remove("hide");
      document
        .querySelector(".end__message__close")
        .addEventListener("click", () => {
          message.classList.add("hide");
        });
    }
  }, 2700);
  setTimeout(() => {
    startContent.classList.add("hide");
    canvas.classList.remove("hide");
    init();
    animate();

    setTimeout(() => {
      addEventListener("click", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        planets.forEach((planet) => {
          if (planet.clickCircle(mouse.x, mouse.y)) {
            popupPlanetName.innerText = planet.name;
            popup.classList.remove("hide");
            score >= planet.score
              ? (popupPlanetDiscription.innerHTML = planet.discription)
              : (popupPlanetDiscription.innerText =
                  "Musisz mieć większy rekord, żeby sprawdzić co tutaj się kryje");
          }
        });
      });
    }, 200);
  }, 1500);
});

startGameButton.addEventListener("click", () => {
  bestScoreElement.classList.add("hide");
  freepik.classList.add("hide");
  popup.classList.add("hide");
  message.classList.add("hide");
  curtain.style.animation = "animation-in2 4s ease forwards";
  setTimeout(() => {
    window.location.assign("game/index.html");
  }, 2000);
});

popupCloseButton.addEventListener("click", () => {
  popup.classList.add("hide");
});

messageCloseButton.addEventListener("click", () => {
  message.classList.add("hide");
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

class Planet {
  constructor(
    x,
    y,
    radius,
    distanceFromCenter,
    radians,
    name,
    discription,
    score
  ) {
    this.x = x;
    this.originalX = x;
    this.y = y;
    this.originalY = y;
    this.radius = radius;
    this.distanceFromCenter = distanceFromCenter;
    this.radians = radians;
    this.name = name;
    this.discription = discription;
    this.score = score;
    this.velocity = 0.003;
  }

  draw() {
    let image = new Image();
    image.src = `images/${this.name}.png`;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.drawImage(
      image,
      0,
      0,
      160,
      100,
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2
    );
    c.closePath();
  }

  update() {
    this.radians += this.velocity;

    this.x = this.originalX + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.originalY + Math.sin(this.radians) * this.distanceFromCenter;

    this.draw();
  }

  clickCircle(xmouse, ymouse) {
    let xDistance = xmouse - this.x;
    let yDistance = ymouse - this.y;

    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

    return distance <= this.radius ? true : false;
  }
}

// Implementation
let planets;
function init() {
  planets = [];

  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      47,
      0,
      1,
      "Słońce",
      planetsDiscriptions.opisSlonce,
      planetsScore.punktySlonce
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      17,
      80,
      6,
      "Merkury",
      planetsDiscriptions.opisMerkury,
      planetsScore.punktyMerkury
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      22,
      105,
      10,
      "Wenus",
      planetsDiscriptions.opisWenus,
      planetsScore.punktyWenus
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      27,
      160,
      2,
      "Ziemia",
      planetsDiscriptions.opisZiemia,
      planetsScore.punktyZiemia
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      20,
      208,
      3,
      "Mars",
      planetsDiscriptions.opisMars,
      planetsScore.punktyMars
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      40,
      268,
      99,
      "Jowisz",
      planetsDiscriptions.opisJowisz,
      planetsScore.punktyJowisz
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      36,
      345,
      1,
      "Saturn",
      planetsDiscriptions.opisSaturn,
      planetsScore.punktySaturn
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      32,
      415,
      90,
      "Uran",
      planetsDiscriptions.opisUran,
      planetsScore.punktyUran
    )
  );
  planets.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      30,
      480,
      56,
      "Neptun",
      planetsDiscriptions.opisNeptun,
      planetsScore.punktyNeptun
    )
  );
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  planets.forEach((planet) => {
    planet.update();
  });
}
