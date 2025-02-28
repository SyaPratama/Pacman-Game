import gameMap from "./gameMap.js";

class Pacman{
    constructor(ctx,width,height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.map = [];
    }

    generateMap()
    {
        for(let i = 0; i < gameMap.length; i++){
            this.map.push(i);
        }
    }

    start(){
        this.generateMap();
    }
}

export default Pacman;