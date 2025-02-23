import express = require('express');
import multer = require('multer');
import { Multer } from 'multer';
import assert = require('assert');

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        cb(null, false);
        cb(null, true);
        cb(new Error(`I don't have a clue!`));
    },
});

upload; // $ExpectType Multer
assert.strictEqual(upload.constructor.name, 'Multer');

const app = express();

app.post('/profile', upload.single('avatar'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.file; // $ExpectType File | undefined
});

app.post('/photos/upload', upload.array('photos', 12), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.files; // $ExpectType { [fieldname: string]: File[]; } | File[] | undefined
});

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
app.post('/cool-profile', cpUpload, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.files; // $ExpectType { [fieldname: string]: File[]; } | File[] | undefined
});

app.post('/text-only', upload.none(), (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
        next(new Error(err.code));
    }
});

const diskStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/tmp/my-uploads');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
});

const diskUpload: Multer = multer({ storage: diskStorage });

const memoryStorage = multer.memoryStorage();
const memoryUpload: Multer = multer({ storage: memoryStorage });

const customStorage = {
    _handleFile: (
            req: express.Request,
            file: Express.Multer.File,
            callback: (error?: any, info?: Partial<Express.Multer.File>) => void
        ): void => {
        callback();
    },
    _removeFile: (
        req: express.Request,
        file: Express.Multer.File,
        callback: (error: Error | null) => void
    ): void => {
        callback(null);
    }
};

const customUpload: Multer = multer({ storage: customStorage });
