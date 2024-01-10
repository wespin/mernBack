import mongoose, { ConnectOptions } from 'mongoose';
import config from './config';

(async () => {
   try {
   /*
    const mongooseOptions: ConnectOptions = {
        */

    //const db = await mongoose.connect('mongodb://localhost:27017/mern-db');
   const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
    console.log('Conectado con exito a la BD:', db.connection.name);

    } catch (err) {
        console.error(err);
    }
})()


