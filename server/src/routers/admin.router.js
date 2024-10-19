import express from "express";
import { templateUpload, upload } from "../middleware/multer.middleware.js";
import { getAllUsers, getUserById,getTemplateById, updateUser, deleteUser,createTemplate,updateTemplate,deleteTemplate,getAllTemplates,CreateSubscriptionPlan,UpdateSubscriptionPlan,GetAllsubscriptionPlans,GetSinglesubscriptionPlan, createCategory, allCategories, deleteCategory,} from "../controllers/admin.controller.js";

import { isAuthenticated, isAdmin } from "../middleware/auth.middleware.js";
const router = express.Router()

// router.post('/create-template',isAuthenticated, isAdmin, templateUpload.any(), createTemplate);
router.post('/create-template', templateUpload.any(), createTemplate);

// router.put('/update-template/:id',isAuthenticated, isAdmin, templateUpload.any(), updateTemplate);
router.put('/update-template/:id', templateUpload.any(), updateTemplate);

router.delete('/delete-template/',isAuthenticated, isAdmin,deleteTemplate)
// router.get('/all-templates',isAuthenticated, isAdmin, getAllTemplates);

router.get('/template/:id', getTemplateById);
router.get('/all-templates', getAllTemplates);


// ? subscription section
router.post('/create-subscriptionPlan',templateUpload.any(), isAuthenticated, isAdmin, CreateSubscriptionPlan);

router.put('/update-ubscriptionPlan/:id', isAuthenticated, isAdmin, UpdateSubscriptionPlan);

router.get('/get-allSubscriptionPlan', GetAllsubscriptionPlans);


router.get('/single-subscriptionPlan/:id', isAuthenticated, GetSinglesubscriptionPlan);

router.get('/user/:id',isAuthenticated, isAdmin, getUserById);
// router.get('/user/:id', getUserById);

router.get('/all-users',isAuthenticated, isAdmin, getAllUsers);
// router.get('/all-users', getAllUsers);

router.put('/update-user/:id',isAuthenticated, isAdmin, updateUser);
// router.put('/update-user/:id', updateUser);

router.delete('/delete-user/:id',isAuthenticated, isAdmin, deleteUser);
// router.delete('/delete-user/:id', deleteUser);



router.post('/create-category',createCategory)
router.get('/blog-categories',allCategories)
router.delete('/delete-category/:id',deleteCategory)


export default router;