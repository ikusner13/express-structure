import mongoose from "mongoose"
import IUser from "@/interfaces/IUser"

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

User.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model<IUser & mongoose.Document>("User", User)
