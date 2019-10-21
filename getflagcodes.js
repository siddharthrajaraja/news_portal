const csvFilePath='./flag-codes.csv'
const csv=require('csvtojson')
exports.flags=csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    return jsonObj;     
})

