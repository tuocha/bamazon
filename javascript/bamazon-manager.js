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
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        let productsArray = [];

        for (let i = 0; i < results.length; i++) {
            let productInfo = results[i].product_name + " ............. " + results[i].stock_quantity;

            productsArray.push(productInfo);
        }
        console.log(productsArray);

    }
    )
};


function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 100", function (err, results) {
        if (err) throw err;

        let productsArray = [];

        for (let i = 0; i < results.length; i++) {
            let productInfo = results[i].product_name + " ............. " + results[i].stock_quantity;

            productsArray.push(productInfo);
        }
        console.log(productsArray);

    })
}

function addInventory() {
    console.log("add inventory")
};


function addNew() {
    connection.query("SELECT * FROM products", function (err, results) {
        inquirer.prompt([
            {
                name: "itemName",
                type: "input",
                message: "What is the name of the item you're adding?"
            },
            {
                name: "itemDepartment",
                type: "list",
                message: "What department does it fall into?",
                choices: ["food", "pet", "decor", "household", "clothing"]
            },
            {
                name: "itemPrice",
                type: "number",
                message: "How much does it cost?"
            },
            {
                name: "itemQuantity",
                type: "number",
                message: "How much do you have in stock?"
            }
        ]).then(function(response) {
            let queryInto = 
            'INSERT INTO products (product_name, department_name, price, stock_quantity) ' + 
            'VALUES ("'+ response.itemName + '",' + '"' +
            response.itemDepartment + '",' +  
            response.itemPrice + ',' + 
            response.itemQuantity + ')'

            connection.query(queryInto, function(err, result) {
                if (err) throw err;
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                console.log("Item added! Now available for purchase.")
            })

        });
    });

};