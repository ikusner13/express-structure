import routes from "@/api"
import express, { Request, Response } from "express"
import morganMiddleware from "./morgan"
import cors from "cors"
import config from "@/config"

interface ResponseError extends Error {
  status?: number
}

export default ({ app }: { app: express.Application }) => {
  app.use(cors())
  app.use(express.json())
  app.use(morganMiddleware)
  app.use(config.api.prefix, routes())

  // unknow endpoint
  app.use((req: Request, res: Response, next: express.NextFunction) => {
    res.status(404).send({ error: "unknown endpoint" })
  })

  /// error handlers
  app.use(
    (
      err: ResponseError,
      req: Request,
      res: Response,
      next: express.NextFunction
    ) => {
      /**
       * Handle 401 thrown by express-jwt library
       */
      if (err.name === "UnauthorizedError") {
        return res.status(err.status).send({ message: err.message }).end()
      }
      return next(err)
    }
  )
  app.use(
    (
      err: ResponseError,
      req: Request,
      res: Response,
      next: express.NextFunction
    ) => {
      res.status(err.status || 500)
      res.json({
        errors: {
          message: err.message,
        },
      })
    }
  )
}
