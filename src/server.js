const express = require('express');

const app = express;

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {console.log(`Server Running on http://localhost:${PORT}`)});