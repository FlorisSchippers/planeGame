/// <reference path="gameobject.ts"/>

class Box extends GameObject {

    public name: any;
    public randomAirport: any;

    constructor(name: string, randomAirport: Airport) {
        super(document.body, "box", 49, 31, randomAirport.x + 237, randomAirport.y + 170);
        this.randomAirport = randomAirport;
        this.name = new Name(document.body, name, this.randomAirport.x + 250, this.randomAirport.y + 165);
    }
}