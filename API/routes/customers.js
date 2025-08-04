const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./DB/ecommerce.db');

// List customers with order count
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const countQuery = `SELECT COUNT(*) AS total FROM users`;
const query = `
  SELECT users.*, COUNT(orders.order_id) AS order_count
  FROM users
  LEFT JOIN orders ON users.id = orders.user_id
  GROUP BY users.id
  LIMIT ? OFFSET ?;
`;


  db.get(countQuery, [], (err, countRow) => {
    if (err) return res.status(500).json({ error: 'Count query failed' });

    db.all(query, [limit, offset], (err, rows) => {
      if (err) return res.status(500).json({ error: 'Data query failed' });

      res.json({
        page,
        total: countRow.total,
        customers: rows
      });
    });
  });
});

// Get single customer
router.get('/:id', (req, res) => {
  const id = req.params.id;

 const query = `
  SELECT users.*, COUNT(orders.order_id) AS order_count
  FROM users
  LEFT JOIN orders ON users.id = orders.user_id
  WHERE users.id = ?
  GROUP BY users.id;
`;


  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Fetch error' });
    if (!row) return res.status(404).json({ error: 'Customer not found' });

    res.json(row);
  });
});

module.exports = router;