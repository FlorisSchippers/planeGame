class GameObject {

    public elementname: string;
    public parent: HTMLElement;
    public width: number;
    public height: number;
    public x: number;
    public y: number;
    public div: HTMLElement;

    constructor(parent: HTMLElement, name: string, width: number, height: number, x: number, y: number) {
        // Append all gameobjects to the body
        this.elementname = name;
        this.div = document.createElement(name);
        this.parent = parent;
        this.parent.appendChild(this.div);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.draw();
    }

    protected draw(): void {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

    // Function overloading bestaat blijkbaar niet in ts
    protected drawRotation(angle: number): void {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)rotate(" + angle + "deg)";
    }
}