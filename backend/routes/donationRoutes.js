import Router from 'express'
import { createDonation, getDonationDetails } from '../controller/donationController'
const router=Router()
router.post('/create',createDonation)
router.get('/get',getDonationDetails)
export default router