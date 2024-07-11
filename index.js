#!/usr/bin/env node
import inquirer from "inquirer";
// Game variables
const enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
const maxEnemyHealth = 50;
const enemyAttackDamage = 10;
// Player variables
let health = 100;
const attackDamage = 20;
let numHealthPotions = 3;
const healthPotionHealAmount = 30;
const healthPotionDropChance = 50; // Percentage
let running = true;
console.log("Welcome to the Dungeon!");
GAME: while (running) {
    console.log("\n---------------------------------------------------------------------\n");
    let enemyHealth = Math.floor(Math.random() * 75);
    const enemy = enemies[Math.floor(Math.random() * 4)];
    console.log(`# ${enemy} has appeared! #`);
    while (enemyHealth > 0) {
        console.log(`Your HP: ${health}\n${enemy}'s HP: ${enemyHealth}\n`);
        const user = (await inquirer.prompt([
            {
                type: "list",
                name: "user",
                message: "What would you like to do?",
                choices: ["Attack", "Drink health potion", "Run!"],
            },
        ])).user;
        if (user == "Attack") {
            const damageDealt = Math.floor(Math.random() * attackDamage);
            const damageTaken = Math.floor(Math.random() * enemyAttackDamage);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(`You strike the ${enemy} for ${damageDealt} damage.\nYou recieve ${damageTaken} in retalitaion.`);
            if (health < 1) {
                console.log("You have taken too much damage, you are too weak to go on!");
                break;
            }
        }
        else if (user == "Drink health potion") {
            if (numHealthPotions > 0) {
                health += healthPotionHealAmount;
                numHealthPotions--;
                console.log(`Your drink a health potion, healing yourself for ${healthPotionHealAmount}.\nYou now have ${health} HP.\nYou have ${numHealthPotions} health potions left.`);
            }
            else {
                console.log("You have no health potions left! Defeat enemies for a chance to get one!");
            }
        }
        else if (user == "Run!") {
            console.log(`You run away from the ${enemy}!`);
            continue GAME;
        }
        else {
            console.log("Invalid command!");
        }
    }
    if (health < 1) {
        console.log("You limp out of the Dungeon, weak from the battle.\n\n---------------------------------------------------------------------\nThanks for playing\n---------------------------------------------------------------------\n");
        break;
    }
    console.log(`${enemy} was defeated!\nYou have ${health} HP left`);
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`The ${enemy} dropped a health potion!\nYou now have ${numHealthPotions} health potion(s).`);
    }
    console.log("\n---------------------------------------------------------------------\n");
    const next = (await inquirer.prompt([
        {
            type: "list",
            name: "next",
            message: "What would you like to do now?",
            choices: ["Continue fighting", "Exit Dungeon"],
        },
    ])).next;
    if (next === "Exit Dungeon") {
        console.log("You exit the Dungeon, successful from your adventure!");
        console.log("\n---------------------------------------------------------------------\nThanks for playing\n---------------------------------------------------------------------\n");
        break;
    }
    else if (next === "Continue fighting") {
        console.log("You continue on your adventure!");
    }
    else {
        console.log("Invalid command!");
    }
}
