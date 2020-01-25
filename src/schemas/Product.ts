import { Schema, model, Document } from 'mongoose'

interface ProductInterface extends Document {
  name: string
  price: Number
  image: string
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name are required'],
    unique: true    
  },
  price: {
    type: Number,
    default: 0
  },
  image: {
    name: { type: String, trim: true },
    size: Number,
    key: String,
    url: String
  }
})

schema.pre('save', function() {
  if (!this.image.url)
    this.image.url = `${process.env.APP_URL}/files/${this.image.key}`
})


export default model<ProductInterface>('Product', schema)