import app from './app'
import { appConfig } from './config'

app.listen(appConfig.port, () => {
    console.log(`REST API on http://localhost:${appConfig.port}/api`)
})