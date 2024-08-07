import express from 'express';
import multer from 'multer';
import { getAdmin, getConentByType, sendCv, sendEnquiry, sendQuation, signIn, signupAdmin, updateContent } from '../../controllers/admin.controller.js';
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post('/createadmin',signupAdmin);
router.post('/signin',signIn)

router.put("/update_content",updateContent)
router.get("/get_content",getConentByType)
router.get("/get_admin",getAdmin)


//send mail // 
router.post('/sendEnquiry',sendEnquiry)
router.post('/sendquotation',sendQuation)
router.post('/sendCv',upload , sendCv)

export default router;
