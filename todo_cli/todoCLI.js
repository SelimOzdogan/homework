const fs = require('fs');
const readline = require('readline');

let fileName = process.argv.slice(2);
let cl;

class TodoCLI {
    constructor() {
        if (this.rl === undefined) {
            this.rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

        }
        if (fileName != undefined && fileName != '' && fs.existsSync("./" + fileName)) {
            fs.readFile("./" + fileName, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                this.tasks = JSON.parse(data);
            });
        }
        else
            this.tasks = [];
    }
    new() {
        this.rl.question("What?\n>", answer => {
            this.tasks.push({ completed: false, title: answer });
            this.menu();
        });
    }
    view() {
        if (this.tasks.length <= 0) {
            console.log("List is empty...");
        }
        else {
            for (let i = 0; i < this.tasks.length; i++) {
                console.log(`${i} [${(this.tasks[i].completed ? '✓' : ' ')}] ${this.tasks[i].title}`)
            }
        }
        this.menu();
    }
    complete(number) {
        if (number > this.tasks.length - 1) {
            console.log(`Item "${number}" is not found.`);
        }
        else {
            this.tasks[number].completed = true;
            console.log(`Completed "${this.tasks[number].title}"`);
        }
        this.menu();
    }
    delete(number) {
        if (number > this.tasks.length - 1) {
            console.log(`Item "${number}" is not found.`);
        }
        else {
            console.log(`Deleted "${this.tasks.splice(number, 1)[0].title}"`);
        }
        this.menu();
    }
    save() {
        this.rl.question(`Where?${(fileName === undefined ? '' : `(${fileName})`)}\n>`, answer => {
            if (answer != '' && answer != undefined)
                fileName = answer;
            fileName = "./" + fileName;
            fs.writeFileSync(fileName, JSON.stringify(this.tasks));
            this.menu();
        });
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
        this.ask("(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>");
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
    else if (chosen.match("^[c][0-9]+")) {
        cl.complete(chosen.slice(1));
    }
    else if (chosen.match("^[d][0-9]+")) {
        cl.delete(chosen.slice(1));
    }
    else if (chosen === "n") {
        cl.new();
    }
    else if (chosen === "s") {
        cl.save();
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
checkProcess();