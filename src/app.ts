import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'

import videoRoutes from './routes/videos.routes'

const app = express();

app.set('puerto', config.PUERTO);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(videoRoutes);

export default app;