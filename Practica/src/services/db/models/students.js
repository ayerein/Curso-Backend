//TODO: Implementar Modelo con Mongoose:
import mongoose from 'mongoose'

const studentsCollection = 'estudiantes'

const studentsSchema = new mongoose.Schema({
    name: {type: String, require: true },
    last_name: {type: String, require: true },
    age: {type: Number, require: true },
    id: {
        type: String,
        unique: true,
        require: true
    },
    courses: {type: Array, default:[], require: true}
})

export const studentsModel = mongoose.model(studentsCollection, studentsSchema)