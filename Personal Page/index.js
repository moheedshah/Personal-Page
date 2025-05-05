 // Enhanced Particle Background with Connections
 const canvas = document.getElementById('particles');
 const ctx = canvas.getContext('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 let particlesArray = [];
 const numberOfParticles = 80;

 class Particle {
   constructor() {
     this.x = Math.random() * canvas.width;
     this.y = Math.random() * canvas.height;
     this.size = Math.random() * 4 + 1;
     this.speedX = Math.random() * 0.8 - 0.4;
     this.speedY = Math.random() * 0.8 - 0.4;
   }

   update() {
     this.x += this.speedX;
     this.y += this.speedY;
     if (this.size > 0.2) this.size -= 0.01;
   }

   draw() {
     ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
     ctx.beginPath();
     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
     ctx.fill();
   }
 }

 function init() {
   particlesArray = [];
   for (let i = 0; i < numberOfParticles; i++) {
     particlesArray.push(new Particle());
   }
 }

 function connect() {
   for (let a = 0; a < particlesArray.length; a++) {
     for (let b = a; b < particlesArray.length; b++) {
       let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
       if (distance < 5000) {
         ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 5000})`;
         ctx.lineWidth = 1;
         ctx.beginPath();
         ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
         ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
         ctx.stroke();
       }
     }
   }
 }

 function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   for (let i = 0; i < particlesArray.length; i++) {
     particlesArray[i].update();
     particlesArray[i].draw();
     if (particlesArray[i].size <= 0.2) {
       particlesArray.splice(i, 1);
       i--;
       particlesArray.push(new Particle());
     }
   }
   connect();
   requestAnimationFrame(animate);
 }

 init();
 animate();

 window.addEventListener('resize', () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   init();
 });