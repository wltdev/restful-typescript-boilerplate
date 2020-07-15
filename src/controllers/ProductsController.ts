import { Request, Response } from 'express'

import messages from '../utils/messages'
import Product from '../schemas/Product'


interface MulterRequest extends Request {
  file: any;
}

class ProductsController {

  /**
   * Get all collection
   * @param req 
   * @param res 
   */
  public async index (req: Request, res: Response): Promise<Response> {
    const docs = await Product.find()

    return res.json(docs)
  }

  /**
   * Store new record on database
   * @param req 
   * @param res 
   */
  public async store (req: MulterRequest, res: Response): Promise<Response> {
    try {
      const { originalname, size, key, location: url = '' } = req.file
      console.log(req.file)
      const { name, price } = req.body
      
      const doc = await Product.create({
        name,
        price,
        image: {
          name: originalname,
          size,
          key,
          url
        }
      })

      return res.json({ message: messages.success.new_record, data: doc })      
    } catch (error) {
      return res.json({ error: true, message: error.message }) 
    }
  }

  /**
   * Show record details
   * @param req.params.id 
   * @param res 
   */
  public async show (req: Request, res: Response): Promise<Response> {
    const doc = await Product.find({ _id: req.params.id })

    return res.json(doc)
  }

  /**
   * Update a record
   * @param req.params.id 
   * @param res 
   */
  public async update (req: MulterRequest, res: Response): Promise<Response> {
    try {
      const doc = await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
        .lean()
        .exec()

      return res.json({ message: messages.success.new_record, data: doc })      
    } catch (error) {
      return res.json({ error: true, message: error.message }) 
    }
  }

  /**
   * Remove a record
   * @param req.params.id
   */
  public async destroy (req: Request, res: Response): Promise<Response> {
    try {
      const doc = await Product.deleteOne({ _id: req.params.id })
  
      if (!doc) {
        return res.status(400).json({ error: doc })
      }
  
      return res.status(200).json({ data: doc })
    } catch (e) {      
      return res.send(400).json({ error: e.message })
    }
  }

}

export default new ProductsController()