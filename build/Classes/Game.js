import { GameObject } from "./GameObject/GameObject.js";
var Game = /** @class */ (function () {
    function Game() {
        // Public attributs
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        // Init Game canvas
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    // Public methods
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        var gameObject = new GameObject();
        this.draw(gameObject);
        this.loop();
    };
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        setInterval(function () {
            console.log("Frame!");
        }, 10);
    };
    return Game;
}());
export { Game };
