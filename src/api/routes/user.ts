import { Router, Request, Response } from "express"
import UserService from "@/services/user"

const route = Router()

export default (app: Router) => {
  app.use("/users", route)

  route.get("/:userId", async (req: Request, res: Response) => {
    const user = await UserService.getUserByID(req.params.userId)
    if (user) res.json(user)
    else res.status(404).end()
  })

  route.post("/", async (req: Request, res: Response) => {
    const user = await UserService.AddUser(req.body)
    // tslint:disable-next-line:no-console
    console.log(user)
    if (user) res.json(user)
  })

  route.patch("/:userID", async (req: Request, res: Response) => {
    // res.send("patch")
    const updatedUser = await UserService.updateUserByID(
      req.params.userID,
      req.body
    )
    if (updatedUser) res.json(updatedUser)
    else res.status(404).end()
  })
}
