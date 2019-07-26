/* 
TITLE: Evolution Simulator
Author: Marlon Card
Date: July 03, 2019
*/


export default class Life {

    constructor(speed, metabolism, permiscuity, orgName) {
        this.speed = speed
        this.metabolism = metabolism
        this.orgName = OrgName
        this.permiscuity = permiscuity
        this.health = 100
        this.age = 0
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

    metabolise(rate) {
        // Daily process which lowers health
        // Increased by speed
    }
}

