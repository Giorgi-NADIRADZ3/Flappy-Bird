const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2; 

let temp = canvas.height -90;

const gradiant = ctx.createLinearGradient(0, 0, 0, 70);
gradiant.addColorStop('0.4','#fff');
gradiant.addColorStop('0.5','#000');
gradiant.addColorStop('0.55','#4040ff');
gradiant.addColorStop('0.6','#000');
gradiant.addColorStop('0.9','#fff');



const background = new Image();
background.src = 'nadira.png';
const moon = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground(){
    if (moon.x1 <= -moon.width + gamespeed) moon.x1 = moon.width;
    else moon.x1 -= gamespeed;
    if (moon.x2 < -moon.width + gamespeed) moon.x2 = moon.width;
    else(moon.x2 -= gamespeed);
    ctx.drawImage(background, moon.x1, moon.y, moon.width, moon.height);
    ctx.drawImage(background, moon.x2, moon.y, moon.width, moon.height);
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   // ctx.fillRect(10, temp, 50, 50);
    handleBackground();
    handleObstacles();
    handleParticles();
    bird.update();
    bird.draw();
    ctx.fillStyle = gradiant;
    ctx.font = '90px    Georgia';
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if (handleCollisions()) return;
    requestAnimationFrame(animate);
    angle+= 0.12;
    hue++;
    frame++;
}

animate();

// ამ მეთდოით ვგებულობთ თუ რა კლავიატურის ღილაკს ვეხებით ინფორმაციას გვაძლევს კონსოლში
window.addEventListener('keydown', function(e){
    //console.log(e.code);
    // ამ მეთოდით კლავიტურაზე დაჭერის დროს ფიგურა ავა ზევით temp()
    if (e.code === 'Space') spacePressed = true;
    //temp -= 10;
});


window.addEventListener('keyup', function(e){
    if (e.code === 'Space') spacePressed = false;
});


const bang = new Image();
bang.src = 'bang.png';

function handleCollisions(){
    for (let i = 0; i < obstaclesArray.length; i++){
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) || 
            (bird.y > canvas.height - obstaclesArray[i].bottom &&
            bird.y + bird.height < canvas.height ))){
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                ctx.font = '25px Georgia';
                ctx.fillStyle = 'white';
                ctx.fillText('თამაში დასრულდა' + ' '  + 'შენი შედეგია ' + score + ' ქულა', 70, canvas.height/2 -10);
                return true;
                
            }
    }
}

