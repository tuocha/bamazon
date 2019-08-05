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
            connection.end;
        }
    })
}

// function postItem() {
//     inquirer.prompt([
//         {
//             name: "item",
//             type: "input",
//             message: "What item are posting?"
//         },
//         {
//             name: "category",
//             type: "input",
//             message: "What is the category for the item?"
//         },
//         {
//             name: "startingBid",
//             type: "input",
//             message: "Enter a starting bid",
//             validate: function(value) {
//                 if (isNaN(value) === false) {
//                     return true;
//                 } else {
//                     return false;
//                 }
//             }
//         }]).then(function(response) {
//             connection.query("INSERT INTO products SET ?",
//             {
//                 product_name: response.item,
//                 department: response.category,
//                 price: response.startingBid || 0,
//             },
//             function(err) {
//                 if(err) throw err;
//                 console.log("Auction created successfully");
//                 start();
//             })
//         })
// }

function viewItems() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "selectedItem",
                type: "rawlist",
                message: "Which item would you like to purchase?",
                pageSize: 12,
                choices: function () {
                    let productsArray = [];

                    for (let i = 0; i < results.length; i++) {
                        // let productInfo = results[i].product_name + " ............. " + "$" + results[i].price;

                        productsArray.push(results[i].product_name);
                    }
                    return productsArray;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like?"
            }
        ]).then(function (response) {
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].product_name === response.selectedItem) {
                chosenItem = results[i];
              }
            } 
            //finding a problem here. 'If' condition is not being met, for some frustrating ass reason.
            if (chosenItem.stock_quantity > results.amount) {
                checkoutComplete();
            } else {
                console.log("Sorry, that quantity of item is unavailable.")
                viewItems();
            }
            })
    })
    function checkoutComplete(){
        chosenItem.stock_quantity - results.amount;
        console.log("Transaction approved.")
    }
}