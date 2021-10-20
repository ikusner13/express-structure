import dotenv from "dotenv"

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development"
const envFound = dotenv.config()
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
  /**
   * PORT
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * MongoDB url
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "warn",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
}
