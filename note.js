const express = require('express');
const router = express.Router();
const connection = require('./dbConnection');

// API Create notes

router.post('/create-notes', (req, res) =>{
    const { content, module_id} = req.body;

    connection.query("INSERT INTO notes (content, module_id, created_at) VALUE (?, ?, NOW())", [content, module_id], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);
            return res.status(500).json({message: "Failed to insert notes"});
        }
        res.status(201).json({message: 'notes Insert Successfully'});
    });
});

//API Select notes 

router.get('/select-notes', (req, res) => {
    connection.query("SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM notes JOIN modules ON  notes.module_id = modules.id ORDER BY notes.id DESC LIMIT 5", (err, result) => {
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0) {
            return res.status(404).json({message: 'Note Not Found'});
        }
        res.status(200).json(result);
    });
});

//API Select notes all 

router.get('/select-notes-all', (req, res) =>{
    connection.query("SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM notes JOIN modules ON  notes.module_id = modules.id;", (err, result) =>{
        if (err) {
            console.log('Database query error:', err);
            return res.status(500).json({message: 'Database query error'});
        }
        if (result.length === 0 ){
            return res.status(404).json({message: 'Notessdfsdf Not Found'});
        }
        res.status(200).json(result);
    });
});

// api delete notes

router.delete('/delete-notes/:id', (req, res) =>{
    const notes_ID = req.params.id;

    const query = "DELETE FROM notes WHERE id = ?";
    connection.query(query,[notes_ID], (err, result) =>{
        if (err){
            console.error('Database delete error:', err);
            return res.status(500).json({message: "Database delete error"});
        }
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Notes not found'});
        }
        res.status(200).json({message: 'Notes delete successfully'});
    });
});

// API Search notes
router.get('/search-notes', (req, res) => {
    const { content } = req.query;

    let query = "SELECT * FROM notes WHERE 1=1";
    let params = [];

    if (content) {
        query += ' AND content = ?';
        params.push(content);
    }
    

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

// API SELECT notes BY ID 
router.get("/notes/:id",(req, res) => {
    const { id }=req.params;

    connection.query("SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM notes JOIN modules ON  notes.module_id = modules.id WHERE notes.id = ? ", [id], (err, result) =>{
        if (err){
            console.error('Database selecting error', err);
            return res.status(500).json({message: "Failed to select Notes"});
        }
        if (result.length === 0){
            return res.status(404).json({message: "Notes not found"});
        }
        res.status(200).json(result[0]);
    });
});

// API update notes
router.put('/update-notes/:id', (req, res) => {
    const { id } = req.params;
    const { content} = req.body;
    const {module_id} = req.body;

    connection.query(
        "UPDATE notes SET content = ?, module_id = ?,  updated_at = NOW() WHERE notes.id = ?",
        [content, module_id,id],
        (err, result) => {
            if (err){
                console.error('Database update error', err);
                return res.status(500).json({message: 'Failed to update module'});
            }
            if (result.affectedRows === 0){
                return res.status(404).json({message: "Note not found"});
            }
            res.status(200).json({message: 'Note Update successfully'});
        }
    );
});

// API Search Module
router.get('/search-note', (req, res) => {
    const { content } = req.query;

    let query = "SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM notes JOIN modules ON  notes.module_id = modules.id WHERE 1=1";
    let params = [];

    if (content) {
        query += ' AND content = ?';
        params.push(content);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

// API Search Note By Module
router.get('/search-note-by-module', (req, res) => {
    const { module_id } = req.query;

    let query = "SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM notes JOIN modules ON  notes.module_id = modules.id WHERE 1=1";
    let params = [];

    if (module_id) {
        query += ' AND module_id = ?';
        params.push(module_id);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});

// API Search Note By Module
router.get('/search-note-by-module', (req, res) => {
    const { module_id } = req.query;

    let query = "SELECT notes.id, notes.content, notes.created_at, notes.updated_at, modules.module_name FROM notes JOIN modules ON  notes.module_id = modules.id WHERE 1=1";
    let params = [];

    if (module_id) {
        query += ' AND module_id = ?';
        params.push(module_id);
    }
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Database search error', err);
            return res.status(500).json({ message: "Failed to search" });
        }
        res.status(200).json(results);
    });
});


module.exports = router;