import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Input } from "../Input.js";
import { Laser } from "./Laser.js";

export class Player extends GameObject {

    private speed: number = 10;
    public lastShootTime: number = Date.now();
    private shootInterval_ms: number = 200;

    protected start(): void {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
        });
    }
    protected update(): void {
        const pos = this.getPosition();
        const deltaX = Input.getAxisX() * this.speed;
        let newX = pos.x + deltaX;

        // Empêche de sortir du canvas
        if (newX < 0) newX = 0;
        if (newX > this.getGame().CANVAS_WIDTH - this.getImage().width)
            newX = this.getGame().CANVAS_WIDTH - this.getImage().width;

        // Mise à jour de la position
        this.setPosition({ x: newX, y: pos.y });

        // Gestion du tir
        if (
            Input.getIsShooting() &&
            (Date.now() - this.lastShootTime) >= this.shootInterval_ms
        ) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }
    }

}