import  express from 'express';
import { createBlog,getBlogCountByCategory,getBlogsByCategory,getSingleBlog,getAllBlogs,editBlog,deleteBlog, setBlogStatus, AdminGetAllBlogs, deleteMultipleBlogs,} from '../controllers/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js';
import { templateUpload } from '../middleware/multer.middleware.js';
import { allCategories, createCategory } from '../controllers/admin.controller.js';

const router  =  express.Router()

// Middleware

//  router.post("/create",isAuthenticated,isAdmin,templateUpload.any(), createBlog)
router.post("/create",templateUpload.any(), createBlog)

//  router.post('/edit',isAuthenticated,isAdmin,templateUpload.any(),editBlog)
router.post('/edit/:blogId',templateUpload.any(),editBlog)

//  router.delete("/delete",isAuthenticated,isAdmin,deleteBlog)
router.delete("/delete",deleteBlog)
router.get('/category-count',getBlogCountByCategory)
router.get('/category/:category',getBlogsByCategory)
router.get('/all',getAllBlogs)
router.get('/admin-all',AdminGetAllBlogs)
router.delete('/delete-multiple', deleteMultipleBlogs);

router.get('/:id',getSingleBlog)

router.patch('/:id/status',setBlogStatus)






export default router