import mongoose from "mongoose"
import config from "@/config"
export default async () => {
  const url = config.databaseURL
  const connection = await mongoose.connect(url)
  return connection
}
