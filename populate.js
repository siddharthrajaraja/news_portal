exports.populate= async function (fname){
    var {model_files}=require('./databaseschema.js')
    var mongoose=require('mongoose');
    var keys=require('./keys')
//    mongoose.connect('mongodb://127.0.0.1:27017/news_portal',{useUnifiedTopology:true,useNewUrlParser:true});
    mongoose.connect(keys.mongo.URL,{useUnifiedTopology:true,useNewUrlParser:true});

    const connection=mongoose.connection

        
     await connection.once('open',async()=>{
                 mongoose.connection.db.dropCollection(fname,(err,result)=>{console.log("DROPPED COLLECTION")})
        
      })
        

        var Schema= new mongoose.Schema({
            data:Array,
            headings:Array
        });
      try{
        var model=mongoose.model(fname);
        
      } 
      catch(err){
        var model=mongoose.model(fname,Schema);
        
      } 
        var fs =require('fs')
        const readfile=require('read-excel-file/node')
       readfile('./uploads/file.xlsx').then(async(rows)=>{
            //console.log(rows)
            
            var properties=rows[0];
            var values=[]
            for(var i=1;i<rows.length;i++)values.push(rows[i]);
            

            var Arrayobjs=[]
            for(var i=1;i<rows.length;i++){
                var perobj=new Object();
                for(var j=0;j<properties.length;j++){

                    perobj[properties[j]]=rows[i][j]
                }
                Arrayobjs.push(perobj)
            }
            //console.log(Array);
            properties=rows[0]
            console.log(properties)
            

           await model({"data":Arrayobjs,"headings":properties}).save(()=>{console.log(model,"CREATED")})
           // for(var i=0;i<rows.length;i++) console.log(rows[i]);
            
        });

    
        
    
 
    
   

}