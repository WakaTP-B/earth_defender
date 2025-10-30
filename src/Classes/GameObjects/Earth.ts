import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";

export class Earth extends GameObject {


    protected start(): void {
        this.setImage(Assets.getEarthImg());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2 - this.getImage().width / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height
        });
    }
    protected update(): void {

        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y
        });


    }
}