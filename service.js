const { MongoClient } = require('mongodb');

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://twinkle88bara:twinkle88@cluster0.ngrxjbv.mongodb.net/blogapp')
            .then((client) => {
            dbConnection = client.db()
            return cb()
            })
            .catch((err) => {
            console.log(err)
            return cd (err)

            })
    },
    getDb: () => dbConnection


}