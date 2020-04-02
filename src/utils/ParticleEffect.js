export function start(el = 'particle') {
    let canvas = document.getElementById(el),
        ctx = canvas.getContext('2d'),
        WIDTH,
        HEIGHT,
        mouseMoving = false,
        mouseMoveChecker,
        mouseX,
        mouseY,
        stars = [],
        initStarsPopulation = 80,
        dots = [],
        dotsMinDist = 2,
        maxDistFromCursor = 50;

    function genColor(len = 1) {
        let str = new Array(len).fill(1).map(() => Math.floor(Math.random() * 170) + 50).join(',');
        return str;
    }

    function Star(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 2) + 1;
        let alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
        this.color = `rgba(255, 0 ,0, ${1})}`; //"rgba(255,255,255," + alpha + ")";
    }

    Star.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    Star.prototype.move = function() {
        this.y -= .15;
        if (this.y <= -10) this.y = HEIGHT + 10;
        this.draw();
    }

    Star.prototype.die = function() {
        stars[this.id] = null;
        delete stars[this.id];
    }


    function Dot(id, x, y, r) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = Math.floor(Math.random() * 5) + 1;
        this.maxLinks = 2;
        this.speed = 0.5;
        this.a = 0.5;
        this.aReduction = 0.005;
        this.color = genColor(3); //"rgba(255,255,255," + this.a + ")";
        this.linkColor = genColor(3); //"rgba(255,255,255," + this.a / 4 + ")";

        this.dir = Math.floor(Math.random() * 140) + 200;
    }

    Dot.prototype.draw = function() {
        ctx.fillStyle = `rgba(${this.color}, ${this.a})`;
        ctx.shadowBlur = this.r * 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fill();
    }

    Dot.prototype.link = function() {
        if (this.id === 0) return;
        let previousDot1 = getPreviousDot(this.id, 1);
        let previousDot2 = getPreviousDot(this.id, 2);
        let previousDot3 = getPreviousDot(this.id, 3);
        if (!previousDot1) return;
        ctx.strokeStyle = `rgba(${this.color}, ${this.a})`; //this.linkColor;
        ctx.moveTo(previousDot1.x, previousDot1.y);
        ctx.beginPath();
        ctx.lineTo(this.x, this.y);
        if (previousDot2 !== false) ctx.lineTo(previousDot2.x, previousDot2.y);
        if (previousDot3 !== false) ctx.lineTo(previousDot3.x, previousDot3.y);
        ctx.stroke();
        ctx.closePath();
    }

    function getPreviousDot(id, stepback) {
        if (id === 0 || id - stepback < 0) return false;
        if (typeof dots[id - stepback] !== "undefined") return dots[id - stepback];
        else return false; //getPreviousDot(id - stepback);
    }

    Dot.prototype.move = function() {
        this.a -= this.aReduction;
        if (this.a <= 0) {
            this.die();
            return
        }
        // this.color = "rgba(255,255,255," + this.a + ")";
        // this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
        this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed;
        this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;

        this.draw();
        this.link();
    }

    Dot.prototype.die = function() {
        dots[this.id] = null;
        delete dots[this.id];
    }

    function init() {
        if (!canvas) {
            throw new Error(`元素${el}不存在`)
        }
        WIDTH = canvas.clientWidth;
        HEIGHT = canvas.clientHeight;
        canvas.setAttribute('width', WIDTH);
        canvas.setAttribute('height', HEIGHT);
        canvas.onmousemove = mouseMoveEvent;
        ctx.strokeStyle = `rgb(${genColor(3)})`;
        ctx.shadowColor = "white";
        for (let i = 0; i < initStarsPopulation; i++) {
            // stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
            // stars[i].draw();
        }
        ctx.shadowBlur = 0;
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (let i in stars) {
            stars[i].move();
        }
        for (let i in dots) {
            dots[i].move();
        }
        drawIfMouseMoving();
        requestAnimationFrame(animate);
    }




    function drawIfMouseMoving() {
        if (!mouseMoving) return;

        if (dots.length === 0) {
            dots[0] = new Dot(0, mouseX, mouseY);
            dots[0].draw();
            return;
        }

        let previousDot = getPreviousDot(dots.length, 1);
        let prevX = previousDot.x;
        let prevY = previousDot.y;

        let diffX = Math.abs(prevX - mouseX);
        let diffY = Math.abs(prevY - mouseY);

        if (diffX < dotsMinDist || diffY < dotsMinDist) return;

        let xVariation = Math.random() > .5 ? -1 : 1;
        xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
        let yVariation = Math.random() > .8 ? -1 : 1;
        yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
        dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
        dots[dots.length - 1].draw();
        dots[dots.length - 1].link();
    }

    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    function mouseMoveEvent(e) {
        mouseMoving = true;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        clearInterval(mouseMoveChecker);
        mouseMoveChecker = setTimeout(function() {
            mouseMoving = false;
        }, 100);
    }

    init();
}

export const destory = () => {
    window.onmousemove = null;
}