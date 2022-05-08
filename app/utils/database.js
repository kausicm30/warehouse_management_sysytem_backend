let mongoose = require('mongoose');



class Database{
    static async dbConnection(){
        const uri = 'mongodb+srv://kausic:2FLZsMheFEPfYp70@cluster0.wg4bw.mongodb.net/warehouse?retryWrites=true&w=majority';
        const connectionParameters={
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        mongoose.connect(uri, connectionParameters)
        .then(function(){
            console.log('Connected to mongodb successful');
        })
        .catch(function(err){
            console.log('Error connecting to mongodb'+err);
        })
    }
}

module.exports = Database;