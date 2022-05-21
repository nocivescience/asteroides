const gameEl = document.getElementById('game');
const ctx = gameEl.getContext('2d');
gameEl.width = window.innerWidth;
gameEl.height = window.innerHeight;
const asteroidColors = ['#F00','#0F0','#00F','#FF0','#0FF','#F0F'];
const laserMax=12;
const roids = createAsteroidBelt();
// atributos de la nave
const ship={
    x:gameEl.width/2,
    y:gameEl.height/2,
    r:22,
    a:Math.PI/2*3,
    vx:4,
    vy:4,
    canShoot:true,
    lasers:[],
}

// atributos de los lasers
const laser={
    x:ship.x,
    y:ship.y,
    r:5,
    vx:Math.cos(ship.a)*10,
    vy:Math.sin(ship.a)*10,
}

//creando un nuevo asteroide
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

//creando un cinturon de asteroides
function createAsteroidBelt(){
    var roids = [];
    for(var i=0;i<10;i++){
        roids.push(newAsteroid(Math.random()*gameEl.width,Math.random()*gameEl.height,Math.random()*30+10));
    }
    return roids;
}

//pintando los asteroides
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

//dandlo movimiento a los asteroides
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

//pintando la nave
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

//proveyendo de rotacion a mi nave
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

//propiedades para los lasers 
function laserShoot(){
    if(ship.canShoot&&ship.lasers.length<laserMax){
        ship.lasers.push({
            x:ship.x,
            y:ship.y,
            a:ship.a,
            vx:Math.cos(ship.a)*10,
            vy:Math.sin(ship.a)*10,
            dist:0,
            explodeTime:0,
        });
    }
    ship.canShoot = false;
}

//los lasers

//caracteristicas de disparo de los lasers
function shootLaser(){
    if(ship.canShoot&&ship.lasers.length<laserMax){
        ship.lasers.push({
            x:ship.x,
            y:ship.y,
            a:ship.a,
            vx:Math.cos(ship.a)*10,
            vy:Math.sin(ship.a)*10,
            dist:0,
            explodeTime:0,
        });
    }
    ship.canShoot = false;
}

//drawing los lasers
function drawLaser(laser){
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(laser.x,laser.y);
    ctx.arc(laser.x,laser.y,laser.r*Math.random(),0,Math.PI*2);
    ctx.stroke();
}

//movimiento de los lasers
function moveLaser(laser){
    for(var i=0;i<laser.length;i++){
        if(laser[i].dist>laserDist){
            laser.splice(i,1);
            i--;
            continue;
        }
        if(ship.lasers[i].explodeTime>0){
            ship.lasers[i].explodeTime--;
            if(ship.lasers[i].explodeTime===0){
                ship.lasers.splice(i,1);
                i--;
            }
        }else{
            ship.lasers[i].x += ship.lasers[i].vx;
            ship.lasers[i].y += ship.lasers[i].vy;
        }
    }   
}

// activando la escena
function update(){
    ctx.clearRect(0,0,gameEl.width,gameEl.height);
    moveAsteroids(roids);
    drawShip();
    drawLaser(laser);
    moveLaser(laser);
    roids.forEach(drawAsteroid);
    requestAnimationFrame(update);
}
update();

//control de la escena
window.addEventListener('keydown',rotateShip);
window.addEventListener('keydown',(e)=>{
    if(e.key==='k'){
        shootLaser();
        console.log(ship.lasers);
    }
});