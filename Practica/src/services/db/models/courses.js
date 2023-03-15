//TODO: Implementar Modelo con Mongoose:
import mongoose from 'mongoose'

const coursesCollection = 'courses'

const coursesSchema = new mongoose.Schema({
    title: {type: String, require: true },
    description: {type: String, require: true },
    teacherName: {type: Number, require: true },
    students: {type: Array, default:[], require: true}
})

export const coursesModel = mongoose.model(coursesCollection, coursesSchema)