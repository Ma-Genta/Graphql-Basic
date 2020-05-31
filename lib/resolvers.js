const connectDb = require('../db');
const { ObjectID } = require('mongodb'); //Transforma un id de String a un objeto de id de mongo



module.exports = resolvers = {
    Query: {
        getCourses: async() => {  //Funcion para traer todos los cursos 
            let db, course = []
            db = await connectDb(); //Iniciamos conexion
            course = await db.collection('course').find().toArray(); //Traemos todos los elementos   
            return course;
        },
        getCourse: async (root, {id}) => {  //De esta forma recibimos los parametros de la busqueda //Funcion para traer por id 
            let db, course
            db = await connectDb();
            course = await db.collection('course').findOne({ _id: ObjectID(id) });  //Recorremos buscando un id igual al que pasamos
            return course; //Devolvemos
        }
    }
};