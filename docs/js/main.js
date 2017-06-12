var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        var _this = _super.call(this, document.body, "airport", 0, 0, x, y) || this;
        _this.stage = 0;
        _this.name = new Name(document.body, name, x + 275, y + 125);
        return _this;
    }
    Airport.prototype.upgrade = function () {
        if (this.stage != 5) {
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
    function Box(plane, name, randomAirport) {
        var _this = _super.call(this, document.body, "box", 49, 31, randomAirport.x + 237, randomAirport.y + 170) || this;
        _this.randomAirport = randomAirport;
        _this.name = new Name(document.body, name, _this.randomAirport.x + 250, _this.randomAirport.y + 165);
        var game = Game.getInstance;
        _this.plane = plane;
        console.log(_this);
        plane.subscribe(_this);
        return _this;
    }
    Box.prototype.notify = function () {
        this.name.div.remove();
        this.div.remove();
        this.plane.unsubscribe();
    };
    return Box;
}(GameObject));
var Carrying = (function () {
    function Carrying(plane, box) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/fullplane.png')";
        this.box = box;
    }
    Carrying.prototype.move = function () {
        if (this.plane.keyState[Enums.Keys.W]) {
            this.plane.speed = 9;
        }
        else {
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
    };
    return Carrying;
}());
var Empty = (function () {
    function Empty(plane) {
        this.plane = plane;
        this.plane.div.style.backgroundImage = "url('images/plane.png')";
    }
    Empty.prototype.move = function () {
        if (this.plane.keyState[Enums.Keys.W]) {
            this.plane.speed = 10;
        }
        else {
            this.plane.speed = 5;
        }
        if (this.plane.keyState[Enums.Keys.A]) {
            this.plane.angle -= 5;
        }
        if (this.plane.keyState[Enums.Keys.D]) {
            this.plane.angle += 5;
        }
        this.plane.x += this.plane.speed * Math.cos(this.plane.angle * Math.PI / 180);
        this.plane.y += this.plane.speed * Math.sin(this.plane.angle * Math.PI / 180);
    };
    return Empty;
}());
var Enums;
(function (Enums) {
    var Keys;
    (function (Keys) {
        Keys[Keys["W"] = 87] = "W";
        Keys[Keys["A"] = 65] = "A";
        Keys[Keys["D"] = 68] = "D";
    })(Keys = Enums.Keys || (Enums.Keys = {}));
})(Enums || (Enums = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.time = 60;
        this.timeCounter = 0;
        this.airports = [];
        this.boxes = [];
        this.scoreElement = document.createElement("score");
        document.body.appendChild(this.scoreElement);
        this.timeElement = document.createElement("time");
        document.body.appendChild(this.timeElement);
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
        var objectiveAirport = Math.floor(Math.random() * 10) + 1 + "";
        var spawnAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
        while (objectiveAirport == spawnAirport.name.text) {
            spawnAirport = this.airports[Math.floor(Math.random() * this.airports.length)];
        }
        this.boxes.push(new Box(this.plane, objectiveAirport, spawnAirport));
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.scoreElement.innerHTML = "Score: " + this.score;
        this.timeCounter++;
        if (this.timeCounter >= 60) {
            this.time--;
            this.timeCounter = 0;
        }
        this.timeElement.innerHTML = "Time: " + this.time;
        this.plane.update();
        this.boxes.forEach(function (box) {
            if (Utils.collision(_this.plane, box)) {
                if (_this.plane.behavior instanceof Empty) {
                    _this.plane.behavior = new Carrying(_this.plane, box);
                    _this.plane.observers.forEach(function (observer) {
                        observer.notify();
                    });
                    _this.boxes.splice(0, 1);
                }
            }
        });
        this.airports.forEach(function (airport) {
            if (Utils.collision(_this.plane, airport.name)) {
                if (_this.plane.behavior instanceof Carrying) {
                    if (_this.plane.behavior.box.name.text == airport.name.text) {
                        _this.plane.behavior = new Empty(_this.plane);
                        airport.upgrade();
                        _this.score++;
                        var objectiveAirport = Math.floor(Math.random() * 10) + 1 + "";
                        var spawnAirport = _this.airports[Math.floor(Math.random() * _this.airports.length)];
                        while (objectiveAirport == spawnAirport.name.text) {
                            spawnAirport = _this.airports[Math.floor(Math.random() * _this.airports.length)];
                        }
                        _this.boxes.push(new Box(_this.plane, objectiveAirport, spawnAirport));
                    }
                }
            }
        });
        if (this.time <= 0) {
            this.plane.div.remove();
            this.boxes.forEach(function (box) {
                box.name.div.remove();
                box.div.remove();
            });
            this.airports.forEach(function (airport) {
                airport.name.div.remove();
                airport.div.remove();
            });
            this.timeElement.remove();
            this.scoreElement.innerHTML = "Time's up!<br>" + this.scoreElement.innerHTML;
            this.scoreElement.style.left = 'calc(100% / 2 - 100px)';
            this.scoreElement.style.top = 'calc(100% / 2 - 50px)';
        }
        else {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
var title;
var start;
window.addEventListener("load", function () {
    title = document.createElement("title");
    document.body.appendChild(title);
    start = document.createElement("start");
    start.addEventListener("click", function () {
        title.remove();
        start.remove();
        Game.getInstance();
    });
    document.body.appendChild(start);
    TweenLite.to(title, 1, { x: 0, y: 250, ease: Bounce.easeOut });
    TweenLite.to(start, 1, { x: 0, y: 500, ease: Bounce.easeOut });
});
var Name = (function (_super) {
    __extends(Name, _super);
    function Name(parent, name, x, y) {
        var _this = _super.call(this, parent, "name", 20, 50, x, y) || this;
        _this.text = name;
        _this.div.innerHTML = _this.text;
        return _this;
    }
    return Name;
}(GameObject));
var Plane = (function (_super) {
    __extends(Plane, _super);
    function Plane() {
        var _this = _super.call(this, document.body, "plane", 39, 66, window.innerWidth / 2, window.innerHeight / 2) || this;
        _this.speed = 5;
        _this.angle = 0;
        _this.keyState = {};
        _this.observers = [];
        _this.behavior = new Empty(_this);
        window.addEventListener('keydown', _this.KeyDown.bind(_this));
        window.addEventListener('keyup', _this.KeyUp.bind(_this));
        return _this;
    }
    Plane.prototype.subscribe = function (o) {
        console.log(o);
        this.observers.push(o);
    };
    Plane.prototype.unsubscribe = function () {
    };
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