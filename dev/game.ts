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
        let objectiveAirport = Math.floor(Math.random() * 10) + 1 + "";
                        let spawnAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
                        while (objectiveAirport == spawnAirport.name.text) {
                            spawnAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
                        }
                        this.boxes.push(new Box(objectiveAirport, spawnAirport));
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(): void {
        this.plane.update();
        this.boxes.forEach(box => {
            if (Utils.collision(this.plane, box)) {
                if (this.plane.behavior instanceof Empty) {
                    this.plane.behavior = new Carrying(this.plane, box);
                    box.name.div.remove();
                    box.div.remove();
                    this.boxes.splice(0, 1);
                }
            }
        });
        this.airports.forEach(airport => {
            if (Utils.collision(this.plane, airport.name)) {
                if (this.plane.behavior instanceof Carrying) {
                    if (this.plane.behavior.box.name.text == airport.name.text) {
                        this.plane.behavior = new Empty(this.plane);
                        airport.upgrade();
                        this.score++;
                        let objectiveAirport = Math.floor(Math.random() * 10) + 1 + "";
                        let spawnAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
                        while (objectiveAirport == spawnAirport.name.text) {
                            spawnAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
                        }
                        this.boxes.push(new Box(objectiveAirport, spawnAirport));
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