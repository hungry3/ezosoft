

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '/src/assets/images/delete-icon.svg';
import EditIcon from '/src/assets/images/edit-icon.svg';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { toast, ToastContainer } from 'react-toastify';
import { Global } from '@emotion/react';
import GlobalLoader from '../../utils/GlobalLoader';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const BlogCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [selectedRows, setSelectedRows] = useState([]); 
  const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false);

  const [originalCategories, setOriginalCategories] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data } = await axiosPrivate.get('/admin/blog-categories');
        setCategories(data?.data);
        setOriginalCategories(data?.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      setLoading(false);
    };

    fetchCategories();
  }, [axiosPrivate]);

  const handleCategoryCreate = async () => {
    if (!newCategory) {
      toast.error('Category name is required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosPrivate.post('/admin/create-category', { name: newCategory });
      setCategories((prevCategories) => [...prevCategories, data?.data]);
      setNewCategory('');
     
      setOpenModal(false);
      toast.success("new Category Created Successfully")
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category. Try again later.');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosPrivate.delete(`/admin/delete-category/${selectedDeleteId}`);
      setCategories(categories.filter((category) => category._id !== selectedDeleteId));
      setSelectedDeleteId(null);
      setOpenDeleteDialog(false);
      toast.success("Category is Deleted Successfully")
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category. Try again later.');
    }
    setLoading(false);
  };


  const handleDeleteMultiple = async () => {
    setLoading(true);
    try {
      await axiosPrivate.post(`/admin/delete-multiple-categories`, { ids: selectedRows });
      setCategories(categories.filter((category) => !selectedRows.includes(category._id)));
      setSelectedRows([]);
      setOpenDeleteMultipleModal(false);
      toast.success('Selected categories deleted successfully.');
    } catch (error) {
      console.error('Error deleting multiple categories:', error);
      toast.error('Failed to delete categories. Try again later.');
    }
    setLoading(false);
  };

  const handleOpenDeleteMultipleModal = () => {
    if (selectedRows.length === 0) {
      toast.warn("No blogs selected.");
      return;
    }
    setOpenDeleteMultipleModal(true); 
  };
  



  const handleCloseDeleteMultipleModal = () => {
    setOpenDeleteMultipleModal(false);
  };

  
  const handleEditCategory = async () => {
    if (!editCategoryName) {
      toast.error('Category name is required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosPrivate.put(`/admin/edit-category/${selectedCategory._id}`, {
        name: editCategoryName,
      });
      setCategories(
        categories.map((cat) =>
          cat._id === selectedCategory._id ? { ...cat, name: data?.data.name } : cat
        )
      );
      setOpenEditDialog(false);
      setEditCategoryName('');
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error editing category:', error);
      toast.error('Failed to edit category. Try again later.');
    }
    setLoading(false);
  };

  const handleSelectedRows = (state) => {
    setSelectedRows(state.selectedRows.map(row => row._id));
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
  setSearchQuery(query);
  if (query === '') {
    setCategories(originalCategories); 
    return;
  }

  const filtered = categories.filter((category) =>
    category.name.toLowerCase().includes(query)
  );
  setCategories(filtered);
  };

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-4">
          <img
            src={EditIcon}
            alt="edit"
            className="cursor-pointer"
            onClick={() => {
              setSelectedCategory(row);
              setEditCategoryName(row.name);
              setOpenEditDialog(true);
            }}
          />
          <img
            src={DeleteIcon}
            alt="delete"
            className="cursor-pointer"
            onClick={() => {
              setSelectedDeleteId(row._id);
              setOpenDeleteDialog(true);
            }}
          />
        </div>
      ),
      width: '200px',
    },
  ];

  return (<>
    <ToastContainer/>
    <div className="flex flex-col h-full w-full bg-[#F9F9F9]">
    
    <div className="lg:m-[40px] xl:m-[40px] md:m-[20px] flex items-center justify-between ">
      <h2 className="p-3   border-solid w-fit font-[600] rounded text-[24px]">
        Blog Categories
      </h2>
      <div
        className="text-[18px] font-semibold flex justify-end items-end text-white bg-grey px-[20px] py-[10px] rounded-xl hover:bg-blue ease-out duration-300 transition-all max-w-[200px] mt-[10px]"
        onClick={() => setOpenModal(true)}
      >
        Add New Category
      </div>
    </div>

    {/* <div className='flex items-end justify-end mr-[20px]  lg:mr-[50px] mt-[20px]'><button onClick={handleOpenDeleteMultipleModal}>Delete Multiple</button></div> */}
    
    <div className="lg:mx-[40px] xl:mx-[40px] md:mx-[20px] px-[40px] py-[40px] bg-white border rounded-md flex flex-col justify-between">
         
         <div className='bg-[#F9F9F9] my-[40px] px-[40px] py-[20px] flex gap-3 flex-wrap justify-center items-center rounded-lg border-2' >
        <div className='w-[80%] border rounded'><input type='text'
          value={searchQuery} 
          onChange={handleSearch}
         placeholder='Search here' className='w-full rounded-lg outline-none  px-[8px] py-[8px] pl-[20px]'/></div>
        <div
        className="text-[18px] font-semibold flex justify-end items-end text-white bg-grey px-[30px] py-[6px] rounded-lg cursor-pointer hover:bg-blue ease-out duration-300 transition-all"
       
      >
        Search
      </div>
          
         </div>
    
      <div className="flex flex-col w-full border rounded">
        {loading ? (
          <div><GlobalLoader/></div>
        ) : (
          <DataTable
            columns={columns}
            data={categories}
            selectableRows 
          fixedHeader 
          pagination                                       
          responsive
          selectableRowsHighlight
          highlightOnHover
          onSelectedRowsChange={handleSelectedRows}
          />
        )}
      </div>
    </div>

    {/* Modal for adding a new category */}
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Add New Category <span className='text-red-500 font-[700] text-[24px]'>*</span>
        </Typography>
        <div className="flex flex-col mt-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Enter new category"
            className="px-3 py-2 mb-4 border-2 rounded-md outline-none"
          />
          <div className='flex justify-end'>  <button onClick={handleCategoryCreate} className='flex items-center justify-end p-2 text-white rounded bg-blue '>
            Create Category
          </button></div>
         
        
        </div>
      </Box>
    </Modal>

    {/* Dialog for delete confirmation */}
    <Dialog
      open={openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Delete Category</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this category?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
        <Button onClick={handleDelete} color="primary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>

    {/* Dialog for editing a category */}
    <Dialog
      open={openEditDialog}
      onClose={() => setOpenEditDialog(false)}
      aria-labelledby="edit-dialog-title"
    >
      <DialogTitle id="edit-dialog-title">Edit Category</DialogTitle>
      <DialogContent>
        <input
          type="text"
          value={editCategoryName}
          onChange={(e) => setEditCategoryName(e.target.value)}
          placeholder="Edit category name"
          className="w-full px-4 py-2 mb-4 border-2 rounded-md outline-none"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
        <Button onClick={handleEditCategory} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>

          {/*  delete multiple  */}
          {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are You Sure?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete this item?
            </Typography>
          <div className='flex items-end justify-end gap-4'>
          <button className='mt-[10px] bg-grey py-2 px-4 rounded-md text-white text-[16px] hover:bg-blue' onClick={handleClose}>Cancel</button>
          <button className='mt-[10px] bg-grey py-2 px-4 rounded-md text-white text-[16px] hover:bg-blue' onClick={handleDelete}>Yes</button>
          </div>
          </Box>
        </Modal> */}

  
  </>
   
  );
};

export default BlogCategory;
