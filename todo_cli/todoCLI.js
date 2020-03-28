const fs = require('fs');
const readline = require('readline');
let cl;

class TodoCLI {
    constructor() {
        if (this.rl === undefined) {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
        }
    }

    new() {
        this.ask();

    }
    view() {
        this.ask();

    }
    complete() {
        this.ask();

    }
    delete() {
        this.ask();

    }
    quit() {
        console.log("See you soon! 😄");
        this.rl.close();
    }
    welcome() {
        console.log("Welcome to Todo CLI!\n--------------------");
        this.ask();
    }
    menu() {
        return "(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n>";
    }
    ask() {
        this.rl.question(this.menu(), answer => {
            checkProcess(answer);
        });
    }
}

function checkProcess(answer) {

    if (cl === undefined) {
        cl = new TodoCLI();
    }
    switch (answer) {
        case "w":
            cl.welcome();
            cl.ask();
            break;
        case "cX": console.log("Complete");
            cl.ask();
            break;
        case "dX": console.log("Delete");
            cl.ask();
            break;
        case "n": console.log("New");
            cl.ask();

            break;
        case "q": cl.quit(); break;
        case "v": console.log("View");
            cl.ask();
            break;
        default:
            cl.ask();
            break;
    }
}
checkProcess("w");
