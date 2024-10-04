import express from "express";
import { templateUpload, upload } from "../middleware/multer.middleware.js";
import { getAllUsers, getUserById, updateUser, deleteUser,createTemplate,updateTemplate,deleteTemplate,getAllTemplates,CreateSubscriptionPlan,UpdateSubscriptionPlan,GetAllSubcriptionPlans,GetSingleSubcriptionPlan,} from "../controllers/admin.controller.js";

import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
const router = express.Router()

router.post('/create-template',isAuthenticated, isAdmin, templateUpload.any(), createTemplate);
router.put('/update-template/:id',isAuthenticated, isAdmin, templateUpload.any(), updateTemplate);
router.delete('/delete-template/',isAuthenticated, isAdmin,deleteTemplate)
router.get('/all-templates',isAuthenticated, isAdmin, getAllTemplates);

// ? subscription section
router.post('/create-subscriptionPlan',templateUpload.any(), isAuthenticated, isAdmin, CreateSubscriptionPlan);

router.put('/update-ubscriptionPlan/:id', isAuthenticated, isAdmin, UpdateSubscriptionPlan);

router.get('/get-allSubscriptionPlan', GetAllSubcriptionPlans);


router.get('/single-subscriptionPlan/:id', isAuthenticated, GetSingleSubcriptionPlan);

router.get('/user/:id',isAuthenticated, isAdmin, getUserById);
router.get('/all-users',isAuthenticated, isAdmin, getAllUsers);
router.put('/update-user/:id',isAuthenticated, isAdmin, updateUser);
router.delete('/delete-user/:id',isAuthenticated, isAdmin, deleteUser);

export default router;