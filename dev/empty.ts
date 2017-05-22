class Empty implements Behavior {

    public plane: Plane;
    public box: Box;

    constructor(plane: Plane) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/plane.png')";
    }

    public move() {
        if (this.plane.keyState[87]) {
            this.plane.speed = 10;
        } else {
            this.plane.speed = 5;
        }
        if (this.plane.keyState[68]) {
            this.plane.angle += 5;
        }
        if (this.plane.keyState[65]) {
            this.plane.angle -= 5;
        }
        this.plane.x += this.plane.speed * Math.cos(this.plane.angle * Math.PI / 180);
        this.plane.y += this.plane.speed * Math.sin(this.plane.angle * Math.PI / 180);
    }
}