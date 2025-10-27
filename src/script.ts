const gameName: string = "EarthDefender!";
console.log(gameName);

import {Game} from "./Classes/Game.js";

window.onload = ()=>{
    const game = new Game();
    game.start();
}