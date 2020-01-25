import mongoose, { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserInterface extends Document {
  _id: string
  email: string
  name: string
  admin: boolean
  comparePassword(candidatePassword: string): boolean
}

const schema = new Schema({
  email: {
    type: String,
    required: [true, 'E-mail é obrigatório!'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Nome é obrigatório!']
  },
  admin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
})

schema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await bcrypt.hash(this.password, 8)

  next()
})

schema.methods.comparePassword = function(candidatePassword: string) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, passwordHash, (err: any, same: boolean) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}


// schema.methods.fullName = function (): string {
//   return `${this.firstName} ${this.lastName}`
// }

export default model<UserInterface>('User', schema)
