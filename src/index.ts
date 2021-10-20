import express from "express"
import Logger from "./loaders/logger"
import config from "./config"

const startServer = async () => {
  const app = express()

  await require("./loaders").default(app)
  app
    .listen(config.port, () => {
      Logger.info(`Server listening on port: ${config.port}`)
    })
    .on("error", (err) => {
      Logger.error(err)
      process.exit(1)
    })
}

startServer()
