import mongoose from 'mongoose'

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        require: [true, 'Correo es requerido.']
    }
})

export const userModel = mongoose.model(userCollection, userSchema)