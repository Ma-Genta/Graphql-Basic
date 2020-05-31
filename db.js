const { MongoClient } = require('mongodb')
const mongoUrl = 'mongodb+srv://user:1234@cluster-sx3ez.mongodb.net/test?retryWrites=true&w=majority'
let connection
async function connectDB () {
if (connection) return connection

let client
try {
client = await MongoClient.connect(mongoUrl, {
useNewUrlParser: true,
useUnifiedTopology: true
})
connection = client.db('test')
} catch (error) {
console.error('Could not connect to db', mongoUrl, error)
process.exit(1)
}

return connection
}

module.exports = connectDB