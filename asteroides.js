const gameEl = document.getElementById('game');
const ctx = gameEl.getContext('2d');
gameEl.width = window.innerWidth;
gameEl.height = window.innerHeight;
const asteroidColors = ['#F00','#0F0','#00F','#FF0','#0FF','#F0F'];
const ship={
    x:gameEl.width/2,
    y:gameEl.height/2,
    r:22,
    a:Math.PI/2,
    vx:4,
    vy:4,
    canShoot:true,
}
const laser={
    x:ship.x,
    y:ship.y,
    r:5,
    vx:Math.cos(ship.a)*10,
    vy:Math.sin(ship.a)*10,
}
function newAsteroid(x,y,r,a,color){
    var lvlMult = 3+Math.floor(Math.random()*10);
    var roid = {
        x,
        y,
        r,
        a,
        color,
        vx: Math.random()<.5?-1:1,
        vy: Math.random()<.5?-1:1,
        a:Math.random()*Math.PI*2,
        offs: [],
        vert:Math.floor(Math.random()*(lvlMult+1)+3),
    };
    for(var i=0;i<roid.vert;i++){
        roid.offs.push(Math.random()*roid.r);
    }
    return roid;
}
function createAsteroidBelt(){
    var roids = [];
    for(var i=0;i<10;i++){
        roids.push(newAsteroid(Math.random()*gameEl.width,Math.random()*gameEl.height,Math.random()*30+10));
    }
    return roids;
}
function drawAsteroid(roid){
    ctx.beginPath();
    ctx.moveTo(roid.x+Math.cos(roid.a)*roid.r,roid.y+Math.sin(roid.a)*roid.r);
    for(var i=0;i<roid.vert;i++){
        var a = roid.a+i*2*Math.PI/roid.vert;
        ctx.strokeStyle = asteroidColors[i%asteroidColors.length];
        ctx.fillStyle = asteroidColors[i%asteroidColors.length];
        ctx.lineTo(roid.x+Math.cos(a)*(roid.r+roid.offs[i]),roid.y+Math.sin(a)*(roid.r+roid.offs[i]));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function rotateShip(event){
    switch(event.key){
        case 'a':
            ship.a-=.1;
            break;
        case 'd':
            ship.a+=.1;
            break;
    }
}
function laserKey(event){
    if(event.key==='k'){
        laser.x = ship.x;
        laser.y = ship.y;
        laser.a = ship.a;
    }
}
function moveAsteroids(roids){
    for(var i=0;i<roids.length;i++){
        drawAsteroid(roids[i]);
        roids[i].x += roids[i].vx;
        roids[i].y += roids[i].vy;
        if(i%2===0){
            roids[i].a += .05*Math.random();
        }else{
            roids[i].a -= .05*Math.random();
        }
        if(roids[i].x<0){
            roids[i].x = gameEl.width;
        }
        if(roids[i].x>gameEl.width){
            roids[i].x = 0;
        }
        if(roids[i].y<0){
            roids[i].y = gameEl.height;
        }
        if(roids[i].y>gameEl.height){
            roids[i].y = 0;
        }
    }
}
function drawShip(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.stroke
    ctx.moveTo(ship.x,ship.y);
    ctx.lineTo(ship.x+Math.cos(ship.a)*ship.r,ship.y+Math.sin(ship.a)*ship.r);
    ctx.lineTo(ship.x+Math.cos(ship.a+Math.PI/2)*ship.r,ship.y+Math.sin(ship.a+Math.PI/2)*ship.r);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}
function moveShip(){
    drawShip();
    ship.x += ship.vx;
    ship.y += ship.vy;
    if(ship.x<0){
        ship.x = gameEl.width;
    }
    if(ship.x>gameEl.width){
        ship.x = 0;
    }
    if(ship.y<0){
        ship.y = gameEl.height;
    }
    if(ship.y>gameEl.height){
        ship.y = 0;
    }
}
function drawLaser(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.moveTo(laser.x,laser.y);
    laser.x += laser.vx;
    laser.y += laser.vy;
    ctx.lineTo(laser.x,laser.y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
};
const roids = createAsteroidBelt();
function update(){
    ctx.clearRect(0,0,gameEl.width,gameEl.height);
    moveAsteroids(roids);
    moveShip();
    drawLaser();
    roids.forEach(drawAsteroid);
    requestAnimationFrame(update);
}
update();
window.addEventListener('keydown',rotateShip);
window.addEventListener('keydown',laserKey);