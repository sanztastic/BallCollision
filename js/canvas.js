var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

// const mouse = {
//     x: undefined,
//     y: undefined
// }
// window.addEventListener('mousemove', (e) => {
//     mouse.x = e.x;
//     mouse.y = e.y;
// });
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.mass = 1;
    this.velocity = {
        x: Math.random() - 0.5 * 2,
        y: Math.random() - 0.5 * 2
    }
    this.radius = radius;
    this.minRadius = radius;
    this.color = randomColor(colorArray);

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.update = function (balls) {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        // if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        //     if (this.radius <= 40) {
        //         this.radius += 1;
        //     }
        // } else if (this.radius > this.minRadius) {
        //     this.radius -= 1;
        // }
        this.draw();
        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            if (distance(this.x, this.y, balls[i].x, balls[i].y) - (this.minRadius + balls[i].minRadius) < 0) {
                resolveCollision(this, balls[i]);
            }
        }
    }
}

let ballArr = [];
function init() {
    ballArr = [];
    for (let i = 0; i < 200; i++) {
        let radius = randomIntFromRange(2, 40);
        let x = randomIntFromRange(radius, innerWidth - radius);
        let y = randomIntFromRange(radius, innerHeight - radius);

        if (i !== 0) {
            for (let j = 0; j < ballArr.length; j++) {
                if (distance(x, y, ballArr[j].x, ballArr[j].y) - (radius + ballArr[j].radius) < 0) {
                    x = randomIntFromRange(radius, innerWidth - radius);
                    y = randomIntFromRange(radius, innerHeight - radius);

                    j = -1;
                }

            }
        }
        ballArr.push(new Circle(x, y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < ballArr.length; i++) {
        ballArr[i].update(ballArr);
    }
}
init();
animate();