#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk"

type userInputType = {
    userId: string;
    userPin: number;
    accountType: string;
    transactionStyle: string;
    amount: number;
};

async function Atm() {
    console.log(chalk.bold.greenBright("Welcome to Our A.T.M"));


    const userInput: userInputType = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Enter your User-ID",
        },
        {
            type: "number",
            name: "userPin",
            message: "Enter your User-Pin",
            validate: (input: number) => {
                if (isNaN(input) || input < 1000 || input > 9999) {
                    return "Please enter a valid 4-digit PIN";
                }
                return true;
            },
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Saving", "Current"],
        },
        {
            type: "list",
            name: "transactionStyle",
            choices: ["Cash", "Withdraw", "DepositCash"],
            message: "select your Transaction style",
            when(userInput) {
                return userInput.accountType;
            },
        },
        {
            type: "list",
            name: "amount",
            choices: [500, 1000, 1500, 2000, 5000, 10000],
            message: "select your Amount",
            when(userInput) {
                return userInput.transactionStyle == "Cash";
            },
        },
        {
            type: "number",
            name: "amount",
            message: "Enter your Amount",
            when(userInput) {
                return userInput.transactionStyle == "Withdraw";
            },
        },
        {
            type: "number",
            name: "amount",
            message: "Enter your Amount",
            when(userInput) {
                return userInput.transactionStyle == "DepositCash";
            },
        },
    ]);


    if (userInput.userId && userInput.userPin) {
        const balance = Math.floor(Math.random() * 100000);
        console.log(`Your current balance is: ${balance}`);
        const InputedAmount = userInput.amount;
        if (userInput.transactionStyle === "Withdraw") {
            if (balance >= InputedAmount) {
                const currentBalance = balance - InputedAmount;
                console.log(`Your remaining balance is ${currentBalance}`);
            } else {
                console.log(`Insufficient Balance`);
            }
        } else if (userInput.transactionStyle === "Cash") {
            const currentBalance = balance - InputedAmount;
            if (currentBalance >= 0) {
                console.log(`Your new balance is ${currentBalance}`);
            } else {
                console.log(`Insufficient Balance`);
            }
        } else if (userInput.transactionStyle === "DepositCash") {
            const currentBalance = balance + InputedAmount;
            console.log(`Your new balance is ${currentBalance}`);
        } else {
            console.log(`Transaction not supported`);
        }
    }

}

Atm();

