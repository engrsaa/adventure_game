#! usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const info = chalk.bgCyan.black, lives = chalk.redBright;
// Math.randomInt(maxValue,minValue)
// Game Variables
const enemies = { 'Skeleton': 5, 'Zombie': 10, 'Warrior': 15, 'Assasin': 20 };
// let killedEnemies=[];
let score = 0;
// enemyMaxHealth declared to set range of enemy health 
// maxAttackDemage declared to set range of demage which enemy could give us
// Player Variables
let playerHealth = 50, attackDemage = 25, numOfHealthPotions = 3, healthPotionHealAmount = 10, healthPotionDropChance = 50 //it is a percentage
, running = true;
// welcome msg
console.log(info('\t You are in an Anonymous abandoned place. . . \n'));
// game loop
Game: while (running) {
    let enemyHealth = Math.ceil(Math.random() * 50);
    const enemy = Object.keys(enemies)[Math.floor(Math.random() * 4)];
    console.log(info('\n\t<-| Enemy :', lives(enemy), 'has appeared! |->\t'));
    console.log(`\tKill ${enemy} to get ${lives(enemies[enemy])} points.`);
    while (enemyHealth > 0) {
        console.log(info(` ->Your HP : ${lives(playerHealth)} `));
        console.log(info(` ->${enemy}'s HP : ${lives(enemyHealth)} `));
        const userAction = await inquirer.prompt({
            name: 'opt',
            type: 'list',
            choices: ['Attack', 'Drink Health Potion', 'Run'],
            message: 'What would you like to do?'
        });
        if (userAction.opt === 'Attack') {
            let demageDealt = Math.ceil(Math.random() * attackDemage), demageTaken = Math.ceil(Math.random() * attackDemage);
            enemyHealth -= demageDealt;
            playerHealth -= demageTaken;
            console.log(`\t You strike the '${enemy}' for '${lives(demageDealt)}' demage. `);
            console.log(`\t You received '${lives(demageTaken)}' in retaliation. `);
            if (playerHealth < 1) {
                console.log(lives(`\t You have taken too much demage, you are too weak to go on! `));
                break;
            }
        }
        else if (userAction.opt === 'Drink Health Potion') {
            if (numOfHealthPotions > 0) {
                if (playerHealth > 40) {
                    playerHealth = 50;
                }
                else {
                    playerHealth += healthPotionHealAmount;
                }
                numOfHealthPotions--;
                console.log(info(`\t You drink a health potion, healing yourself for ${healthPotionHealAmount}. `));
                console.log(info(`\t You now have ${playerHealth} HP. `));
                console.log(info(`\t You have ${numOfHealthPotions} Health Potion(s) left. \n`));
            }
            else {
                console.log(lives('\t You have no Health Potion left! Defeat Enemies for a chance to get one! '));
            }
        }
        else if (userAction.opt === 'Run') {
            console.log(` You run away from the ${lives(enemy)} !`);
            continue Game;
        }
    }
    // if(playerHealth<1 && enemyHealth<1){
    //     console.log(``);
    // }
    if (playerHealth < 1) {
        console.log(chalk.bgRed(` You limp out of the dungeon, weak from battle. `));
        break;
    }
    console.log(chalk.bgGreen(`\t ${enemy} was defeated you get ${chalk.blue(enemies[enemy])} points. `));
    console.log(chalk.bgGreen(`\t You have ${lives(playerHealth)} HP left `));
    // killedEnemies.push(enemy);
    score += enemies[enemy];
    if (Math.ceil(Math.random() * 100) < healthPotionDropChance) {
        numOfHealthPotions++;
        console.log(chalk.bgWhite.red(`\n\t The ${enemy} dropped a Health Potion! `));
        console.log(chalk.bgWhite.red(`\t You now have ${numOfHealthPotions} Health Potion(s) left. `));
    }
    const userAgain = await inquirer.prompt({
        name: 'ask',
        type: 'confirm',
        message: 'Would you like to continue fighting?'
    });
    if (userAgain.ask === false) {
        running = false;
    }
}
console.log(chalk.bgBlue(`\t Your Total Score = ${score}! `));
