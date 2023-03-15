import {coursesModel} from "./models/courses.js";

//TODO: Implementar las operaciones CRUD:

export default class StudentService {
    constructor() { 
        console.log("Working courses with Database persistence in mongodb");
    }

    getAll = async () => {
        let courses = await coursesModel.find();
        return courses.map(course=>course.toObject());
    }
    save = async (course) => {
        let result = await coursesModel.create(course);
        return result;
    }
}

/* courses.get('/', async (req, res) => {
    try {
        let course = await coursesModel.find()
        return res.send({result:"success", payload: course})
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"No se pudo obtener.", message: error})
    }
    
    return res.send(getProducts.slice(0, limit))
})

courses.post("/", async (req, res) => {
    try {
        let {title, description, teacherName, students} = req.body;
        if (!title || !description || !teacherName, students) return res.status(400).send({status: "error", message: "Datos requeridos no enviados."});
        let course = await coursesModel.create({title, description, teacherName, students});
        res.send({result: "success", payload: course});
    } catch (error) {
        console.error("No se pudo obtener usuarios con moongose: " + error);
        res.status(500).send({error: "No se pudo obtener usuarios con moongose", message: error});
    }
}); */