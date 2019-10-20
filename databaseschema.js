var mongoose =require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/news_portal',{useUnifiedTopology:true,useNewUrlParser:true});
var keys=require('./keys')

mongoose.connect(keys.mongo.URL,{useUnifiedTopology:true,useNewUrlParser:true});



var fileSchema= new mongoose.Schema({
        files:"String",
        index:Number
    });

var model_files= mongoose.model('Databases',fileSchema);

/*
model_files.deleteMany({},(err,data)=>{console.log("deleted")})

var model_db1= mongoose.model('News Data.xlsx',{});
var model_db2= mongoose.model('Cricket Score Data.xlsx',{});
 model_db1.deleteMany({}).sort({index:-1}).then((data)=>{
      console.log(data[0])
  })
  
  model_db2.deleteMany({}).sort({index:-1}).then((data)=>{
    console.log(data[0])
})

model_files.deleteMany({},(err,data)=>{console.log("deleted")})


model_files.find({}).then((data)=>{
    console.log(data[0],"index")
})



model_db1.find({}).then((data)=>{
    console.log(data[0])
})

model_db2.find({}).then((data)=>{
    console.log(data)
})
*/

module.exports={
    model_files
}