class Flame {
    constructor(x, y, sprite, scale) {
        this.x = x;
        this.y = y;
        this.dangerosityPoints = int(100 * scale);
        this.animation = new Animation(65, 60, 4, sprite, 1, 250, scale);
    }

    isHit(x, y) {
        if (x > this.x && x < this.x + this.animation.w) {
            if (y > this.y && y < this.y + this.animation.h) {
                if (this.animation.scale > 0.1) {
                    this.animation.scale -= 0.30;
                    this.dangerosityPoints -= 30;
                    return true;
                }
            }
        }
        return false;
    }
}

class FlameHandler {
    constructor(timeRangeBeg, timeRangeEnd, dangerosityLimit) {
        this.timeRangeBeg = timeRangeBeg;
        this.timeRangeEnd = timeRangeEnd;
        this.dangerosityLimit = dangerosityLimit;
        this.flameArr = [];
        this.globalDangerosityLevel = 0;
        this.clock = new Clock(int(random(timeRangeBeg, timeRangeEnd)));
    }

    update() {
        if (this.clock.update()) {
            this.clock.setActionTime(int(random(this.timeRangeBeg, this.timeRangeEnd)));
            this.clock.reset();
            let xPos = int(random(300, width - 300));
            let yPos = int(random(200, height - 200));
            let randomScale = random(0.9, 1.5);
            this.flameArr.push(new Flame(xPos, yPos, flameSprite, randomScale));
            this.checkDangerosityLevel();
        }
        for (let i = 0; i < this.flameArr.length; i++) {
            this.flameArr[i].animation.update();
        }
    }

    display() {
        this.checkForDeadFire();
        for (let i = 0; i < this.flameArr.length; i++) {
            this.flameArr[i].animation.draw(this.flameArr[i].x, this.flameArr[i].y);
        }
    }

    checkForDeadFire() {
        for (let i = 0; i < this.flameArr.length; i++) {
            if (this.flameArr[i].animation.scale <= 0.3) {
                this.flameArr.splice(i, 1);
            }
        }
    }

    addBunchOfFires(nbrOfFire) {
        for (let i = 0; i < nbrOfFire; i++) {
            let xPos = int(random(100, width));
            let yPos = int(random(200, height));
            let randomScale = random(0.9, 1.5);
            this.flameArr.push(new Flame(xPos, yPos, flameSprite, randomScale));
        }
    }

    checkDangerosityLevel() {
        let acc = 0;
        for (let i = 0; i < this.flameArr.length; i++) {
            acc += this.flameArr[i].dangerosityPoints;
        }
        if (acc >= this.dangerosityLimit) {
            inGameOver = true;
        }
    }
}
