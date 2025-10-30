export class Assets {
    public static getDefaultImage() {
        const image: HTMLImageElement = document.querySelector("img#asset_default");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    }
    public static getPlayerImage() {
        const playerImg: HTMLImageElement = document.querySelector("img#asset_player");
        if (playerImg == null) {
            throw Error("No player asset found");
        }
        return playerImg;
    }
    public static getAlienImage(): HTMLImageElement {
        const alienImg: HTMLImageElement = document.querySelector("img#asset_alien");
        if (alienImg == null) throw Error("No alien asset found");

        return alienImg;
    }
    public static getStarImg(): HTMLImageElement {
        const starImg: HTMLImageElement = document.querySelector("img#asset_star");
        if (starImg == null) throw Error("No star asset found");

        return starImg;
    }
     public static getLaserImg() : HTMLImageElement{
        const laserImg: HTMLImageElement = document.querySelector("img#asset_laser");
        if(laserImg == null) throw Error("No laser asset found");

        return laserImg;
    }
    public static getEarthImg() : HTMLImageElement{
        const earthImg: HTMLImageElement = document.querySelector("img#asset_earth");
        if(earthImg == null) throw Error("No laser asset found");

        return earthImg;
    }
}