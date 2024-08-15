import Router from 'express'
import { createDonation, getDonationDetails } from '../controller/donationController.js'
import verifyJwt from '../middleware/authMiddleware.js'
const router=Router()
router.post('/create',verifyJwt,createDonation)
router.get('/get/:id',verifyJwt,getDonationDetails)
export default router