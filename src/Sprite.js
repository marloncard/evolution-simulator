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
        this.timedAgeArray = []
        
        this.vision = 0
        this.maxHP = 150;
        this.hp = 100;
        this.speed = 0;
        this.age = 0;
        this.name = ""

    }

senescense(time) {
    // Organism aging; modifies life
    if (time % 30 === 0 && this.timedAgeArray.includes(time) === false) {
        this.timedAgeArray.push(time)
        this.age += 1
        //console.log(this.name + " is now age: " + this.age)
        this.hp -= this.age
        this.maxHP -=5
    }
    

}

reproduce(nameCounter, key ) {
    // Modifies life; creates new instance of organism
    if (this.age >= 2 && this.hp > 100) {
        //let offspring = Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        let offspring = organisms.create(this.x, this.y, key)
        this.hp = this.hp / 2;
        offspring.hp = this.hp / 2;
        offspring.name = "Org" + nameCounter;
        
        return offspring;
    } else {
        return null;
    }

    
}

consume(food) {
    // Restores health; chance increased by speed
    // 80% base chance, each point of speed + 2%; 20% max
}

metabolise(rate, time) {
    // Daily process which lowers health
    // Increased by speed

    if (time % 2 === 0 && this.timeArray.includes(time) === false) {
        this.timeArray.push(time);
        this.hp = this.hp - rate
        //console.log(this.hp + " HP Remaining for: " + this.name)
    }
    
}

}