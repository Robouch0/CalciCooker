class IngredientOnCounter {
    constructor(sprite, x, y, alimentStr) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.holded = false;
        this.aliment = alimentStr;
    }

    display() {
        image(this.sprite, this.x, this.y);
    }

    isClicked() {
        if (mouseX > this.x && mouseX < (this.x + this.sprite.width)) {
            if (mouseY > this.y && mouseY < (this.y + this.sprite.height)) {
                return true;
            }
        }
        return false;
    }

    displayHold() {
        if (this.isHold()) {
            image(this.sprite, mouseX, mouseY);
        }
    }

    isHold() {
        return this.holded;
    }
}

function getSlicesSprite(strAliment) {
    if (strAliment == "tomato") {
        return tomatoSlices;
    }
    if (strAliment == "cheese") {
        return cheeseSlices;
    }
    if (strAliment == "sausage") {
        return sausageSlices;
    }
    if (strAliment == "greenPepper") {
        return greenPepperSlices;
    }
}

class IngredientOnSkewer {
    constructor(x, y, alimentStr, width, sprite, height) {
        this.x = x;
        this.y = y;
        this.empty = true;
        this.sprite = sprite;
        this.front = true;
        this.back = false;
        this.stateFront = 0;
        this.stateBack = 0;
        this.currX = 0;
        this.w = width;
        this.h = height;
        this.aliment = alimentStr;
    }

    display() {
        if (this.empty == false) {
            push();
            image(this.sprite, (this.x + skewer.animation.w / 2 - 120) , this.y , this.w, this.h, this.currX, 0, this.w, this.h);
            pop();
        }
    }
}