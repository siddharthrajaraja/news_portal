exports.dashboard=(req,res)=>{
    var {model_files}=require('./databaseschema.js')
    model_files.find({}).then((datafiles)=>{
        console.log(datafiles,"I AM DASHBOARD")
        res.render('dashboard',{datafiles})

    })
}

