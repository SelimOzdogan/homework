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
        this.tasks = [];
    }
    // new1() {
    //     this.tasks.push(['selim', 0]);
    //     this.tasks.push(['rukiye', 0]);
    // }
    new() {
        this.rl.question("What?\n>", answer => {
            this.tasks.push([answer, 0]);
            this.menu();
        });
    }
    view() {
        for (let i = 0; i < this.tasks.length; i++) {
            console.log(`${i} [${(this.tasks[i][1] === 0 ? ' ' : '✓')}] ${this.tasks[i][0]}`)
        }
        this.menu();
    }
    complete(number) {
        this.tasks[number][1] = 1;
        this.menu();
    }
    delete() {
        this.menu();
    }
    quit() {
        console.log("See you soon! 😄");
        this.rl.close();
    }
    welcome() {
        console.log("Welcome to Todo CLI!\n--------------------");
        this.menu();
    }
    menu() {
        this.ask("(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n>");
    }
    ask(question) {
        this.rl.question(question, answer => {
            checkProcess(answer);
        });
    }
}

function checkProcess(chosen) {

    if (cl === undefined) {
        cl = new TodoCLI();
    }
    if (chosen === undefined) {
        cl.welcome();
        cl.menu();
    }
    else if (chosen.match("[c][0-9]")) {
        cl.complete(chosen.slice(1));
    }
    else if (chosen.match("[d][0-9]")) {
        cl.delete();
    }
    else if (chosen === "n") {
        cl.new();
    } else if (chosen === "v") {
        cl.view();
    }
    else if (chosen === "q") {
        cl.quit();
    }
    else {
        cl.menu();
    }
}
checkProcess("w");
// const ss= new TodoCLI();
// ss.view();
// ss.new1();
// ss.view();
// ss.complete(0);
// ss.view();
// ss.complete(1);
// ss.view();
