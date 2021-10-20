import expressLoader from "./express"
import { Application } from "express"
import mongooseLoader from "./mongoose"
import Logger from "./logger"

export default async (expressApp: Application) => {
  await mongooseLoader()
  Logger.info("DB connected")
  expressLoader({ app: expressApp })
  Logger.info("Express loaded")
}
