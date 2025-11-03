import { Alien } from "./GameObjects/Alien.js";
import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Star } from "./GameObjects/Star.js";
import { Earth } from "./GameObjects/Earth.js";

export class Game {
    // Public attributs
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;

    // Private attributs
    private context: CanvasRenderingContext2D;
    private nbAliens: number = 10;
    private player: Player;
    private gameObjects: GameObject[] = [];
    private earth: Earth
    private score: number = 0;
    private isGameOver: boolean = false;


    constructor() {
        // Init Game canvas
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
        window.addEventListener("keydown", (event) => {
            if (this.isGameOver && event.key.toLowerCase() === "r") {
                window.location.reload(); // recharge la page
            }
        });

    }

    public start(): void {
        // Clear context
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        // Earth
        this.earth = new Earth(this);
        this.instanciate(this.earth);

        this.player = new Player(this);
        // J'ajoute le player au tableau de GameObject
        this.instanciate(this.player)

        // Aliens
        for (let i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }

        // Stars
        for (let i = 0; i < 100; i++) {
            this.instanciate(new Star(this));
        }

        // Listen to input
        Input.listen();
        // Start game loop
        this.loop();
    }
    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }
    public over(): void {
        this.isGameOver = true;
    }
    public getOver(): boolean {
        return this.isGameOver;
    }
    public getPlayer(): Player {
        return this.player;
    }
    public destroy(gameObject: GameObject): void {
        this.gameObjects = this.gameObjects.filter(go => go != gameObject);
    }
    public addScore(points: number): void {
        this.score += points;
        console.log("Score:", this.score);
    }

    public getScore(): number {
        return this.score;
    }
    public fixedScore(): void {
        this.score += 0;
    }

    private draw(gameObject: GameObject) {
        this.context.drawImage(
            gameObject.getImage(),
            gameObject.getPosition().x,
            gameObject.getPosition().y,
            gameObject.getImage().width,
            gameObject.getImage().height
        );
    }
    // Affichage du score
    private drawScore() {
        this.context.fillStyle = "white";
        this.context.font = "24px Arial";
        this.context.fillText("Score: " + this.score, 10, 30);
    }
    private printGameOver(): void {
        this.context.fillStyle = "white";
        this.context.font = "bold 48px Arial";
        this.context.textAlign = "center";
        this.context.fillText("GAME OVER", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 - 20);

        this.context.font = "24px Arial";
        this.context.fillText("Score : " + this.score, this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + 20);

        this.context.font = "20px Arial";
        this.context.fillText("Appuie sur R pour recommencer", this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2 + 60);
    }


    private loop() {
        setInterval(() => {
            // console.log("Frame!");
            // Clear context
            this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

            this.gameObjects.forEach(go => {
                go.callUpdate();
                this.draw(go);

                // if (go instanceof Alien && this.player.overlap(go)) {
                //     console.log("Alien touche le joueur");
                // }

                this.gameObjects.forEach(other => {
                    // +
                    // Si le gameObject chevauche un gameObject qui n'est pas lui-même
                    if (other != go && go.overlap(other)) {
                        // console.log("Deux GameObject différents se touchent");
                        go.callCollide(other); // J'appelle la méthode collide de mon GameObject
                    }
                })

            });
            this.drawScore();

            if (this.isGameOver) {
                this.printGameOver();
            }
        }, 10);
    }
}