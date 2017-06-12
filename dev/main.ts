/// <reference path="game.ts"/>
/// <reference path="tween.d.ts"/>

var title: HTMLElement;
var start: HTMLElement;

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