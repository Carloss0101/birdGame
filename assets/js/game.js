import { createExplosion } from "./components/animation.js";
import { updatePoints, getPoints } from "./components/nav.js";
import { createBird } from "./components/bird.js";

let timeLeft = 60; //secunds
let timerInterval;
let spawnInterval;

const timerElement = document.getElementById("timer");

function startTimer() {
    timerElement.textContent = `00:${timeLeft}`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function startSpawning() {
    spawnInterval = setInterval(() => {
        createBird();
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    clearInterval(spawnInterval);
    document.querySelectorAll(".bird").forEach(bird => bird.remove());

    document.querySelector("header").style.display = "none";
    document.getElementById("score").textContent = getPoints();
    document.getElementById("menu").style.display = "flex";
}

const birds = document.querySelectorAll(".bird");
birds.forEach(bird => {
        bird.addEventListener("click", function(event) {
        if (this.classList.contains("bird-small")) {
            updatePoints(2);
        } else if (this.classList.contains("bird-medium")) {
            updatePoints();
        } else {
            updatePoints(0.5);
        }
        createExplosion(event, this);
    });
});

function startCountdown(callback) {
    const countdownElement = document.getElementById("countdown");

    let count = 3;

    countdownElement.style.display = "flex";
    countdownElement.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;

        if (count > 0) {
            countdownElement.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownElement.style.display = "none";
            callback();
        }

    }, 1000);
}

function resetGame() {
    timeLeft = 10;
    timerElement.textContent = "00:10";

    updatePoints(-getPoints()); 
}

document.getElementById("start-btn").addEventListener("click", function() {
    resetGame();

    document.getElementById("menu").style.display = "none";
    document.querySelector("header").style.display = "block";
    
    startCountdown(() => {
        startTimer();
        startSpawning();
    });
});
