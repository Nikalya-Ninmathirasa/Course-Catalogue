const app = require('./app');
const dbconnection = require('./Database/DB');
require("dotenv").config();
const port = process.env.PORT || 5000;


app.get('/' , (req, res)=>{
    res.end('Hello World with Node JS and Express JS')

})

app.listen(port, function(){

    console.log(`Node JS and Express Server Started Successfully with Nodemon`)
    console.log(`Server is running on Port: ${port}`);

})