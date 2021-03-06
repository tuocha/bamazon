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
    inquirer.prompt({
        type: "list",
        name: "breaker",
        message: "Select 'view' to see items available for purchase",
        choices: ["view", "exit"]
    }).then(function (response) {
        if (response.breaker === "view") {
            viewItems();
        } else {
            connection.end();
        }
    })
}


function viewItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "itemsDisplay",
                type: "rawlist",
                message: "Which item would you like to purchase?",
                pageSize: results.length + 2,
                choices: function () {
                    let productsArray = [];

                    for (let i = 0; i < results.length; i++) {
                        let productInfo = results[i].product_name + " ............. " + "$" + results[i].price;

                        productsArray.push(productInfo);
                    }
                    return productsArray;
                }
            },
            {
                name: "amount",
                type: "number",
                message: "How many would you like?"
            }
        ]).then(function (response) {
            var chosenItem = "";

            for (let i = 0; i < results.length; i++) {
              if (response.itemsDisplay.includes(results[i].product_name)) {
                chosenItem = results[i]; 
              }
            } 

            if (chosenItem.stock_quantity > response.amount) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                        stock_quantity: chosenItem.stock_quantity - response.amount
                        },
                        {
                        id: chosenItem.id
                        }
                    ],
                    function(error) {
                        if (error) throw error;
                        console.log("Items removed from inventory.");
                        start();
                    }
                )
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                console.log("Transaction approved.")
                console.log("                                           ")
                console.log("Your order total is $" + chosenItem.price * response.amount + ".")
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

                    } else {
                console.log("Sorry, that quantity of item is unavailable.")
                viewItems();
            }
            })
    })
}
