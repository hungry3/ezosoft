import  { useState, useEffect } from 'react';
import { axiosConfig } from '../../utils/axiosConfig';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading , setLoading] =useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      try {
        const { data } = await axiosConfig.get('/admin/blog-categories');
        setCategories(data?.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false)
    };

    fetchCategories();
  }, []);

  const handleCategoryCreate = async () => {
    if (!newCategory) {
      setError('Category name is required');
      return;
    }
    setLoading(true)
    try {
      const { data } = await axiosConfig.post('/admin/create-category', { name: newCategory });
      setCategories((prevCategories) => [...prevCategories, data?.data]);
      setNewCategory('');
      setError('');
    } catch (error) {
      console.error('Error creating category:', error);
      setError('Failed to create category. Try again later.');
    }
    setLoading(false)
  };

  const handleDeleteClick = (categoryId) => {
    setId(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true)
    try {
      await axiosConfig.delete(`/admin/delete-category/${id}`);
      setCategories(categories.filter(category => category._id !== id));
      setId(null);
      setOpen(false);
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Failed to delete category. Try again later.');
      setOpen(false);
    }
    setLoading(false)
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F9F9F9]">
      <div className="lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px] flex justify-between">
        <div className="flex flex-col">
          <h2 className="p-3 border border-gray-300 border-solid w-fit font-[700] rounded text-[30px]">
            Blog Categories
          </h2>
          <div className="p-3 mt-4 border border-gray-300 rounded">
          {loading ? (<div>Loading....</div>):(
             
            categories.map((category) => (
              <div key={category._id} className="flex items-center justify-between mb-2 capitalize">
                {category.name}
                <IconButton onClick={() => handleDeleteClick(category._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </div>
            ))
          )}
         
          </div>
        </div>

        <div className="category-create">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className='px-3 py-2 border-2 rounded-md outline-none'
          />
          <button onClick={handleCategoryCreate} className='px-3 py-2 ml-3 rounded-md bg-lime-400'>Create Category</button>
          {error && <span className="error">{error}</span>}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div onClick={handleClose} color="primary" className='px-3 py-2 mr-3 rounded cursor-pointer hover:bg-lime-500 hover:text-white '>
            Cancel
          </div>
          <div onClick={handleConfirmDelete} color="error" autoFocus className='px-4 py-2 text-white bg-red-600 rounded cursor-pointer' >
            Delete
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlogCategory;
