import Router from 'express'
import { createCampaign, deleteCampaign, getAllCampaigns, getCampaign, updateCampaign } from '../controller/campaignController.js'
import verifyJwt from '../middleware/authMiddleware.js';
const router=Router()
router.post('/create',verifyJwt,createCampaign);
router.post('/update',verifyJwt,updateCampaign)
router.get('/get/:id',verifyJwt,getCampaign)
router.get('/getAll',verifyJwt,getAllCampaigns)
router.delete('/delete',verifyJwt,deleteCampaign)
export default router;