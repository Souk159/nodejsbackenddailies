const express = require('express');
const router = express.Router();
const connection = require('./dbConnection');

// API Create Plan

router.post('/create-plan', (req, res) =>{
    const { name, percent} = req.body;

    connection.query("INSERT INTO plans (name, percent, created_at) VALUE (?, ?, NOW())", [name, percent], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert Plan"});
        }
        res.status(201).json({message: 'Plan Insert Successfully'});
    });
});

//API Select Plan 

router.get('/select-plan', (req, res) =>{
    connection.query("SELECT id, name, percent, active, status, created_at, updated_at FROM `plans`ORDER BY id DESC LIMIT 5", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Plan Not Found'});
        }
        res.status(200).json(result);
    });
});

// API SELECT Plan BY ID 

router.get("/plan/:id",(req, res) => {
    const { id }=req.params;

    connection.query("SELECT * FROM `plans` WHERE id = ? ", [id], (err, result) =>{
        if (err){
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select plan"});
        }
        if (result.length === 0){
            return res.status(404).json({message: "plan not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API update plan

router.put('/update-plan/:id', (req, res) => {
    const { id } = req.params;
    const { name, percent,  active, status,} = req.body;
    

    connection.query(
        "UPDATE plans SET name = ?, percent = ?, active = ?, status = ?,  updated_at = NOW() WHERE id = ?",
        [name, percent,active,status,id],
        (err, result) => {
            if (err){
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update plan'});
            }
            if (result.affectedRows === 0){
                return res.status(404).json({message: "Note not found"});
            }
            res.status(200).json({message: 'plan Update successfully'});
        }
    );
});

// api delete Plan

router.delete('/delete-plan/:id', (req, res) =>{
    const plan_ID = req.params.id;

    const query = "DELETE FROM plans WHERE id = ?";
    connection.query(query,[plan_ID], (err, result) =>{
        if (err){
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'plan not found'});
        }
        res.status(200).json({message: 'plan delete successfully'});
    });
});

//API Select Plan success

router.get('/select-plan-success', (req, res) =>{
    connection.query("SELECT * FROM `plans` WHERE status = 1", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Plan Not Found'});
        }
        res.status(200).json(result);
    });
});

//API Select Plan not success

router.get('/select-plan-not-success', (req, res) =>{
    connection.query("SELECT * FROM `plans` WHERE status = 0", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Plan Not Found'});
        }
        res.status(200).json(result);
    });
});

// API Search Plan
router.get('/search-plan', (req, res) => {
    const { name, percent, active } = req.query;

    let query = "SELECT * FROM `plans` WHERE 1=1";
    let params = [];

    if (name) {
        query += ' AND name = ?';
        params.push(name);
    }

    if (percent) {
        query += ' AND percent = ?';
        params.push(percent);
    }

    if (active) {
        query += ' AND active = ?';
        params.push(active);
    }
    

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

router.get('/count-all-plan',(req, res) =>{
    const query = "SELECT COUNT(name) as count_all_plans FROM plans";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum income'});
        }
        res.json({ count_all_plans: result[0].count_all_plans});
    })
})

router.get('/count-plan-success',(req, res) =>{
    const query = "SELECT COUNT(name) as count_success_plans FROM plans WHERE status = 1";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum income'});
        }
        res.json({ count_success_plans: result[0].count_success_plans});
    })
})
router.get('/count-plan-not-success',(req, res) =>{
    const query = "SELECT COUNT(name) as count_plans_not_success FROM plans WHERE status = 0";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum income'});
        }
        res.json({ count_plans_not_success: result[0].count_plans_not_success});
    })
})

router.get('/count-days',(req, res) =>{
    const query = "SELECT COUNT(DL_ID) as count_days FROM dailies WHERE is_delete = 0";
    connection.query(query, (err, result) => {
        if(err){
            return res.status(500).json({message:'failed to sum income'});
        }
        res.json({ count_days: result[0].count_days});
    })
})

module.exports = router