const express = require('express');
const exphbs = require('express-handlebars');
const flash =require('express-flash');
const session =require('express-session');
const pg = require('pg');
const Pool = pg.Pool;
const app = express();

const PORT =  process.env.PORT || 3000;


let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = { rejectUnauthorized: false };
}
const connectionString = process.env.DATABASE_URL || 'postgresql://emmanuel:201735469@localhost:5432/coderdb';

const pool = new Pool({
    connectionString :connectionString ,
	ssl:useSSL
});

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(flash());

app.use(session({
    secret: "<This is the string used for my sessions>",
    resave: false,
    saveUninitialized: true
}));


const Registrations = require('./Helpers/registrations')
const regs = Registrations(pool);

app.get('/',(req,res)=>{
    res.render('index')
});
app.post('/details', async(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var problem = req.body.problem;
    console.log(name)
    console.log(email)
    console.log(problem)
    
if(name,email,problem){
    await regs.storeData(name,email,problem);
    req.flash('error', "Thank you");

    res.redirect('/')

}else{
    req.flash('error', "Please fill all the fields!");
    console.log("problem")

    res.render('index')

}

});
app.get('/tickets', async(req,res)=>{
const user = await regs.getStoredData();
    res.render('tickets', {
        user
    })
    
})
app.get('/admin',(req,res)=>{
res.render('admin')
})
app.get('/manage',(req,res)=>{
    res.render('manage')
    })
app.listen(PORT, ()=>{
    console.log('App startd on port', PORT);
})