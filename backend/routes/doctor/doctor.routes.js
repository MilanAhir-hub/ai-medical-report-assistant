import express from 'express';
import { addDoctorNote, getAssignedReports } from '../../controllers/doctor/doctorController.js';
import { protect } from '../../middleware/auth/auth.middleware.js';
import { allowRoles } from '../../middleware/role/role.middleware.js';
import { getPatientReportDetails } from '../../controllers/report/report.controller.js';

const router = express.Router();

router.get('/reports', protect, allowRoles('doctor'), getAssignedReports);

router.post('/note', protect, allowRoles('doctor'), addDoctorNote);

router.get('/:id/details', protect, allowRoles('patient'), getPatientReportDetails);

export default router;