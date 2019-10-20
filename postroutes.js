
exports.admin_check=(req,res)=>{
    console.log(req.body);
    if(req.body.username=="12345" && req.body.password=="12345"){
        res.redirect('dashboard/admin/readfile');

    }
}

exports.what_to_display=(req,res)=>{
  var value=String(req.params.id).toLowerCase().trim()

  console.log(value)
  var mongoose=require('mongoose');
  var keys=require('./keys')
  mongoose.connect(keys.mongo.URL,{useUnifiedTopology:true,useNewUrlParser:true});
  
  var model= new mongoose.model(value+".xlsx",{})
  //model=mongoose.model(req.params.id+".xlsx",{});
  model.find({}).then((data)=>{
    res.send(data)
  })
  console.log(model);

  console.log(req.params.id)

  
}




// REQUIRE MULTER ---------------------------------------------------------- : 
var multer=require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
     cb(null, req.body.read)
      
  }
});

var upload = multer({ //multer settings
  storage: storage,
  fileFilter : async function(req, file, callback) { //file filter
    var {model_files}=require('./databaseschema.js');
    console.log(file.originalname)
    //var model_files=new mongoose.model('Databases');
     

    await model_files.countDocuments({files:file.originalname}).then(async(length)=>{
      if(length==0){
        var obj={files:file.originalname,index:1};
                await  model_files(obj).save(()=>{console.log("File Added")});
        
      }
    })

    
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
          return callback(new Error('Wrong extension type'));
      }



   await   callback(null, true);
  }
}).single('file');

exports.post_upload = async (req, res) => {

  console.log(req)    

   await upload(req,res, async function(err){
        if(err) throw err;
        else {
          console.log("YES")
        }
  
        var {populate}=require('./populate.js')
        await  populate(req.body.read);

        });
        
       
        await  res.redirect('/dashboard/admin/readfile');

     
      
  }


////-------------------------------------------------------------->>>>>>
