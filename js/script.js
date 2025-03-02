import gameMap from "./gameMap.js";
import Pacman from "./Pacman.js";

const canvas = document.getElementById('ctx');
const width =  gameMap.length;
const height = gameMap.length;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

const Game = new Pacman(ctx,width,height);
Game.start();

window.addEventListener('keydown', (e) => Game.move(e.code));