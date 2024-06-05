const {default: mongoose} = require("mongoose");

const dbConnect = async() => {
    try{
        const conn = await  mongoose.connect("mongodb://localhost:27017/thuongmaidientu")
        if(conn.connection.readyState === 1) {
            console.log("DB connection is successfully");
        }else{
            console.log("DB connecting");
        }
    }catch(error){
        console.log('DB connection is fail');
        throw new Error(error);
    }
}

module.exports = dbConnect