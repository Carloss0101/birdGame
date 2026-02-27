const pointsElement = document.getElementById("points");
let points = 0;


export function updatePoints(pointsToAdd = 1) {
    points += pointsToAdd;
    pointsElement.textContent = points;
}

export function getPoints() {
    return points;
}