function isSomethingHold() {
    for (let i = 0; i < arrIngredients.length; i++) {
        if (arrIngredients[i].isHold()) {
            return true;
        }
    }
    return false;
}

function mousePressed() {
    if (inTuto == true) {
        inTuto = false;
        return;
    }
    if (inGameOver == true) {
        setup();
        inGameOver = false;
        return;
    }
    for (let i = 0; i < flameHandler.flameArr.length; i++) {
        if (flameHandler.flameArr[i].isHit(mouseX, mouseY)) {
            score += 10;
        }
    }
    if (turnButton.isHit() && skewer.overcooking == true && skewer.side == "front") {
        skewer.rotate();
        skewer.resetCookingStates();
    }
    if (dringButton.isHit() && skewer.finish == true) {
        clocheOn = true;
        clocheOnClock = new Clock(2000);
        if (skewer.oneSideBurnt == true) {
            flameHandler.addBunchOfFires(3);
            skewer = new Skewer(1160, 190, skewerSprite, 140, 1000);
            skewer.animation = new Animation(741, 883, 3, angryCalci, 1, 300, 1);
            skewer.finish = false;
            skewer.angry = true;
        } else {
            var lowestTime = 121;
            var indexLowestTime = -1;
            for (let i = 0; i < ordersHandler.orders.length; i++) {
                if (ordersHandler.orders[i].empty != true && skewer.isSkewerGood(ordersHandler.orders[i].ingredientMap)) {
                    console.log(ordersHandler.orders[i].barW + " " + ordersHandler.orders[i].empty);
                    if (ordersHandler.orders[i].barW < lowestTime) {
                        lowestTime = ordersHandler.orders[i].barW;
                        indexLowestTime = i;
                    }
                }
            }
            console.log(indexLowestTime);
            if (indexLowestTime != -1) {
                score += 100;
                skewer.angry = false;
                ordersHandler.orders[indexLowestTime].reset();
                skewer = new Skewer(1160, 190, skewerSprite, 140, 1000);
                skewer.finish = false;
            }
        }
    }
}

function mouseDragged() {
    for (let i = 0; i < arrIngredients.length; i++) {
        if (arrIngredients[i].isClicked() && isSomethingHold() == false) {
            arrIngredients[i].holded = true;
            console.log(arrIngredients[i].aliment);
        }
    }
}

function mouseReleased() {
    if (mouseX > skewer.x + skewer.animation.w / 2 - 20 && mouseX < (skewer.x + skewer.animation.w / 2   + 40)) {
        if (mouseY > skewer.y && mouseY < (skewer.y + 800)) {
            for (let i = 0; i < arrIngredients.length; i++) {
                if (arrIngredients[i].isHold()) {
                    skewer.addIngredientToSkewer(arrIngredients[i].sprite, arrIngredients[i].aliment);
                    break;
                }
            }
            for (let i = 0; i < arrIngredients.length; i++) {
                if (arrIngredients[i].isHold()) {
                    arrIngredients[i].holded = false;
                }
            }
        }
    } else {
        for (let i = 0; i < arrIngredients.length; i++) {
            if (arrIngredients[i].isHold()) {
                arrIngredients[i].holded = false;
            }
        }
    }
}