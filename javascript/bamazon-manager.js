const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Fusrodah1!",
    database: "bamazon_db"
})

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt(
        {
            type: "list",
            name: "breaker",
            message: "Hello! What would you like to do?",
            choices: [
                "view products for sale",
                "view low inventory",
                "add inventory to items",
                "add new products",
                "exit"
            ]
        }
    ).then(function (response) {
        if (response.breaker === "view products for sale") {
            forSale();

        } else if (response.breaker === "view low inventory") {
            lowInventory();

        } else if (response.breaker === "add inventory to items") {
            addInventory();

        } else if (response.breaker === "add new products") {
            addNew();
            
        } else {
            connection.end();
        }
        // why tf won't this switch case work? why can't I use an expression in the case????
        // switch (response) {

        //     case response.breaker === "view products for sale":
        //         console.log("for sale")
        //         forSale();
        //         break;

        //     case response.breaker === "view low inventory":
        //         lowInventory();
        //         break;

        //     case response.breaker === "add inventory to items":
        //         addInventory();
        //         break;

        //     case response.breaker === "add new products":
        //         addNew();
        //         break;

        //     default:
        //         connection.end();
        // }
    })
}

function forSale() {
    console.log("for sale")
}

function lowInventory() {
    console.log("low inventory")
}

function addInventory() {
    console.log("add inventory")
}

function addNew() {
    console.log("add new")
}