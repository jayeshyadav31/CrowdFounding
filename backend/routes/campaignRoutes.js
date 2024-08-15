import Router from 'express'
import { createCampaign, deleteCampaign, getCampaign, updateCampaign } from '../controller/campaignController'
const router=Router()
router.post('/create',createCampaign);
router.post('/update',updateCampaign)
router.get('/get',getCampaign)
router.delete('/delete',deleteCampaign)
export default router;