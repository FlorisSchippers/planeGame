class Game {

    private static instance: Game;
    private score: number = 0;
    private scoreElement: HTMLElement;
    private time: number = 60;
    private timeCounter: number = 0;
    private timeElement: HTMLElement;
    private plane: Plane;
    private airports: Airport[] = [];
    private boxes: Box[] = [];

    private constructor() {
        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);
        this.timeElement = document.createElement("time");
        document.body.appendChild(this.timeElement);
        this.plane = new Plane();
        // Bevolk het scherm met meest efficient geplaatste vliegvelden (tile: 64x32)
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
        this.boxes.push(new Box(this.plane, objectiveAirport, spawnAirport));
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(): void {
        this.scoreElement.innerHTML = "Score: " + this.score;
        this.timeCounter++;
        if (this.timeCounter >= 60) {
            this.time--;
            this.timeCounter = 0;
        }
        this.timeElement.innerHTML = "Time: " + this.time;
        this.plane.update();
        this.boxes.forEach(box => {
            if (Utils.collision(this.plane, box)) {
                if (this.plane.behavior instanceof Empty) {
                    this.plane.behavior = new Carrying(this.plane, box);
                    this.plane.observers.forEach(observer => {
                        observer.notify();
                    });
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
                        this.boxes.push(new Box(this.plane, objectiveAirport, spawnAirport));
                    }
                }
            }
        });
        if (this.time <= 0) {
            this.plane.div.remove();
            this.boxes.forEach(box => {
                box.name.div.remove();
                box.div.remove();
            });
            this.airports.forEach(airport => {
                airport.name.div.remove();
                airport.div.remove();
            });
            this.timeElement.remove();
            this.scoreElement.innerHTML = "Time's up!<br>" + this.scoreElement.innerHTML;
            this.scoreElement.style.left = 'calc(100% / 2 - 100px)';
            this.scoreElement.style.top = 'calc(100% / 2 - 50px)';
        } else {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
}