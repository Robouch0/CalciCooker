class Animation {
    constructor(width, height, nbOfFrame, img, nbOfRows, frameDuration, scale) {
        this.w = width;
        this.h = height;
        this.nbOfFrame = nbOfFrame;
        this.img = img;
        this.nbOfRows = nbOfRows;
        this.nbOfCols = nbOfFrame / nbOfRows;
        this.currentTime = 0;
        this.currentFrame = 0;
        this.frameDuration = frameDuration;
        this.scale = scale;
        this.clock = new Clock(frameDuration);
        this.currXFrame = 0;
        this.currYFrame = 0;
    }

    update() {
        if (this.clock.update()) {
            this.currentFrame = (this.currentFrame + 1) % this.nbOfFrame;
            let rowIndex = Math.floor(this.currentFrame / this.nbOfCols);
            let colIndex = this.currentFrame % this.nbOfCols;
            this.currXFrame = colIndex * this.w;
            this.currYFrame = rowIndex * this.h;
            return true;
        }
        return false;
    }

    addOffsetToCurr(xOffset, yOffset) {
        this.currXFrame += xOffset;
        this.currYFrame += yOffset;
    }

    draw(x, y) {
        push();
        scale(this.scale);
        image(this.img, x / this.scale, y / this.scale , this.w, this.h, this.currXFrame, this.currYFrame, this.w, this.h);
        pop();
    }

}

class Clock {
    constructor(actionTime) {
        this.currentTime = 0;
        this.startTime = millis();
        this.elapsedTime = 0;
        this.actionTime = actionTime;
    }

    update() {
        this.currentTime = millis();
        this.elapsedTime = this.currentTime - this.startTime;
        if (this.elapsedTime >= this.actionTime) {
            this.reset();
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.startTime = this.currentTime;
    }

    setActionTime(newTime) {
        this.actionTime = newTime;
    }
}

class ButtonRect {
    constructor(x, y, w, h, color, str) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.originalColor = color;
        this.buttonColor = color;
        this.str = str;
    }

    isHover(x, y) {
        if (x > this.x && x < (this.x + this.w) && y > this.y && y < (this.y + this.h)) {
            return true;
        }
        return false;
    }

    isClicked(x, y) {
        if (x > this.x && x < (this.x + this.w) && y > this.y && y < (this.y + this.h)) {
            return true;
        }
        return false;
    }

    changeColor(color) {
        this.buttonColor = color;
    }

    resetColor() {
        this.buttonColor = this.originalColor;
    }

    draw() {
        push();
        fill(this.buttonColor.r, this.buttonColor.g, this.buttonColor.b);
        rect(this.x, this.y, this.w, this.h);
        fill(0, 0, 0);
        text(this.str, this.x + this.h / 2, this.y + this.h / 1.5);
        pop();
    }
}

class ColorRGB {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}