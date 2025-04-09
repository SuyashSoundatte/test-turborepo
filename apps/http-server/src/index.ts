import express, { Response, Request } from 'express';
import { asyncHandler, ApiError, ApiResponse } from '@repo/utils';
import { MongoConnectDB } from '@repo/mongo';
import { ConnectDB } from '@repo/postgres';

const app = express();

app.use(express.json());

const handler = asyncHandler(async (req: Request, res: Response) => {
    const user = 'suyash';
    const err = false;
    if (err) {
        throw new ApiError(400, 'Error');
        // process.exit(1);
    }
    res.send(new ApiResponse(200, user, 'user get successfully!'));
});

function serverStart(){
    Promise.all([ MongoConnectDB()])
        .then(() => {
            console.log('connected to db');
            app.listen(3000, () => {
                console.log('server started');
            });
        })
        .catch((err) => {
            console.log('error connecting to db', err);
        });
}

// app.listen(3000, () => {
//     console.log('server started');
// });


serverStart();