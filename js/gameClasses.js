
const Slime = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize: 

    function Slime (scene, x, y, motion, direction, distance)
    {
        this.startX = x;
        this.startY = y;
        this.distance = distance;

        this.motion = motion;
        this.anim = anims[motion];
        this.direction = directions[direction];
    }
})