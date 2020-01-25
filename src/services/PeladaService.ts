import Pelada from '../schemas/Pelada'

interface ImageInterface {
  name: string
  size: number
  key: string
  url: string
}

interface PInterface {
  name: string
  local: string
  hour: Date
  image: ImageInterface
  user: string
}

class PeladaService {
  protected model: any

  constructor () {
    this.model = new Pelada()
  }

  async getAll() {
    const docs = await this.model.find()

    return docs
  } 

  async store( data: PInterface ) {
    let doc = []
    try {
      doc = await this.model.create(data)
      
    } catch (error) {
      return {
        error
      }
    }

    return doc
  }

}

export default PeladaService