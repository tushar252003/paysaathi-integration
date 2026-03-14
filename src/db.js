
const sqlite3 = require("sqlite3").verbose();

let db;

function initDB(){
    db = new sqlite3.Database("./database.sqlite");

    db.serialize(()=>{

        db.run(`CREATE TABLE IF NOT EXISTS customers(
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS invoices(
            id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            amount REAL,
            due_date TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS payments(
            id INTEGER PRIMARY KEY,
            invoice_id INTEGER,
            amount REAL,
            payment_date TEXT
        )`);
    });
}

function getDB(){
    return db;
}

module.exports = {initDB, getDB};
