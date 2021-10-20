import User from "../models/user"
import IUser from "@/interfaces/IUser"

// maybe not correct way to do this
type TUserModel = typeof User

//! need to catch errors
class UserService {
  UserModel: TUserModel
  constructor(UserModel: TUserModel) {
    this.UserModel = UserModel
  }
  async AddUser(userInfo: IUser) {
    const user = new this.UserModel({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      username: userInfo.username,
    })
    const newUser = await user.save()
    return newUser
  }

  async GetAllUsers() {
    const users = await this.UserModel.find({})
    return users
  }

  async getUserByID(userid: string) {
    const user = await this.UserModel.findById(userid)
    return user
  }

  async updateUserByID(userid: string, userData: Partial<IUser>) {
    const user = await this.UserModel.findByIdAndUpdate(userid, userData, {
      new: true,
    })
    return user
  }
}

export default new UserService(User)
