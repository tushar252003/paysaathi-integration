
const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

router.get("/outstanding",(req,res)=>{

const db = getDB();

db.all(`
SELECT c.name,
SUM(i.amount) - IFNULL(SUM(p.amount),0) as outstanding
FROM customers c
JOIN invoices i ON c.id=i.customer_id
LEFT JOIN payments p ON i.id=p.invoice_id
GROUP BY c.id
`,[],(err,rows)=>{
res.json(rows);
});

});

router.get("/overdue",(req,res)=>{

const db = getDB();

db.all(`
SELECT *
FROM invoices
WHERE date(due_date) < date('now')
`,[],(err,rows)=>{
res.json(rows);
});

});

module.exports = router;
