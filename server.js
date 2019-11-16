const express = require('express');
const app = express();
const connectDB = require('./config/db');
//connect to DB
connectDB();
//init Middleware
app.use(express.json({extended:false}));
app.get('/',(req,res) => res.send('API ssruning'));

//Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/payment',require('./routes/api/payment'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
