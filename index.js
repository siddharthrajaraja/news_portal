var express= require('express')
var app =express()
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use('/assets',express.static('assets'));
app.set('view engine','ejs');


//------------GET ROUTES------------->
var {dashboard}=require('./getroutes.js')
app.get('/dashboard',dashboard);
app.get('/dashboard/:id1/:id2',dashboard);

var {model_files}=require('./databaseschema.js')


// -------------POST ROUTES------------------------>
var {admin_check,post_upload}=require('./postroutes.js')

app.post('/dashboard/admin/upload',urlencodedParser, post_upload)


app.post('/admin_check',urlencodedParser,admin_check);


app.listen(process.env.PORT || 3500)