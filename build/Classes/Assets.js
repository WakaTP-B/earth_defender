var Assets = /** @class */ (function () {
    function Assets() {
    }
    Assets.getDefaultImage = function () {
        var image = document.querySelector("img#asset_default");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    Assets.getPlayerImage = function () {
        var playerImg = document.querySelector("img#asset_player");
        if (playerImg == null) {
            throw Error("No player asset found");
        }
        return playerImg;
    };
    Assets.getAlienImage = function () {
        var alienImg = document.querySelector("img#asset_alien");
        if (alienImg == null)
            throw Error("No alien asset found");
        return alienImg;
    };
    Assets.getStarImg = function () {
        var starImg = document.querySelector("img#asset_star");
        if (starImg == null)
            throw Error("No star asset found");
        return starImg;
    };
    Assets.getLaserImg = function () {
        var laserImg = document.querySelector("img#asset_laser");
        if (laserImg == null)
            throw Error("No laser asset found");
        return laserImg;
    };
    Assets.getEarthImg = function () {
        var earthImg = document.querySelector("img#asset_earth");
        if (earthImg == null)
            throw Error("No laser asset found");
        return earthImg;
    };
    return Assets;
}());
export { Assets };
