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
    },
    Mutation: {
        createCourse: async (root, { input }) => {
            const defaults = { //Para los datos que pueden ser nulos 
                teacher: ''
            };
            const newCourse = Object.assign(defaults, input); //creo un objeto que le cargo el default y le agrego los input
            let db, course;
            db = await connectDb();
            course = await db.collection('course').insertOne(newCourse); //Envio a guardar en nuevo objeto que contiene todo
            newCourse._id = course.insertedId;
            return newCourse;
        }
    }
};







// Query para buscar curso por id 
// {
// 	getCourse(id: "5ed2f0a6ec227db789b2e689"){
//     teacher
//     title
//   }
// }

// Query para buscar todos los titulos
// {
// 	getCourses{
//    	title
//   } 	
// }

// Mutation para agregar un curso y devuelvo algunos de sus atributos 
// mutation {
//     createCourse(input:{
//       title: "Curso de ejemplo 4"
//       description: "Descripcion ejemplo4"
//       teacher: "Aure"
//     }){
//       _id 
//       title
//     }
//   }

