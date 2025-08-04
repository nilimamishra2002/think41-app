const express = require ('express');
const app=express();
const customerRouter = require('./routes/customers');

app.use(express.json());
app.use('/customers', customerRouter);

const PORT=3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});