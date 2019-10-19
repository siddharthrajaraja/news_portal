exports.admin_check=(req,res)=>{
    console.log(req.body);
    if(req.body.username=="12345" && req.body.password=="12345"){
        res.redirect('dashboard/admin/readfile');

    }
}

// REQUIRE MULTER ---------------------------------------------------------- : 
var multer=require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
     cb(null, "data.xlsx" )
      
  }
});

var Files=[]

var upload = multer({ //multer settings
  storage: storage,
  fileFilter : async function(req, file, callback) { //file filter
    var {model_files}=require('./databaseschema.js');
   Files.push(file.originalname)
  await model_files.countDocuments({},async (err,length)=>{ 
   await model_files.countDocuments({files:file.originalname}, async(err,database)=>{
        if(err) throw err;
        console.log(database,"I am in");
        if(database==0)
                {
                var obj={files:file.originalname,index:length+1}
              await  model_files(obj).save(()=>{console.log("File Added")});
                }
        else{
            var obj={files:file.originalname,index:length+1}
            await  model_files.findOneAndUpdate({files:file.originalname},obj,()=>{console.log("UPDATED")})
            

        }
               
    })})
    
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
          return callback(new Error('Wrong extension type'));
      }
      callback(null, true);
  }
}).single('file');

exports.post_upload = async (req, res) => {

    

   await upload(req,res, async function(err){
        if(err) throw err;
        else {console.log("YES")
        var {populate}=require('./populate.js')
      await  populate();
        //res.redirect('/home');
        }
  
        });
    }

console.log(Files)

////-------------------------------------------------------------->>>>>>
