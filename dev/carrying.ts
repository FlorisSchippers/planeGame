class Carrying implements Behavior {

    public plane: Plane;
    public box: Box;

    constructor(plane: Plane, box: Box) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/fullplane.png')";
        this.box = box;
    }

    public move() {
        if (this.plane.keyState[Enums.Keys.W]) {
            this.plane.speed = 9;
        } else {
            this.plane.speed = 4;
        }
        if (this.plane.keyState[Enums.Keys.A]) {
            this.plane.angle -= 4;
        }
        if (this.plane.keyState[Enums.Keys.D]) {
            this.plane.angle += 4;
        }
        this.plane.x += this.plane.speed * Math.cos(this.plane.angle * Math.PI / 180);
        this.plane.y += this.plane.speed * Math.sin(this.plane.angle * Math.PI / 180);
    }
}