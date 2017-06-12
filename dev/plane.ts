/// <reference path="gameobject.ts"/>

class Plane extends GameObject implements Observable {

    public behavior: Behavior;
    public speed: number = 5;
    public angle: number = 0;
    public keyState: any = {};
    public observers: Array<Observer> = [];

    constructor() {
        super(document.body, "plane", 39, 66, window.innerWidth / 2, window.innerHeight / 2);
        this.behavior = new Empty(this);
        window.addEventListener('keydown', this.KeyDown.bind(this));
        window.addEventListener('keyup', this.KeyUp.bind(this));
    }

    public subscribe(o: Observer): void {
        console.log(o);
        this.observers.push(o);
    }

    public unsubscribe(o: Observer): void {
        this.observers.splice(0, 1);
    }

    private KeyDown(e: KeyboardEvent): void {
        this.keyState[e.keyCode || e.which] = true;
    }

    private KeyUp(e: KeyboardEvent): void {
        this.keyState[e.keyCode || e.which] = false;
    }

    // Ik gebruik key states en check deze in de gameloop
    // Dit is een fix voor het inhouden van toetsen
    public update() {
        this.behavior.move();
        this.drawRotation(this.angle);
    }
}