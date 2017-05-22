/// <reference path="gameobject.ts" />

class Name extends GameObject {

    public text: string;

    constructor(parent: HTMLElement, name: string, x: number, y: number) {
        super(parent, "name", 20, 50, x, y);
        this.text = name;
        this.div.innerHTML = this.text;
    }
}