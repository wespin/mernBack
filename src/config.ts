import dotenv from 'dotenv';
dotenv.config();

//console.log(process.env.MONGO_DATABASE);

export default{
    MONGO_DATABASE: process.env.MONGO_DATABASE || 'videosdb',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin',
    MONGO_HOST: process.env.HOST || 'localhost:27017',
    PUERTO: process.env.PUERTO || 5000
}