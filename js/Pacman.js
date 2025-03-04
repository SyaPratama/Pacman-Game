import gameMap from "./gameMap.js";

class Pacman{
    constructor(ctx,width,height){
        this.ctx = ctx;
        this.cols = 19;
        this.rows = 21;
        this.width = width;
        this.height = height;
        this.map = [];
        this.fruit = [];
        this.arrayStartPoint = [];
        this.startPosition = 0;
        this.playerPosition = 0;
        this.score = 0;
        this.cellSize = Math.floor(Math.min(this.width / this.cols, this.height / this.rows));
    }

    generateMap()
    {
        for(let i = 0; i < gameMap.length; i++)
        {
            let x = i % this.cols * this.cellSize ;
            let y = Math.floor(i / this.cols) * this.cellSize;
            if(gameMap[i] == 2)
            {
                this.arrayStartPoint.push(i);
            }
            this.map.push({
                x:x,
                y:y,
                walls: gameMap[i] == 0 || gameMap[i] == 2 ? false : true,
                playerPosition: gameMap[i] == 2 ? true : false,
            });
        }
        this.startPosition = this.randomPositionPlayer();
        this.playerPosition = this.startPosition;
    }

    generateFruit()
    {
        return this.map.forEach((n) => {
            if(!n.walls && !n.playerPosition)
            {
                this.fruit.push({
                    x:n.x,
                    y:n.y,
                    eat: false,
                });
            }
        });
    }

    randomPositionPlayer()
    {
        return this.arrayStartPoint[Math.floor(Math.random() * this.arrayStartPoint.length)];
    }

    render()
    {
        this.ctx.clearRect(0,0,this.width,this.height)
        this.map.forEach((n,i) => {
            this.ctx.fillStyle = n.walls && !n.playerPosition ? 'blue' : this.playerPosition  == i ? 'yellow' :  'gray';
            this.ctx.fillRect(n.x,n.y,this.cellSize,this.cellSize);
        });
        this.fruit.forEach(f => {
            if(!f.eat){
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(f.x + 5,f.y + 5,this.cellSize / 3,this.cellSize / 3);
            }
        })
    }

    move(e){
        let newPos = this.playerPosition;
        let clicked = 0;
        if(e == "KeyW" && clicked == 0 && !this.map[newPos - 19].walls && Math.floor(newPos - 19) >= 0) clicked++, newPos -= 19;
        else if(e == "KeyS" && clicked == 0 && !this.map[newPos + 19].walls && newPos + 19 < gameMap.length) clicked++, newPos += 19;
        else if(e == "KeyA" && clicked == 0 && !this.map[newPos - 1].walls && Math.floor(newPos % 19) != 0) clicked++, newPos -= 1;
        else if(e == "KeyD" && clicked == 0 && !this.map[newPos + 1].walls && Math.floor((newPos + 1) % 19) != 0) clicked++, newPos += 1;
        this.playerPosition = newPos;
        this.fruit.find((f,i) => {
            if(f.x == this.map[this.playerPosition].x && f.y == this.map[this.playerPosition].y && !f.eat){
                this.fruit[i].eat = true;
                this.score++;
            }
        })
        clicked = 0;
        this.render();
        console.log(this.score);
    }

    start(){
        this.generateMap();
        this.generateFruit();
        this.render();
    }
}

export default Pacman;