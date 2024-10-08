const express = require('express');
const router = express.Router();
const connection = require('./dbConnection');

// API Create Income

router.post('/create-income', (req, res) =>{
    const { income, income_reason, status} = req.body;

    connection.query("INSERT INTO payments (income, income_reason, status, created_at) VALUE (?, ?, ?, NOW())", [income, income_reason, status], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert income"});
        }
        res.status(201).json({message: 'Income Insert Successfully'});
    });
});

//API Select Income 

router.get('/select-income', (req, res) =>{
    connection.query("SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL ORDER BY id DESC LIMIT 5", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Income Not Found'});
        }
        res.status(200).json(result);
    });
});

// API SELECT Income BY ID 
router.get("/income/:id",(req, res) => {
    const { id }=req.params;

    connection.query("SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL AND id = ? ", [id], (err, result) =>{
        if (err){
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select income"});
        }
        if (result.length === 0){
            return res.status(404).json({message: "Income not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API update Income
router.put('/update-income/:id', (req, res) => {
    const { id } = req.params;
    const { income, income_reason, status} = req.body;
    

    connection.query(
        "UPDATE payments SET income = ?, income_reason = ?, status = ?,  updated_at = NOW() WHERE id = ?",
        [income, income_reason,status,id],
        (err, result) => {
            if (err){
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update income'});
            }
            if (result.affectedRows === 0){
                return res.status(404).json({message: "Note not found"});
            }
            res.status(200).json({message: 'Income Update successfully'});
        }
    );
});

// api delete Income

router.delete('/delete-income/:id', (req, res) =>{
    const income_ID = req.params.id;

    const query = "DELETE FROM payments WHERE id = ?";
    connection.query(query,[income_ID], (err, result) =>{
        if (err){
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'income not found'});
        }
        res.status(200).json({message: 'Income delete successfully'});
    });
});

// API Search Icome
router.get('/search-income', (req, res) => {
    const { income, income_reason, status } = req.query;

    let query = "SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL AND 1=1";
    let params = [];

    if (income) {
        query += ' AND income = ?';
        params.push(income);
    }

    if (income_reason) {
        query += ' AND income_reason = ?';
        params.push(income_reason);
    }

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

//API Select Income 

router.get('/select-all-income', (req, res) =>{
    connection.query("SELECT id, income, income_reason, status, created_at, updated_at FROM `payments` WHERE expense IS NULL ORDER BY id DESC", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Income Not Found'});
        }
        res.status(200).json(result);
    });
});


// API Create Expense

router.post('/create-expense', (req, res) =>{
    const { expense, expense_reason, status} = req.body;

    connection.query("INSERT INTO payments (expense, expense_reason, status, created_at) VALUE (?, ?, ?, NOW())", [expense, expense_reason, status], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert Expense"});
        }
        res.status(201).json({message: 'Expense Insert Successfully'});
    });
});

//API Select Expense 

router.get('/select-expense', (req, res) =>{
    connection.query("SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL ORDER BY id DESC LIMIT 5", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Expense Not Found'});
        }
        res.status(200).json(result);
    });
});

// API SELECT Expense BY ID 
router.get('/expense/:id',(req, res) => {
    const { id }=req.params;

    connection.query("SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL AND id = ? ", [id], (err, result) =>{
        if (err){
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select expense"});
        }
        if (result.length === 0){
            return res.status(404).json({message: "expense not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API update expense
router.put('/update-expense/:id', (req, res) => {
    const { id } = req.params;
    const { expense, expense_reason, status} = req.body;
    

    connection.query(
        "UPDATE payments SET expense = ?, expense_reason = ?, status = ?,  updated_at = NOW() WHERE id = ?",
        [expense, expense_reason,status,id],
        (err, result) => {
            if (err){
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update expense'});
            }
            if (result.affectedRows === 0){
                return res.status(404).json({message: "Note not found"});
            }
            res.status(200).json({message: 'expense Update successfully'});
        }
    );
});

// api delete expense

router.delete('/delete-expense/:id', (req, res) =>{
    const expense_ID = req.params.id;

    const query = "DELETE FROM payments WHERE id = ?";
    connection.query(query,[expense_ID], (err, result) =>{
        if (err){
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'expense not found'});
        }
        res.status(200).json({message: 'expense delete successfully'});
    });
});

// API Search Icome
router.get('/search-expense', (req, res) => {
    const { expense, expense_reason, status } = req.query;

    let query = "SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL AND 1=1";
    let params = [];

    if (expense) {
        query += ' AND expense = ?';
        params.push(expense);
    }

    if (expense_reason) {
        query += ' AND expense_reason= ?';
        params.push(expense_reason);
    }

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }
    

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

//API Select Expense All

router.get('/select-all-expense', (req, res) =>{
    connection.query("SELECT id, expense, expense_reason, status, created_at, updated_at FROM `payments` WHERE income IS NULL ORDER BY id DESC", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Expense Not Found'});
        }
        res.status(200).json(result);
    });
});

router.get('/sum-all-income',(req, res) =>{
    const query = "SELECT SUM(income) as sum_income FROM payments WHERE income IS NOT NULL";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum income'});
        }
        res.json({ sum_income: result[0].sum_income});
    })
})

router.get('/sum-income-today',(req, res) =>{
    const query = "SELECT SUM(income) as sum_income_today FROM payments WHERE DATE(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = CURRENT_DATE()";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum income'});
        }
        res.json({ sum_income_today: result[0].sum_income_today});
    })
})

router.get('/sum-expense-today',(req, res) =>{
    const query = "SELECT SUM(expense) as sum_expense_today FROM payments WHERE DATE(STR_TO_DATE(created_at,'%Y-%m-%d %H:%i:%s')) = CURRENT_DATE()";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum expense'});
        }
        res.json({ sum_expense_today: result[0].sum_expense_today});
    })
})

//44:06

router.get('/sum-all-expense',(req, res) =>{
    const query = "SELECT SUM(expense) as sum_expense FROM payments WHERE expense IS NOT NULL";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum expense'});
        }
        res.json({ sum_expense: result[0].sum_expense});
    })
})

router.get('/sum-all-remainings',(req, res) =>{
    const query = "SELECT SUM(income)-SUM(expense) as sum_remainings FROM payments ";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum remainings'});
        }
        res.json({ sum_remainings: result[0].sum_remainings});
    })
})

router.get('/sum-expense-month',(req, res) =>{
    const query = "SELECT SUM(expense) AS sum_expense_month FROM payments WHERE MONTH(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) = MONTH(CURRENT_DATE());";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum remainings'});
        }
        res.json({ sum_expense_month: result[0].sum_expense_month});
    })
})

router.get('/sum-income-month',(req, res) =>{
    const query = "SELECT SUM(income) AS sum_income_month FROM payments WHERE MONTH(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) = MONTH(CURRENT_DATE());";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum remainings'});
        }
        res.json({ sum_income_month: result[0].sum_income_month});
    })
})

module.exports = router;