export class Sprite extends Phaser.Physics.Arcade.Sprite {
    /**
     * 
     */
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(1);
        this.setOrigin(0, 0);
        scene.physics.world.enableBody(this);

        this.timeArray = []
        
        this.vision = 30
        this.hp = 100;
        this.speed = 10;
        this.age = 0;

    }

senescense(loss) {
    // Organism aging; modifies life
    this.age += 1

}

reproduce(mutationRate) {
    // Modifies life; creates new instance of organism
}

consume(food) {
    // Restores health; chance increased by speed
    // 80% base chance, each point of speed + 2%; 20% max
}

metabolise(rate, time) {
    // Daily process which lowers health
    // Increased by speed

    if (time % 2 == 0 && this.timeArray.includes(time) === false) {
        this.timeArray.push(time);
        this.hp = this.hp - rate
        console.log(this.hp + " HP Remaining")
    }
    
}

}