class Game {

    private static instance: Game;
    private score: number = 0;
    private plane: Plane;
    private airports: Airport[] = [];
    private boxes: Box[] = [];

    private constructor() {
        // Bevolk het scherm met meest efficient geplaatste vliegvelden (tile: 64x32)
        this.plane = new Plane();
        this.airports.push(new Airport("1", 2, 65));
        this.airports.push(new Airport("2", 2 + 640, 65));
        this.airports.push(new Airport("3", 2 + 1280, 65));
        this.airports.push(new Airport("4", 2 + 320, 65 + 224));
        this.airports.push(new Airport("5", 2 + 960, 65 + 224));
        this.airports.push(new Airport("6", 2, 65 + 448));
        this.airports.push(new Airport("7", 2 + 640, 65 + 448));
        this.airports.push(new Airport("8", 2 + 1280, 65 + 448));
        this.airports.push(new Airport("9", 2 + 320, 65 + 672));
        this.airports.push(new Airport("10", 2 + 960, 65 + 672));
        this.boxes.push(new Box(Math.ceil(Math.random() * 10) + "", this.airports[Math.floor(Math.random() * this.airports.length)]));
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(): void {
        this.plane.update();
        this.boxes.forEach(box => {
            if (Utils.collision(this.plane, box)) {
                this.plane.behavior = new Carrying(this.plane, box);
                box.name.div.remove();
                box.div.remove();
            }
        });
        this.airports.forEach(airport => {
            if (Utils.collision(this.plane, airport.name)) {
                if (this.plane.behavior instanceof Carrying) {
                    if (this.plane.behavior.box.name.text == airport.name.text) {
                        airport.upgrade();
                        this.plane.behavior = new Empty(this.plane);
                        this.score++;
                        this.boxes.push(new Box(Math.ceil(Math.random() * 10) + "", this.airports[Math.floor(Math.random() * this.airports.length)]));
                    }
                }
            }
        });
        requestAnimationFrame(() => this.gameLoop());
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}

window.addEventListener("load", function () {
    Game.getInstance();
});