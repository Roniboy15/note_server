const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const topicsRoutes = require('./routes/topics');
require("./db/mongoConnect")

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);
app.use('/topics', topicsRoutes);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server started on port ${port}`));
