import express from 'express';
import { uploadReport } from '../../controllers/report/report.controller.js';
import { protect } from '../../middleware/auth/auth.middleware.js';
import { upload } from '../../middleware/upload/upload.middleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('report'), uploadReport);

export default router;