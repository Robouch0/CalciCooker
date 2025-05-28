let skewer;
let arrIngredients = [];
let recipes = ["nomnom", "normal", "sausageo", "sausageo"];
let score = 0;

let sizeOfSprite = new Map([
    ["tomato", new Map([["w", 150], ["h", 75]])],
    ["cheese", new Map([["w", 150], ["h", 100]])],
    ["sausage", new Map([["w", 150], ["h", 100]])],
    ["dring", new Map([["w", 90], ["h", 90]])],
    ["order", new Map([["w", 150], ["h", 250]])],
    ["greenPepper", new Map([["w", 150], ["h", 100]])],
    ["turn", new Map([["w", 80], ["h", 60]])],
    ["plate", new Map([["w", 337], ["h", 234]])],
]);

let possibleOrders = new Map([
    ["normal", new Map([["nbrTomato", 1], ["nbrCheese", 2], ["nbrGreenPepper", 1], ["nbrSausage", 1]])],
    ["sausageo", new Map([["nbrTomato", 0], ["nbrCheese", 1], ["nbrGreenPepper", 1], ["nbrSausage", 3]])],
    ["nomnom", new Map([["nbrTomato", 0], ["nbrCheese", 3], ["nbrGreenPepper", 0], ["nbrSausage", 2]])],
    ["hauru", new Map([["nbrTomato", 2], ["nbrCheese", 2], ["nbrGreenPepper", 1], ["nbrSausage", 0]])],
]);

let tomatoSprite;
let tomatoSlices;

let cheeseSprite;
let cheeseSlices;

let greenPepperSprite;
let greenPepperSlices;

let sausageSprite;
let sausageSlices;

let skewerSprite;

let ordersHandler;

let flameHandler;

let turnButton;
let turnButtonSprite;

let dringButton;
let dringButtonSprite;

let angryCalci;

let nomnomSprite;
let hauruSprite;
let normalSprite;
let sausageoSprite;
let emptyOrderSprite;
let kitchenSprite;
let plateSprite;
let clocheOn = false;
let clocheOnClock;

let tutoKitchen;
let inTuto = true;

let gameOverScreen;
let inGameOver = false;

function preload() {
    tomatoSprite = loadImage('assets/tomato.png');
    tomatoSlices = loadImage('assets/tomato_slices.png');

    cheeseSprite = loadImage('assets/cheese.png');
    cheeseSlices = loadImage('assets/cheese_slices.png');

    greenPepperSprite = loadImage('assets/greenpepper.png');
    greenPepperSlices = loadImage('assets/greenpepper_slices.png');

    sausageSprite = loadImage('assets/saucisse.png');
    sausageSlices = loadImage('assets/Sausage_slices.png');

    flameSprite = loadImage('assets/Flame.png');
    angryCalci = loadImage('assets/angry_Calcifer.png');
    tutoKitchen = loadImage('assets/tuto.png');

    turnButtonSprite = loadImage('assets/button_to_turn.png');
    dringButtonSprite = loadImage('assets/clochette.png');

    nomnomSprite = loadImage('assets/nomnom.png');
    sausageoSprite = loadImage('assets/sausageo.png');
    normalSprite = loadImage('assets/normal.png');
    hauruSprite = loadImage('assets/hauru.png');
    emptyOrderSprite = loadImage('assets/emptyorder.png');

    gameOverScreen = loadImage('assets/gameover.png');

    plateSprite = loadImage('assets/Plate.png');
    skewerSprite = loadImage('assets/Calcifer.png');
    kitchenSprite = loadImage('assets/kitchen.png');
}

function initIngredients() {
    let tomatoIngredient = new IngredientOnCounter(tomatoSprite, 900, 600, "tomato");
    let cheeseIngredient = new IngredientOnCounter(cheeseSprite, 900, 400, "cheese");
    let sausageIngredient = new IngredientOnCounter(sausageSprite, 600, 400, "sausage");
    let greenPepperIngredient = new IngredientOnCounter(greenPepperSprite, 600, 600, "greenPepper");

    arrIngredients = [tomatoIngredient, cheeseIngredient, sausageIngredient, greenPepperIngredient];
    skewer = new Skewer(1160, 190, skewerSprite, 140, 1000);
}

function setup() {
    createCanvas(1920, 1080);
    initIngredients();
    flameHandler = new FlameHandler(4000, 10000, 1300);
    turnButton = new Button(1300, 800, turnButtonSprite, 160, sizeOfSprite.get("turn").get("w"), sizeOfSprite.get("turn").get("h"));
    dringButton = new Button(40, 900, dringButtonSprite, 160, sizeOfSprite.get("dring").get("w"), sizeOfSprite.get("dring").get("h"));

    ordersHandler = new OrdersHandler();
}

function draw() {
    if (inTuto == true) {
        background(tutoKitchen);
        return;
    }
    if (inGameOver == true) {
        push();
        background(gameOverScreen);
        fill(255, 255, 255);
        textSize(55);
        text("Click anywhere to play Again !", 500, 1000);
        text(("Score : " + score), 600, 600);
        pop();
        return;
    }
    background(kitchenSprite);
    skewer.animation.update();
    skewer.display();
    for (let i = 0; i < arrIngredients.length; i++) {
        arrIngredients[i].display();
        arrIngredients[i].displayHold();
    }

    if (skewer.isSkewerFull() && !skewer.cooking && skewer.overcooked != true) {
        skewer.cookingTime = new Clock(int(random(3000, 7000)));
        skewer.cooking = true;
    } else if (skewer.isSkewerFull() && skewer.cooking) {
        if (skewer.cookingTime != null && skewer.update()) {
            skewer.overcookedTime = new Clock(int(random(3000, 7000)));
            skewer.cooking = true;
            skewer.overcooking = true;
            skewer.cookingTime = null;
        }
    }

    if (skewer.overcooking == true) {
        if (skewer.side == "front") {
            turnButton.display();
        }
        if (skewer.updateOvercooked() == true) {
            skewer.cooked = false;
            skewer.overcooked = true;
        }
    }

    if (ordersHandler.clock.update()) {
        let lowerBound = 16000 - score * 10;
        let upperBound = 25000 - score * 10;
        if (lowerBound <= 0) {
            lowerBound = 0;
        }
        if (upperBound <= 0) {
            upperBound = 1000;
        }
        ordersHandler.clock.setActionTime(random(lowerBound, upperBound));
        for (let i = 0; i < ordersHandler.orders.length; i++) {
            if (ordersHandler.orders[i].empty == true) {
                ordersHandler.orders[i].name = recipes[int(random(0, recipes.length))];
                ordersHandler.orders[i].sprite = getOrderSprite(ordersHandler.orders[i].name);
                ordersHandler.orders[i].ingredientMap = possibleOrders.get(ordersHandler.orders[i].name);
                ordersHandler.orders[i].empty = false;
                ordersHandler.orders[i].barW = 120;
                ordersHandler.orders[i].expirationTime = new Clock(int(random(50000, 115000)));
                return;
            }
        }
    }

    for (let i = 0; i < ordersHandler.orders.length; i++) {
        if (ordersHandler.orders[i].empty == false) {
            if (ordersHandler.orders[i].update() == true) {
                inGameOver = true;
            }
        }
        ordersHandler.orders[i].display();
    }
    if (clocheOn == true) {
        image(plateSprite, 170, 830, sizeOfSprite.get("plate").get("w"), sizeOfSprite.get("plate").get("h"), sizeOfSprite.get("plate").get("w"), 0, sizeOfSprite.get("plate").get("w"), sizeOfSprite.get("plate").get("h"));
        if (clocheOnClock.update() == true) {
            clocheOn = false;
        }
    } else {
        image(plateSprite, 170, 830, sizeOfSprite.get("plate").get("w"), sizeOfSprite.get("plate").get("h"), 0, 0, sizeOfSprite.get("plate").get("w"), sizeOfSprite.get("plate").get("h"));
    }

    dringButton.display();
    flameHandler.timeRangeBeg -= score;
    if (flameHandler.timeRangeBeg <= 0) {
        flameHandler.timeRangeBeg = 0;
    }
    flameHandler.update();
    flameHandler.display();
    textSize(40);
    text(("Score : " + score.toString()), 1600, 100);
}

class Order {
    constructor(x, y, name, expirationTime, index) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.index = index;
        this.empty = true;
        this.barX = this.x + 20;
        this.barY = this.y + 55;
        this.barW = 120;
        this.barH = 10;
        this.sprite = getOrderSprite(this.name);
        this.expirationTime = new Clock(int(random(0, 100000000)));
        this.ingredientMap = possibleOrders.get(this.name);
    }

    reset() {
        this.empty = true;
        this.sprite = getOrderSprite("empty");
        this.barW = 0;
    }

    update() {
        return this.expirationTime.update();
    }

    display() {
        image(this.sprite, this.x, this.y);
        if (this.barW >= 0 && this.empty == false) {
            this.barW = map(this.expirationTime.elapsedTime, 0, this.expirationTime.actionTime, 120, 0);
            push();
            if (this.barW <= 120 && this.barW > 40) {
                fill(0, 255, 0);
            } else {
                fill(255, 0, 0);
            }
            rect(this.barX, this.barY, this.barW, this.barH);
            pop();
        }
    }
}

function initOrdersArr() {
    var orders = [];
    let offsetX = 40;
    let offsetY = 260;
    let currX = 0;
    let nbr = 0;
    for (let i = 0; i < 3; i++) {
        orders.push(new Order(currX + offsetX + nbr * sizeOfSprite.get("order").get("w"), 0 + offsetY, "empty", i));
        offsetX += 20;
        nbr += 1;
    }
    nbr = 0;
    offsetX = 40;
    offsetY += 30;
    for (let i = 3; i < 6; i++) {
        orders.push(new Order(currX + offsetX + nbr * sizeOfSprite.get("order").get("w"), 0 + offsetY + sizeOfSprite.get("order").get("h"), "empty", i));
        offsetX += 20;
        nbr += 1;
    }
    return orders;
}

class OrdersHandler {
    constructor() {
        this.clock = new Clock(1000);
        this.orders = initOrdersArr();
    }

    display() {
        for (let i = 0; i < this.orders.length; i++) {
            this.orders[i].display();
        }
    }
}