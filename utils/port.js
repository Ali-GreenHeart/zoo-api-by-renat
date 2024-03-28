import dotenv from 'dotenv'
dotenv.config()
const { ZOO_PORT: port } = process.env

export default port;
