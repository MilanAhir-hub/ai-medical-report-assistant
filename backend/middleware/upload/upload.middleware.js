// multer upload middleware
import multer from 'multer';

const storage = multer.diskStorage({});

// restriction of file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images & PDFs allowed to upload'), false);
    }
};

// upload middleware that handling the incoming files
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10*1024*1024  //10 mb size is maximum
    },
});