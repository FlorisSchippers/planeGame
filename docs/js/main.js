var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(parent, name, width, height, x, y) {
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
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    GameObject.prototype.drawRotation = function (angle) {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)rotate(" + angle + "deg)";
    };
    return GameObject;
}());
var Airport = (function (_super) {
    __extends(Airport, _super);
    function Airport(name, x, y) {
        _super.call(this, document.body, "airport", 0, 0, x, y);
        this.stage = 0;
        this.name = new Name(document.body, name, x + 275, y + 125);
    }
    Airport.prototype.upgrade = function () {
        if (this.stage == 5) {
        }
        else {
            this.stage++;
        }
        switch (this.stage) {
            case 0:
                this.div.style.backgroundImage = "url('images/airport0.png')";
                this.div.style.width = "379px";
                this.div.style.height = "224px";
                break;
            case 1:
                this.div.style.backgroundImage = "url('images/airport1.png')";
                this.div.style.width = "448px";
                this.div.style.height = "224px";
                break;
            case 2:
                this.div.style.backgroundImage = "url('images/airport2.png')";
                this.div.style.width = "480px";
                this.div.style.height = "257px";
                break;
            case 3:
                this.div.style.backgroundImage = "url('images/airport3.png')";
                this.div.style.width = "479px";
                this.div.style.height = "256px";
                break;
            case 4:
                this.div.style.backgroundImage = "url('images/airport4.png')";
                this.div.style.width = "511px";
                this.div.style.height = "256px";
                break;
            case 5:
                this.div.style.backgroundImage = "url('images/airport5.png')";
                this.div.style.width = "639px";
                this.div.style.height = "304px";
                break;
        }
    };
    return Airport;
}(GameObject));
var Box = (function (_super) {
    __extends(Box, _super);
    function Box(name, randomAirport) {
        _super.call(this, document.body, "box", 49, 31, randomAirport.x + 237, randomAirport.y + 170);
        this.randomAirport = randomAirport;
        this.name = new Name(document.body, name, this.randomAirport.x + 250, this.randomAirport.y + 165);
    }
    return Box;
}(GameObject));
var Carrying = (function () {
    function Carrying(plane, box) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/fullplane.png')";
        this.box = box;
        console.log(this.box.name.text);
    }
    Carrying.prototype.move = function () {
        if (this.plane.keyState[87]) {
            this.plane.speed = 5;
        }
        else {
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
    };
    return Carrying;
}());
var Empty = (function () {
    function Empty(plane) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/plane.png')";
    }
    Empty.prototype.move = function () {
        if (this.plane.keyState[87]) {
            this.plane.speed = 10;
        }
        else {
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
    };
    return Empty;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.airports = [];
        this.boxes = [];
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
        this.boxes.push(new Box(Math.ceil(Math.random() * 10) + "", this.airports[Math.floor(Math.random() * this.airports.length)]));
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.plane.update();
        this.boxes.forEach(function (box) {
            if (Utils.collision(_this.plane, box)) {
                _this.plane.behavior = new Carrying(_this.plane, box);
                box.name.div.remove();
                box.div.remove();
            }
        });
        this.airports.forEach(function (airport) {
            if (Utils.collision(_this.plane, airport.name)) {
                if (_this.plane.behavior instanceof Carrying) {
                    if (_this.plane.behavior.box.name.text == airport.name.text) {
                        airport.upgrade();
                        _this.plane.behavior = new Empty(_this.plane);
                        _this.score++;
                        _this.boxes.push(new Box(Math.ceil(Math.random() * 10) + "", _this.airports[Math.floor(Math.random() * _this.airports.length)]));
                    }
                }
            }
        });
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Name = (function (_super) {
    __extends(Name, _super);
    function Name(parent, name, x, y) {
        _super.call(this, parent, "name", 20, 50, x, y);
        this.text = name;
        this.div.innerHTML = this.text;
    }
    return Name;
}(GameObject));
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        _super.call(this, document.body, "plane", 39, 66, window.innerWidth / 2, window.innerHeight / 2);
        this.speed = 5;
        this.angle = 0;
        this.keyState = {};
        this.behavior = new Empty(this);
        window.addEventListener('keydown', this.KeyDown.bind(this));
        window.addEventListener('keyup', this.KeyUp.bind(this));
    }
    Plane.prototype.KeyDown = function (e) {
        this.keyState[e.keyCode || e.which] = true;
    };
    Plane.prototype.KeyUp = function (e) {
        this.keyState[e.keyCode || e.which] = false;
    };
    Plane.prototype.update = function () {
        this.behavior.move();
        this.drawRotation(this.angle);
    };
    return Plane;
}(GameObject));
var Utils = (function () {
    function Utils() {
    }
    Utils.collision = function (instance1, instance2) {
        if (instance1.x < instance2.x + instance2.width &&
            instance1.x + instance1.width > instance2.x &&
            instance1.y < instance2.y + instance2.height &&
            instance1.height + instance1.y > instance2.y) {
            return true;
        }
        else {
            return false;
        }
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map