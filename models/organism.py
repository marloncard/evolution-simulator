#!/usr/bin/env python3
"""
TITLE: Evolution Simulator
Author: Marlon Card
Date: June 10, 2019

Sessions:
    : Organism states update once per CYCLE.
"""
import copy
import os
import time
from random import random

# TODO Introduce environment variable humidity
    #  Corresponding attribute is slower metabolism
    #  Results in lower food consumption and water requirement

    #  Tie speed to metabolism directly


class Organism:

    def __init__(self, speed, metabolism, org_name):
        self.speed = speed                    # Increase food chance; tied to metabolism?
        #self.size = size                     # Lower speed; less chance of predation; food cap modifier?
        #self.color = color                   # Adds camo depending on environment
        self.metabolism = metabolism          # Increased by speed
        #self.mutation = 1                     # rate of mutation 10% -randint(1,10)
        self.life = 100                       # Replenished by consume; diminished by reproduction, CYCLE
        self.age = 0
        self.org_name = org_name

        # TODO Disease resist or predator avoid(affected by speed)
    def senescence(self, loss):
        '''
        Organism aging; Modifies life
        '''
        self.age += 1
        if self.age > 2:
            self.life -= 10
        elif self.age > 3:
            self.life -= 20
        elif self.age > 4:
            self.life -= 40
        elif self.age > 5:
            self.life -= 80
        elif self.age > 6:
            self.life -= 160
        if self.life <= 0:
            return True

    def reproduce(self, mutation_rate):
        '''
        Modifies life
        Creates new instance of Organism
        '''
        # TODO Reproduction chance should drop at age 15
        basket = {"Organism":None, "Mutation":None}
        if self.age >= 2 and self.life > 50:
            offspring = copy.deepcopy(self)
            # Lose 20 life reproduction penalty
            self.life -= 30 # TODO Find out % of energy required for creation of offspring
            # Chance of mutation
            if random() < mutation_rate:
                if random() > .50:
                    offspring.speed +=1
                    basket["Mutation"] = "+1"
                else:
                    offspring.speed +-1
                    basket["Mutation"] = "-1"
            offspring.age = 0
            offspring.life = 30
            basket["Organism"] = offspring
            return basket
        return False

    def consume(self, food):
        '''
        Restores life
        Chance to consume increased by speed
        '''
        # 80% base eat chance, plus speed (10% additional); max 90%
        eat_chance = (80 + self.speed)*.01
        if random() < eat_chance and food > 0:
            self.life += 30
            if self.life > 100:
                self.life = 100
            return 30
        return 0

    def metabolise(self, rate):
        '''
        Daily process which lowers health
        Increased by speed
        '''
        self.life -= rate
        # self.life -= speed

    def __str__(self):
        return self.org_name




if __name__ == '__main__':
    Org = Organism()
    #Org.start()
    print(BIRTHS)