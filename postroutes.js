
exports.admin_check=(req,res)=>{
    console.log(req.body);
    if(req.body.username=="12345" && req.body.password=="12345"){
        res.redirect('dashboard/admin/readfile');

    }
}

exports.what_to_display=(req,res)=>{
  var {flags}=require('./getflagcodes')

  var value=String(req.params.id).toLowerCase().trim()

  var mongoose=require('mongoose');
  var keys=require('./keys')
  mongoose.connect(keys.mongo.URL,{useUnifiedTopology:true,useNewUrlParser:true});
  var model;
  try{
     model= new mongoose.model(value+".xlsx")
  }
  catch(err){
    model= new mongoose.model(value+".xlsx",{})
  }
  //model=mongoose.model(req.params.id+".xlsx",{});
  if(value!="news data"){
        model.find({}).then((datathrow)=>{
        datathrow=JSON.stringify(datathrow)
      datathrow=JSON.parse(datathrow)
      var data=datathrow[0]['data'];
      var headings=datathrow[0]['headings'];
        flags.then((flags)=>{
          res.render('others',{data,headings,flags})
          })})
       // console.log(value)
        }
  else{
        model.find({}).then((datathrow)=>{
          datathrow=JSON.stringify(datathrow)
          datathrow=JSON.parse(datathrow)
          var data=datathrow[0]['data'];
          var headings=datathrow[0]['headings'];
          //console.log(headings);
          var ind;
          for(var i=0;i<headings.length;i++){if(headings[i].toLowerCase()=="category"){ind=i;break;}}
          console.log(ind,data) 
          data=JSON.stringify(data)
          data=JSON.parse(data) ;
          //console.log(data)  
          var categories=[]
          for(var i=0;i<data.length;i++){
            var obj=data[i][headings[ind]]
           if(categories.indexOf(obj)==-1)   
                categories.push(obj)
           // console.log("chal gaya",obj)
          }
          //console.log(categories)

          res.render('news',{categories,data,headings,ind})



          


        })
        //res.render('news')
  }
  

}



exports.lookfor=(req,res)=>{

  console.log(req.body)
  console.log(req.params.id1)
  var value=String(req.params.id1).toLowerCase().trim()

  var mongoose=require('mongoose');
  var keys=require('./keys')
  mongoose.connect(keys.mongo.URL,{useUnifiedTopology:true,useNewUrlParser:true});
  var model;
  try{
      model= new mongoose.model('news data'+".xlsx")
  }
  catch(err){
      model= new mongoose.model('news data'+".xlsx",{})
  }
  
  model.find({}).then((datathrow)=>{
    console.log(datathrow)
    datathrow=JSON.stringify(datathrow)
    datathrow=JSON.parse(datathrow)
    var data=datathrow[0]['data'];
    data=JSON.stringify(data)
    data=JSON.parse(data) ;
          
    var headings=datathrow[0]['headings'];
    var solution=[]
    for(var i=0;i<data.length;i++){
      for(var j=0;j<headings.length;j++){
        if(String(data[i][headings[j]]).includes(req.body.search)){
            solution.push(data[i])
            break
        }
      }
    }

    console.log(solution)

    res.render('searchnews',{headings,data:solution})

  })

}



// REQUIRE MULTER ---------------------------------------------------------- : 
var multer=require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
     cb(null, 'file.xlsx')
      
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
       
        console.log(typeof(model))
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
