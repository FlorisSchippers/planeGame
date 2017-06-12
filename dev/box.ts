/// <reference path="gameobject.ts"/>

class Box extends GameObject implements Observer {

    public name: any;
    public plane: Plane;
    public randomAirport: any;

    constructor(plane: Plane, name: string, randomAirport: Airport) {
        super(document.body, "box", 49, 31, randomAirport.x + 237, randomAirport.y + 170);
        this.randomAirport = randomAirport;
        this.name = new Name(document.body, name, this.randomAirport.x + 250, this.randomAirport.y + 165);
        let game = Game.getInstance;
        this.plane = plane;
        console.log(this);
        plane.subscribe(this);
    }

    public notify(): void {
        this.name.div.remove();
        this.div.remove();
    }
}