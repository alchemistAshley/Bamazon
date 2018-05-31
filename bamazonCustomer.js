const mysql = require('mysql');
const inquirer = require('inquirer');

let item = null;
let quantity = null;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazonDB'
});

connection.connect(function(error, results) {
    if (error) throw error;
    getProducts();
});

const getProducts = function() {
    connection.query('SELECT * FROM products', function(error, results) {
        if (error) throw error;
        console.log('Welcome to BAMAZON: Boutique Amazon! Here are our current items: ');
        console.log('  ');
        for (var i = 0; i < results.length; i++) {
            console.log('ID: ' + results[i].item_id + ' | ' + 'Product Name: ' + results[i].product_name + ' | ' + 'Price: ' + '$' + results[i].price);
        }
        console.log('  ');
        promptItem();
    });
}

let promptItem = function() {
    inquirer.prompt([
        {
            name: 'item',
            type: 'input',
            message: 'Which product would you like? (Enter item ID)'
        }
    ]).then(function(response) {
        item = response.item;
        promptQuantity();
    });
}

let promptQuantity = function() {
    inquirer.prompt([
        {
        name: 'quantity',
        type: 'input',
        message: 'How many would you like? (Enter a number)'
        }
    ]).then(function(response) {
        quantity = response.quantity;
        checkDB(item, quantity);
    });
}

const checkDB = function(item, quantity) {
    let query = connection.query(
        'SELECT * FROM products WHERE ?',
        [
            {
            item_id: item
            }
        ],
        function(err, res) {
            if(quantity <= res[0].stock_quantity) {
                let total = res[0].price * quantity;
                console.log('Your total today is: ' + '$' + total);
                updateDB(item, quantity);
            }
            else if (res[0].stock_quantity > 0) {
                console.log('Sorry, we only have ' + res[0].stock_quantity + ' of ' + res[0].product_name +'(s)'  + ' in stock!');
            } 
            else if (res[0].stock_quantity == 0) { 
                console.log('Sorry, we are completely sold out of ' + res[0].product_name + '(s).');
            }
            contShop();
        }
    );
}

const updateDB = function(item, quantity) {
    let query = connection.query(
        'UPDATE products SET stock_quantity = stock_quantity -' + quantity + ' WHERE item_id = ?',
        [
            item
        ],
        function(err, res) {
            if (err) {
                console.log(err);
            }
        }
    );
}

const contShop = function() {
    inquirer.prompt([
        {
            name: 'continue',
            type: 'confirm',
            message: 'Would you like to keep shopping?',
            default: true
        }
    ]).then(function(response) {
        if (response.continue === true) {
            getProducts();
        } else {
            console.log('Thank you for shopping at BAMAZON. Have a great day!');
            endShop();
        }
    });
}

const endShop = function() {
    connection.end();
    // console.log("Connection ended!");
}
