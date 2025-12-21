import DoctorNote from "../../models/DoctorNote.js";
import MedicalReport from "../../models/MedicalReport.js"

export const getAssignedReports = async(req, res)=>{
    const reports = await MedicalReport.find({
        assignedDoctor: req.user._id //doctors id because he/she is logged in
    }).populate('patientId', 'name'); //also fetch the patient name using the patientId

    res.json(reports);
}

export const addDoctorNote = async(req, res)=>{
    const {reportId, note} = req.body;

    const doctorNote = await DoctorNote.create({
        reportId,
        doctorId: req.user._id,
        note
    });

    await MedicalReport.findByIdAndUpdate(reportId, {
        status: 'reviewed'
    });

    res.status(201).json({
        success: true,
        message: 'Doctor note added!',
        doctorNote
    });
}