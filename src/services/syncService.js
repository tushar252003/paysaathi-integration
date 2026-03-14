
const { getDB } = require("../db");

async function syncData(){

const customers = [
{ id:1, name:"ABC Corp", email:"abc@test.com"},
{ id:2, name:"XYZ Ltd", email:"xyz@test.com"}
];

const invoices = [
{ id:1, customer_id:1, amount:5000, due_date:"2024-01-10"},
{ id:2, customer_id:2, amount:3000, due_date:"2024-02-10"}
];

const payments = [
{ id:1, invoice_id:1, amount:2000, payment_date:"2024-01-05"}
];

const db = getDB();

customers.forEach(c=>{
db.run(`INSERT OR REPLACE INTO customers VALUES (?,?,?)`,
[c.id,c.name,c.email]);
});

invoices.forEach(i=>{
db.run(`INSERT OR REPLACE INTO invoices VALUES (?,?,?,?)`,
[i.id,i.customer_id,i.amount,i.due_date]);
});

payments.forEach(p=>{
db.run(`INSERT OR REPLACE INTO payments VALUES (?,?,?,?)`,
[p.id,p.invoice_id,p.amount,p.payment_date]);
});

}

module.exports = {syncData};
