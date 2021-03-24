const errorHandler = (errors: Array<any>) => {
  return new Promise((resolve, reject) => {
    const handled = []
    errors.forEach((error: any) => {
      handled.push({
        message: error.message,
        type: error.type,
        path: error.path,
        value: error.value
      })
    })
  
    resolve(handled)
  })
}

export default errorHandler