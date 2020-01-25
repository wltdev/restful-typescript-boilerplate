import mongoose, { Schema, model, Document } from 'mongoose'

interface PeladaInterface extends Document {
  name: string
  local: string
  hour: Date
  image: string
  user: string
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name are required'],
    unique: true    
  },
  local: String,
  hour: Date,
  image: {
    name: { type: String, trim: true },
    size: Number,
    key: String,
    url: String
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
}, {
  timestamps: true
})

schema.pre('save', function() {
  if (!this.image.url)
    this.image.url = `${process.env.APP_URL}/files/${this.image.key}`
})


export default model<PeladaInterface>('Pelada', schema)