exports.populate= async function (){
    var {model_files}=require('./databaseschema.js')
    var mongoose=require('mongoose');
    mongoose.connect('mongodb://127.0.0.1:27017/news_portal',{useUnifiedTopology:true,useNewUrlParser:true});
    const connection=mongoose.connection


await model_files.find({}).sort({index:-1}).then(async(data)=>{
        console.log("Model is ",data[0])
     await connection.once('open',async()=>{
                 mongoose.connection.db.dropCollection(data[0].files,(err,result)=>{console.log("DROPPED COLLECTION")})
        
      })  
        

        var Schema= new mongoose.Schema({
            headings:Array,
            rowvalues:Array
        });
        var model=mongoose.model(data[0].files,Schema);
        var fs =require('fs')
        const readfile=require('read-excel-file/node')
       readfile('uploads/data.xlsx').then(async(rows)=>{
            //console.log(rows)
            
            var properties=rows[0];
            var values=[]
            for(var i=1;i<rows.length;i++)values.push(rows[i]);
            var obj={
                headings:properties,
                rowvalues:values
            }

           await model(obj).save(()=>{console.log(model,"CREATED")})
           // for(var i=0;i<rows.length;i++) console.log(rows[i]);
            
        });
    
            
})
    
   

}