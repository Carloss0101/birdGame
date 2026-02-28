export function createExplosion(e, bird) {
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");

    explosion.style.left = e.pageX + "px";
    explosion.style.top = e.pageY + "px";

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement("span");

        const angle = (i / 8) * 2 * Math.PI;
        const radius = 40;

        const x = Math.cos(angle) * radius + "px";
        const y = Math.sin(angle) * radius + "px";

        particle.style.setProperty("--x", x);
        particle.style.setProperty("--y", y);

        explosion.appendChild(particle);
    }

    document.body.appendChild(explosion);

    setTimeout(() => {
        explosion.remove();
    }, 500);

    bird.style.visibility = "hidden";
}

export function moveBirdLeft(bird, type) {
    let position = window.innerWidth;

    let speed;

    if (type === "bird-large") speed = 4;
    if (type === "bird-medium") speed = 8;
    if (type === "bird-small") speed = 10;

    function animate() {
        position -= speed;
        bird.style.left = position + "px";

        if (position < -200) {
            bird.remove();
            return;
        }

        requestAnimationFrame(animate);
    }

    animate();
}

export function moveBirdRight(bird, type) {
    let position = -200;

    let speed;

    if (type === "bird-large") speed = 4;
    if (type === "bird-medium") speed = 8;
    if (type === "bird-small") speed = 10;

    function animate() {
        position += speed;
        bird.style.left = position + "px";

        if (position < -200) {
            bird.remove();
            return;
        }

        requestAnimationFrame(animate);
    }

    animate();
}
