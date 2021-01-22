import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import userModuleRoutes from './routes';
import {info} from './logger';

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/v1', userModuleRoutes());


const bootsrapApplication = (async () => {
    let server = http.createServer(app);
    server.listen(8080, () => {
        info('Application started on port 8080');
    });
}
)();