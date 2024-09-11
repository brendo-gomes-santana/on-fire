import 'express-async-errors';
import path from 'path';
import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';

import { route } from './route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/imagem',
    express.static(path.resolve(__dirname, '..', 'imgs'))
)

app.use('/v1', route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).send({
            error: err.message
        })
    }
    return res.status(500).send({
        status: 'error',
        message: 'Internal server error'
    })
})

app.listen(3333, ()=> {
    console.log('SERVIDOR NO AR')
});