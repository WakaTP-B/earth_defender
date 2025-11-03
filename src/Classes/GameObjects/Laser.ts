import { Assets } from "../Assets.js";
import { Alien } from "./Alien.js";
import { GameObject } from "./GameObject.js";
import { Game } from "../Game.js";


export class Laser extends GameObject {

    protected start(): void {

        this.setImage(Assets.getLaserImg());
        this.setPosition({
            x: this.getGame().getPlayer().getPosition().x,
            y: this.getGame().getPlayer().getPosition().y - this.getImage().height
        })
    }

    protected update(): void {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y - 10,
        });

        if (this.getPosition().y < 0) {
            this.getGame().destroy(this);
        }
    }

    protected collide(other: GameObject): void {
        if (this.getGame().getOver()) {
            this.getGame().fixedScore();
        }
        else if (other instanceof Alien) {
            this.getGame().addScore(10); // +10 points
            this.getGame().destroy(other); // détruit l'alien
            this.getGame().destroy(this);  // détruit le laser
        }
    }
}