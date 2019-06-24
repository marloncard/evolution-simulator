#!/usr/bin/env python3
"""
TITLE: Evolution Simulator
Author: Marlon Card
Date: June 10, 2019
Over time changes in base genetic structure should be caused by mutations
Implications are:
    : New species; unable to reproduce with base org
    : Can hunt or be hunted by other base species
    : Still able to produce (hybrid) offspring which cannot reproduce.
    : Organism DNA "tag" should be visible

Sessions:
    : Organism states update once per CYCLE.
    : Food spawn once per cycle

FOUR FACTORS OF EVOLUTION:
    : Potential for a species to increase in number
    : Heritable genetic variation
    : Competition for limited resources
    : Proliferation of organisms better able to survive and
      reproduce.

"""
# TODO PREDATORS
# TODO ENVIRONMENT - Weather, disasters

import sys
import time
from random import randint
from random import shuffle
from models.organism import Organism
from styletext import ColorText

FOOD = 2000
BIRTHS = 51
ENV = []
CHANCE = []
MUTATION_CHANCE = 0.01  # Chance for mutation of attributes
METABOLISM = 10         # Metabolism rate per cycle



def main_loop():
    global ENV
    global BIRTHS
    global FOOD
    deathlog = []
    mutationlog = []
    generate_population(25)
    print_org(ENV)
    time.sleep(3)
    cycles = 400
    while cycles > 0:
        if len(ENV) == 0:
            print("\n\n**DEATH LOG**")
            print_org(deathlog)
            sys.exit()
        else:
            shuffle(ENV)
            for i,org in enumerate(ENV):
                org.metabolise(METABOLISM)
                eats = org.consume(FOOD)
                if eats > 0:
                    FOOD -= eats
                wee_babe = org.reproduce(MUTATION_CHANCE)
                if wee_babe != False:
                    wee_babe["Organism"].org_name="org"+str(BIRTHS+1)
                    BIRTHS += 1
                    ENV.append(wee_babe["Organism"])
                    ColorText("green","The wee babe {}, was born".format(wee_babe["Organism"].org_name))
                    if wee_babe["Mutation"]:
                        ColorText("blue", "Mutation of {}".format(wee_babe["Mutation"]))
                        mutationlog.append("Organism {} had a mutation of {}".format(wee_babe["Organism"].org_name, wee_babe["Mutation"]))
                # FIXME
                death = org.senescence(5)
                if death == True:
                    ColorText("yellow", "{} has died".format(org.org_name))
                    #print(org.org_name + " has died!")
                    deathlog.append(ENV.pop(i))
                    
            print_org(ENV)
            cycles -= 1
            ColorText("red", "Remaining Food: {}".format(FOOD))
            ColorText("red", "Population: {}".format(len(ENV)))
            FOOD = 2000
            time.sleep(1)
    for mutation in mutationlog:
        print(mutation)

    # for o in deathlog:
    #     print(o.org_name + " |",
    #          "Speed: " + str(o.speed),
    #          "Metabolism: "+ str(o.metabolism),
    #          "Life: " + str(o.life),
    #          "Age: " + str(o.age)
    #          )
            

def generate_population(count):
    global ENV
    
    for c in range(count):
        name = "org"+str(c)
        speed = randint(1,10)
        metabolism = randint(1,10)
        ENV.append(Organism(speed, metabolism, name))
        #ENV[c]

    print(ENV)

def food_spawn(amount):
    global FOOD
    for r in range(amount):
        FOOD.append(5)
    # TODO Insert blank spots to simulate unsucessful foraging
    randspot = randint(0,50)
    for i in range(10):
        FOOD[randspot] = 0
    print(FOOD)

def print_org(a_list):
    print("{:<7}{:<10}{:<15}{:<10}{:>10}".format(
        "Name", "Speed", "Metabolism", "Life", "Age"))
    for o in a_list:
        print("{:<7}".format(o.org_name),
             "{:<10}".format(o.speed),
             "{:<15}".format(o.metabolism),
             "{:<10}".format(o.life),
             "{:>10}".format(o.age)
             )

if __name__ == "__main__":
    main_loop()
    #food_spawn()

 

    
