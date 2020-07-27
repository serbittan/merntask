require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const { name, version } = require('./package')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
//const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes')

//conectamos a la base de datos
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const logger = winston.createLogger({
      level: env === 'development' ? 'debug' : 'info',
      format: winston.format.json(),
      //defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'server.log' }),
      ]
    })

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (env !== 'production') {
      logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }
    console.log('base de datos connectada')

    //acceder a leer y escribir los archivos del sistem file
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

    //definimos el servidor
    const app = express()

    //aplicamos cors

    //app.use(cors())

    //morgan para la captura de HTTP req, res y su logger
    app.use(morgan('combinated', { stream: accessLogStream }))

    // importar todas las rutas
    app.use('/api', router)

    //arrancamos el servidor manteniéndolo a la escucha
    app.listen(port, () => logger.info(`server ${name} ${version} up and running on port ${port}`))

    process.on('SIGNT', () => {
      logger.info('server abruptly stopped')

      process.exit(0)
    })
  })



