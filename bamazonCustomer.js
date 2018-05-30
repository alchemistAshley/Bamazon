var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazonDB'
});

connection.connect(function(error, results) {
    if (error) throw error;
    start();
});

// dipslay database
// function showDB() {
//     console.log('Welcome to BAMAZON: Boutique Amazon. Here are all of our current items: ');
//     console.log('  ');
//     connection.query('SELECT * FROM products', function(error, res) {
//         for (var i = 0; i < res.length; i++) {
//             console.log(res[i].item_id + ' | ' + res[i].product_name + ' | ' + '$' + res[i].price);
//         }
//     console.log('  ');
//     connection.end();
//     });
// }

// check's order to make sure there is an inventory for item

// // update database based on user input, show updated DB
// function updateDB () {

// }


function start() {
    connection.query('SELECT * FROM products', function(error, results) {

        if (error) throw error;
        console.log('Welcome to BAMAZON: Boutique Amazon. Here are all of our current items: ');
        console.log('  ');

        inquirer.prompt([
            {
                name: 'item',
                type: 'rawlist',
                choices: function() {
                    var productArray = [];
                    for (var i = 0; i < results.length; i++) {
                        productArray.push(results[i].item_id + ' | ' + results[i].product_name + ' | ' + '$' + results[i].price);
                    }
                    console.log('Console:' + productArray);
                    console.log(' ');
                    return productArray;
                },
                message: 'Which product would you like to buy? (Enter the ID number)'
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many would you like?',
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(response) {
            // save product as chosenProduct
            var chosenProduct;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id === response.item) {
                    chosenProduct = results[i];
                }
            }

            // response.quantity

            // check to see if chosenProduct is in stock,
            if (response.quantity <= chosenProduct.stock_quantity) {
                // if item is in stock- fulfill order. update DB to reflect remaining quantity, once update goes through, show customer the cost: console.log('Thank you for shopping at BAMAZON. Your total today is:' + price);
            } else {
                // if not console.log('Sorry, we only have (DBquantity) of' + chosenProduct + 'in stock!');
            }
            
            
        });
    });
}