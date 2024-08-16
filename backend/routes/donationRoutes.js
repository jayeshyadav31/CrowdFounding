import Router from 'express'
import { createDonation, getDonationByUser, getDonationDetails } from '../controller/donationController.js'
import verifyJwt from '../middleware/authMiddleware.js'
const router=Router()
router.post('/create',verifyJwt,createDonation)
router.get('/get/:id',verifyJwt,getDonationDetails)
router.get('/byUser',verifyJwt,getDonationByUser)
export default router