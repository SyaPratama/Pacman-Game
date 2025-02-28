import Pacman from "./Pacman";

const canvas = document.getElementById('ctx');
const width =  ( window.innerWidth / 1.5);
const height = ( window.innerHeight / 1.5 );

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext('2d');

const Game = new Pacman(ctx,width,height);
Game.start();