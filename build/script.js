var gameName = "EarthDefender!";
console.log(gameName);
import { Game } from "./Classes/Game.js";
window.onload = function () {
    var game = new Game();
    game.start();
};
