const gamesCanvas = document.getElementById('games');
const ctx = gamesCanvas.getContext('2d');
gamesCanvas.width = window.innerWidth;
gamesCanvas.height = window.innerHeight;
const ship = {
    x: gamesCanvas.width / 2,
    y: gamesCanvas.height / 2,
    r: 10,
    a: 0,
    v: 0,
    dx: 0,
    dy: 0,
    color: 'white',
    lasers: [],
    canShoot: true,
};
function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.a);
    ctx.beginPath();
    ctx.moveTo(0, -ship.r * 2);
    ctx.lineTo(-ship.r, ship.r * 2);
    ctx.lineTo(ship.r, ship.r * 2);
    ctx.closePath();
    ctx.strokeStyle = ship.color;
    ctx.fillsStyle = ship.color;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}
function shootLaser() {
    if(ship.canShoot&&ship.lasers.length < 10) {
        ship.lasers.push({
            x: ship.x,
            y: ship.y,
            dx: 0,
            dy: -5,
            color: 'white',
        });
    }
    ship.canShoot = false;
}
function drawLasers() {
    for(let i = 0; i < ship.lasers.length; i++) {
        ctx.beginPath();
        ctx.moveTo(ship.lasers[i].x, ship.lasers[i].y);
        ctx.lineTo(ship.lasers[i].x + ship.lasers[i].dx, ship.lasers[i].y + ship.lasers[i].dy);
        ctx.strokeStyle = ship.lasers[i].color;
        ctx.stroke();
        ship.lasers[i].x += ship.lasers[i].dx;
        ship.lasers[i].y += ship.lasers[i].dy;
        if(ship.lasers[i].y < 0) {
            ship.lasers.splice(i, 1);
        }
    }
}
function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, gamesCanvas.width, gamesCanvas.height);
    drawShip();
    drawLasers();
}
update();
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a':
            ship.dx = -5;
            ship.x += ship.dx;
            break;
        case 'd':
            ship.dx = 5;
            ship.x += ship.dx;
            break;
        case 'l':
            shootLaser();
            console.log(ship.lasers);
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            ship.dx = 0;
            break;
        case 'd':
            ship.dx = 0;
            break;
    }
})