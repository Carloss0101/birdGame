import { moveBird } from "./animation.js";
import { createExplosion } from "./animation.js";
import { updatePoints } from "./nav.js";

export function getRandomBirdType() {
    const random = Math.random(); 

    if (random < 0.8) {
        return "bird-large";
    } else if (random < 0.95) {
        return "bird-medium";
    } else {
        return "bird-small";
    }
}

export function createBird() {
    const bird = document.createElement("img");

    bird.src = "assets/images/bird.gif";
    bird.classList.add("bird");

    const type = getRandomBirdType();
    bird.classList.add(type);

    const maxHeight = window.innerHeight - 150;
    const randomY = Math.random() * maxHeight;

    bird.style.top = randomY + "px";
    bird.style.left = window.innerWidth + "px";

    document.body.appendChild(bird);

    bird.addEventListener("click", function(event) {

        if (this.classList.contains("bird-small")) {
            updatePoints(2);
        } else if (this.classList.contains("bird-medium")) {
            updatePoints(1);
        } else {
            updatePoints(0.5);
        }

        createExplosion(event, this);
        this.remove(); 
    });

    moveBird(bird, type);
}