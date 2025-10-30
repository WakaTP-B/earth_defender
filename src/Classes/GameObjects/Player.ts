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
        // console.log(Input.getAxisX());
        this.setPosition({
            x: this.getPosition().x += Input.getAxisX() * this.speed,
            y: this.getPosition().y
        });
        if (
            Input.getIsShooting() &&
            (
                (Date.now() - this.lastShootTime) >= this.shootInterval_ms
            )
        ) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }

    }
}