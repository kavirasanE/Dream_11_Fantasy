const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    return res.status(200).json({ eMail: 'vertexviewtest@outlook.com', username: 'vertexviewtest@outlook.com', password: 'testpassword#@123' });
});

module.exports = router;