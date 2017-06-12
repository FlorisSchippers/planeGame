/// <reference path="game.ts"/>

var title: HTMLElement;
var button: HTMLElement;

window.addEventListener("load", function () {
    title = document.createElement("title");
    title.innerHTML = "planeGame!";
    document.body.appendChild(title);
    button = document.createElement("button");
    button.innerHTML = "Start!"
    button.addEventListener("click", function () {
        title.remove();
        button.remove();
        Game.getInstance();
    });
    document.body.appendChild(button);
});