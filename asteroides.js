const gameEl = document.getElementById('game');
const ctx = gameEl.getContext('2d');
gameEl.width = window.innerWidth;
gameEl.height = window.innerHeight;
function newAsteroid(x,y,r){
    var lvlMult = 3+Math.floor(Math.random()*10);
    var roid = {
        x,
        y,
        r,
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
        ctx.strokeStyle = 'white';
        ctx.lineTo(roid.x+Math.cos(a)*(roid.r+roid.offs[i]),roid.y+Math.sin(a)*(roid.r+roid.offs[i]));
    }
    ctx.closePath();
    ctx.stroke();
}
const roids = createAsteroidBelt();
roids.forEach(drawAsteroid);