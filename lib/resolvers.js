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
        },
        getStudents: async() => {  //Funcion para traer todos los cursos 
            let db, student = []
            db = await connectDb(); //Iniciamos conexion
            student = await db.collection('student').find().toArray(); //Traemos todos los elementos   
            return student;
        },
        getStudent: async (root, {id}) => {  //De esta forma recibimos los parametros de la busqueda //Funcion para traer por id 
            let db, student
            db = await connectDb();
            student = await db.collection('student').findOne({ _id: ObjectID(id) });  //Recorremos buscando un id igual al que pasamos
            return student; //Devolvemos
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
        },
        createStudent: async (root, { input }) => {
            let db, student;
            db = await connectDb();
            student = await db.collection('student').insertOne(input); //Envio a guardar en nuevo objeto que contiene todo
            input._id = student.insertedId;
            return input;
        },
        editCourse: async (root, { _id,input }) => {
            let db, course;
            db = await connectDb();
            await db.collection('course').updateOne({_id: ObjectID(_id)},{$set: input}); //Update un actualiza, primera objeto recibe el id a buscar y segundo los datos a cambiar
            course = await db.collection('course').findOne({_id: ObjectID(_id)});
            return course;
        },
        editStudent: async (root, { _id,input }) => {
            let db, student;
            db = await connectDb();
            await db.collection('student').updateOne({_id: ObjectID(_id)},{$set: input}); //Update un actualiza, primera objeto recibe el id a buscar y segundo los datos a cambiar
            student = await db.collection('student').findOne({_id: ObjectID(_id)});
            return student;
        },
        deleteCourse: async (root, {_id}) =>{
            let db;
            db = await connectDb();
            await db.collection('course').deleteOne({_id: ObjectID(_id)});
            return `${_id} eliminado`;
        },
        deleteStudent: async (root, {_id}) =>{
            let db;
            db = await connectDb();
            await db.collection('student').deleteOne({_id: ObjectID(_id)});
            return `${_id} eliminado`;
        },
        addPeople: async (root, { courseID, studentID }) =>{
            let db, person, course;
            db = await connectDb();
            person = await db.collection('student').findOne({_id: ObjectID(studentID)});
            course = await db.collection('course').findOne({_id: ObjectID(courseID)});
            if(!course || !person) throw new Error("Estudiante o curso no encontrado");

            await db.collection('course').updateOne({_id: ObjectID(courseID)}, {$addToSet: {people: ObjectID(studentID)}});
            return `Estudiante ${person.name} agregado con exito a ${course.description}.`;
        }
    },
    Course: { //Para el campo que quiero que se resuelva, al momento de tener los id de otro esquema en un esquema
        people: async ({ people }) => {
            let db, peopleData, ids;
            db = await connectDb();
            ids = people ? people.map(id => ObjectID(id)) : []
            peopleData = ids.length > 0 ? await db.collection('student').find({_id: { $in: ids }}).toArray() : [];
            return peopleData;
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

