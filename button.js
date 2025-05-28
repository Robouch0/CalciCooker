class Button {
    constructor(x, y, sprite, r, width, height) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currX = 0;
        this.currY = 0;
        this.w = width;
        this.h = height;
        this.sprite = sprite;
    }

    display() {
        push();
        fill(255, 0, 100);
        image(this.sprite, this.x, this.y, this.w, this.h, this.currX, this.currY, this.w, this.h);
        pop();
    }

    isHit() {
        if (dist(mouseX, mouseY, this.x + this.w / 2, this.y + this.h / 2) <= this.r) {
            return true;
        }
        return false;
    }
}