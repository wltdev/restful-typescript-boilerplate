import { Request, Response } from 'express'

import messages from '../utils/messages'
import Pelada from '../schemas/Pelada'
import User from '../schemas/User'


interface MulterRequest extends Request {
  file: any;
  user: any
}

class PeladasController {  
  
  /**
   * Get all collection
   * @param req 
   * @param res 
   */
  public async index (req: Request, res: Response): Promise<Response> {    
    const docs = await Pelada.find()
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
      const { name, local, hour } = req.body
      
      const data = {
        name,
        local,
        hour,
        image: {
          name: originalname,
          size,
          key,
          url
        },
        user: req.user._id
      }

      const doc = await Pelada.create(data)

      await User.findByIdAndUpdate(
        { _id: req.user._id},
        { admin: true }
      )

      return res.json({ message: messages.success.new_record, data: doc })      
    } catch (error) {
      return res.json({ error: true, message: error.message }) 
    }
  }

  /**
   * Update a record
   * @param req.params.id 
   * @param res 
   */
  public async update (req: MulterRequest, res: Response): Promise<Response> {   
    try {
      const { name, local, hour } = req.body

      const data = {
        name,
        local,
        hour
      }

      if (req.file) {
        const { originalname, size, key, location: url = '' } = req.file
        const image = {
          name: originalname,
          size,
          key,
          url
        }
        data['image'] = image
      }
      
      const doc = await Pelada.findOneAndUpdate(
        { _id: req.params.id },
        data,
        { new: true }
      )
        .lean()
        .exec()
        
      return res.json({ message: messages.success.new_record, data: doc })      
    } catch (error) {
      return res.json({ error: true, message: error.message }) 
    }
  }

}

export default new PeladasController()