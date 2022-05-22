const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/votes', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id) AS count
                 FROM votes
                 LEFT JOIN candidates ON votes.candidate_id = candidates.id
                 LEFT JOIN parties ON candidates.party_id = parties.id
                 GROUP BY candidate_id ORDER BY count DESC;`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;