function createArrayForSkewer(x, y) {
    let arr = [];
    let offset = 30;
    let sizeH = 15;

    for (let i = 0; i < 5; i++) {
        arr.push(new IngredientOnSkewer(x + 50, y + i * sizeH + offset, "nothing", 0));
        offset += 120;
    }
    return arr;
}

function createBasicMap() {
    return new Map([["nbrTomato", 0], ["nbrCheese", 0], ["nbrGreenPepper", 0], ["nbrSausage", 0]]);
}

class Skewer {
    constructor(x, y, sprite, width, height) {
        this.x = x;
        this.w = width;
        this.y = y;
        this.h = height;
        this.animation = new Animation(741, 883, 3, skewerSprite, 1, 300, 1);
        this.ingredients = createArrayForSkewer(x, y);
        this.side = "front";
        this.cooked = false;
        this.overcooked = false;
        this.cooking = false;
        this.overcooking = false;
        this.cookingTime = null;
        this.overcookedTime = null;
        this.oneSideBurnt = false;
        this.finish = false;
        this.angry = false;
        this.nbrMapIngredients = createBasicMap();
    }

    isSkewerFull() {
        let count = 0;
        for (let i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i].empty == false) {
                count += 1;
            }
        }
        if (count == this.ingredients.length) {
            return true;
        } else {
            return false;
        }
    }

    resetCookingStates() {
        this.cooked = false;
        this.overcooked = false;
        this.cooking = false;
        this.overcooking = false;
        this.cookingTime = null;
        this.overcookedTime = null;
    }

    update() {
        if (this.cookingTime.update() == true) {
            if (this.cooked == false) {
                this.cooked = true;
                return true;
            }
        }
        return false;
    }
    updateOvercooked() {
        if (this.overcookedTime.update()) {
            if (this.cooked == true && this.overcooked != true) {
                return true;
            }
        }
        return false;
    }

    incrementMap(aliment) {
        if (aliment == "tomato") {
            let nbrOfTomato = this.nbrMapIngredients.get("nbrTomato");
            nbrOfTomato += 1;
            this.nbrMapIngredients.set("nbrTomato", nbrOfTomato);
        }
        if (aliment == "cheese") {
            let nbrOfCheese = this.nbrMapIngredients.get("nbrCheese");
            nbrOfCheese += 1;
            this.nbrMapIngredients.set("nbrCheese", nbrOfCheese);
        }
        if (aliment == "sausage") {
            let nbrOfSausage = this.nbrMapIngredients.get("nbrSausage");
            nbrOfSausage += 1;
            this.nbrMapIngredients.set("nbrSausage", nbrOfSausage);
        }
        if (aliment == "greenPepper") {
            let nbrOfGreenPepper = this.nbrMapIngredients.get("nbrGreenPepper");
            nbrOfGreenPepper += 1;
            this.nbrMapIngredients.set("nbrGreenPepper", nbrOfGreenPepper);
        }
    }

    setBackToZero(value, key, map) {
        map.set(key, 0);
    }

    resetMapIngredients() {
        this.nbrMapIngredients.forEach(this.setBackToZero);
    }

    addIngredientToSkewer(sprite, alimentStr) {
        for (let i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i].empty == true) {
                this.ingredients[i].empty = false;
                this.ingredients[i].aliment = alimentStr;
                this.ingredients[i].sprite = getSlicesSprite(this.ingredients[i].aliment);
                this.ingredients[i].w = sizeOfSprite.get(this.ingredients[i].aliment).get("w");
                this.ingredients[i].h = sizeOfSprite.get(this.ingredients[i].aliment).get("h");
                this.incrementMap(alimentStr);
                return;
            }
        }
    }

    isSkewerGood(recipe) {
        console.log(this.nbrMapIngredients.get("nbrTomato"));
        console.log(recipe.get("nbrTomato"));
        console.log(this.nbrMapIngredients.get("nbrCheese"));
        console.log(recipe.get("nbrCheese"));
        console.log(this.nbrMapIngredients.get("nbrGreenPepper"));
        console.log(recipe.get("nbrGreenPepper"));
        console.log(this.nbrMapIngredients.get("nbrSausage"));
        console.log(recipe.get("nbrSausage"));
        console.log(this.nbrMapIngredients + " " + recipe);
        if (this.nbrMapIngredients.get("nbrTomato") != recipe.get("nbrTomato")) {
            return false;
        }
        if (this.nbrMapIngredients.get("nbrCheese") != recipe.get("nbrCheese")) {
            return false;
        }
        if (this.nbrMapIngredients.get("nbrGreenPepper") != recipe.get("nbrGreenPepper")) {
            return false;
        }
        if (this.nbrMapIngredients.get("nbrSausage") != recipe.get("nbrSausage")) {
            return false;
        }
        return true;
    }

    display() {
        this.animation.draw(this.x, this.y);
        for (let i = 0; i < this.ingredients.length; i++) {
            if (this.ingredients[i].empty == false) {
                if (this.cooked == false && this.overcooked == false) {
                    if (this.side == "front") {
                        this.ingredients[i].currX = 0;
                    } else {
                        this.ingredients[i].currX = 0 + this.ingredients[i].w * 5;
                    }
                }
                if (this.cooked == true && this.overcooked == false) {
                    if (this.side == "front") {
                        this.ingredients[i].currX = 0 + this.ingredients[i].w;
                    } else {
                        this.ingredients[i].currX = 0 + this.ingredients[i].w * 4;
                        skewer.finish = true;
                    }
                } else if (this.cooked == false & this.overcooked == true) {
                    this.oneSideBurnt = true;
                    if (this.side == "front") {
                        this.ingredients[i].currX = 0 + this.ingredients[i].w * 2;
                    } else {
                        this.ingredients[i].currX = 0 + this.ingredients[i].w * 3;
                    }
                }
                this.ingredients[i].display();
            }
        }
    }

    rotate() {
        if (this.side == "front") {
            this.side = "back";
        } else {
            this.side = "front";
        }
    }
}
