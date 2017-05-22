class Carrying implements Behavior {

    public plane: Plane;
    public box: Box;

    constructor(plane: Plane, box: Box) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/fullplane.png')";
        this.box = box;
        console.log(this.box.name.text);
    }

    public move() {
        if (this.plane.keyState[87]) {
            this.plane.speed = 5;
        } else {
            this.plane.speed = 2.5;
        }
        if (this.plane.keyState[68]) {
            this.plane.angle += 2.5;
        }
        if (this.plane.keyState[65]) {
            this.plane.angle -= 2.5;
        }
        this.plane.x += this.plane.speed * Math.cos(this.plane.angle * Math.PI / 180);
        this.plane.y += this.plane.speed * Math.sin(this.plane.angle * Math.PI / 180);
    }
}