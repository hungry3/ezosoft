import express from 'express'
import { AcceptInvite, AddnewMember,getSingleTemplateUrl, GetTemplates,newPayment, UserSubscriptionPlan,TemplatesWithAuth,getSingleTemplate} from '../controllers/user.controller.js'
import { isAuthenticated } from '../middleware/auth.middleware.js'
import { handleStripeWebhook } from '../utils/StripeWebHook.js'

const router = express.Router()



// webhook

router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook)
router.post('/get-subscription',isAuthenticated,UserSubscriptionPlan)
router.post('/add-member', isAuthenticated, AddnewMember);
router.post("/accept-invite/:inviteToken",AcceptInvite)
// ? user get all templates =>>>
router.get('/templates',GetTemplates)
router.get('/templates/:id',getSingleTemplate)
router.get('/templates-with-auth',TemplatesWithAuth)
router.get('/templateUrl/:id',isAuthenticated,getSingleTemplateUrl)
router.post('/payment',newPayment)

export default router;