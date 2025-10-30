import { Alien } from "./GameObjects/Alien.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Star } from "./GameObjects/Star.js";
import { Earth } from "./GameObjects/Earth.js";
var Game = /** @class */ (function () {
    function Game() {
        // Public attributs
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.nbAliens = 10;
        this.gameObjects = [];
        // Init Game canvas
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.start = function () {
        // Clear context
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        // Earth
        this.earth = new Earth(this);
        this.instanciate(this.earth);
        this.player = new Player(this);
        // J'ajoute le player au tableau de GameObject
        this.instanciate(this.player);
        // Aliens
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }
        // Stars
        for (var i = 0; i < 100; i++) {
            this.instanciate(new Star(this));
        }
        // Listen to input
        Input.listen();
        // Start game loop
        this.loop();
    };
    Game.prototype.instanciate = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Game.prototype.over = function () {
        alert("GameOver!");
        window.location.reload();
    };
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.destroy = function (gameObject) {
        this.gameObjects = this.gameObjects.filter(function (go) { return go != gameObject; });
    };
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            // console.log("Frame!");
            // Clear context
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.gameObjects.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
                // if (go instanceof Alien && this.player.overlap(go)) {
                //     console.log("Alien touche le joueur");
                // }
                _this.gameObjects.forEach(function (other) {
                    // +
                    // Si le gameObject chevauche un gameObject qui n'est pas lui-même
                    if (other != go && go.overlap(other)) {
                        console.log("Deux GameObject différents se touchent");
                        go.callCollide(other); // J'appelle la méthode collide de mon GameObject
                    }
                });
            });
        }, 10);
    };
    return Game;
}());
export { Game };
