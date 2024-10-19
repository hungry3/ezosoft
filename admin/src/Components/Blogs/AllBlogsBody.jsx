  import React, { useState, useEffect } from 'react';
  import { NavLink, useNavigate, useLocation } from 'react-router-dom';
  import DataTable from 'react-data-table-component';
  import DeleteIcon from '/src/assets/images/delete-icon.svg';
  import EditIcon from '/src/assets/images/edit-icon.svg';
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import Modal from '@mui/material/Modal';
  import { axiosConfig } from '../../utils/axiosConfig';
  import GlobalLoader from '../../utils/GlobalLoader';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };



  const AllBlogsBody = () => {
    const [isError, seterror] =useState('')
    const [data1, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [editId, setEditId] = useState(null); 
    const [editData, setEditData] = useState({ id: '', category: '', title: '' }); 
    const [statusAction, setStatusAction] = useState('');
    const [selectedRows, setSelectedRows] = useState([]); 
    const [open, setOpen] = React.useState(false);
    const [statusPopupOpen, setStatusPopupOpen] = useState(false);
    const [selectedStatusId, setSelectedStatusId] = useState(null);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [categories,setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredData,setFilteredData] = useState([]);
    const [openDeleteMultipleModal, setOpenDeleteMultipleModal] = useState(false);
    const axiosPrivate = useAxiosPrivate()
    const getApiData =  async () => {
      setLoading(true)
      try {
        const response = await axiosPrivate.get('/blog/admin-all');
        
      console.log(response.data.data,"response");
        setData(response?.data?.data || []);
        setFilteredData(response?.data?.data || []);
      } catch (error) {
        setLoading(false)
        console.error('Error fetching data:', error);
        seterror(error.message)
        toast.error('Something went Wrong.Please Try again later')
      }
      setLoading(false)
    }
    
    useEffect(()=>{
    getApiData()
    },[statusAction])

    const navigate =useNavigate()
    const location = useLocation();


    useEffect(() => {
      const fetchCategories = async () => {
      
        try {
          const { data } = await axiosPrivate.get('/admin/blog-categories');
          setCategories(data?.data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
     
      };
  
      fetchCategories();
    }, []);
   


    const handleCategoryChange = (e) => {
      const selectedValue = e.target.value;
      if (selectedValue === "Search here") {
        setSelectedCategory('');
        setFilteredData(data1);  
      } else {
        setSelectedCategory(selectedValue);
      }
    };
  
    const handleTitleChange = (e) => {
      setSearchTitle(e.target.value);
    };
  
    const handleSearch = () => {
      if (!selectedCategory==='' && !searchTitle) {
       
        setFilteredData(data1);
        return;
      }
  
      const filteredData = data1.filter((item) => {
        const isCategoryMatch = selectedCategory ? item.category === selectedCategory : true;
        const isTitleMatch = searchTitle ? item.title.toLowerCase().includes(searchTitle.toLowerCase()) : true;
        return isCategoryMatch && isTitleMatch;
      });
  
      setFilteredData(filteredData);
    };
    

    const handleOpen = (id) => {
      setSelectedDeleteId(id); 
      setOpen(true);
    };
    
    const handleClose = () => {
      setSelectedDeleteId(null); 
      setOpen(false);
    };

    const handleDelete = async () => {
      try {
        await axiosPrivate.delete(`/blog/delete`, { data: { id: selectedDeleteId } });
        const updatedData = data1.filter((item) => item._id !== selectedDeleteId);
       
        setData(updatedData);
        console.log(data1);
      toast.success("Blog Deleted Successfuly")
        handleClose();
      } catch (error) {
        console.error('Error deleting the blog:', error);
    
      }
    };
    

    const handleSelectedRows = (state) => {
      setSelectedRows(state.selectedRows.map(row => row._id));
    };
    
  console.log(selectedRows,"selected rows")
    useEffect(() => {
      if (location.state && location.state.updatedRow) {
        const updatedRow = location.state.updatedRow;

        setData((prevData) =>
          prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
        );
      }
    }, [location.state]);



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

    const handleDeleteMultiple = async () => {
      try {
        await axiosPrivate.delete('/blog/delete-multiple', {
          data: { ids: selectedRows },
        });
        
        
        const updatedData = data1.filter(item => !selectedRows.includes(item._id));
        setData(updatedData);
        setFilteredData(updatedData); 
        setSelectedRows([]); 
        toast.success("Selected blogs deleted successfully.");
        
        handleCloseDeleteMultipleModal(); 
      } catch (error) {
        console.error("Error deleting blogs:", error);
        toast.error("Failed to delete selected blogs.");
      }
    };


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditData({ ...editData, [name]: value });
    };


    const handleOpenStatusPopup = (row) => {
      
      
      const status = row.status === 'active' ? 'inactive' :'active';
      console.log("status>>>>>>>>>",status);
      setSelectedStatusId(row._id);
      setStatusAction(status);
      console.log("statusAction");
      
      setStatusPopupOpen(true);
    };


    
  
    const handleCloseStatusPopup = () => {
      setSelectedStatusId(null);
      setStatusAction('');
      setStatusPopupOpen(false);
    };

    



    const handleStatusChange = async () => {
      try {
        const url = `/blog/${selectedStatusId}/status`;
        const status = statusAction

        console.log("statussdfjk;",status);
        
      const response =   await axiosPrivate.patch(url,{status:status});
      console.log(response)
    
        console.log("statusAction>>>>>>", statusAction);
        
      
        
        toast.success(`Blog ${statusAction === 'active' ? 'Activated' : 'Deactivated'} Successfully`);
        handleCloseStatusPopup();
      } catch (error) {
        console.error('Error changing blog status:', error);
        toast.error('Failed to change status.');
      }
    };
    // Define table columns
    const columns = [
      {
        name: '#',
        selector: (row,index) => index+1,
        sortable: false,
        width: '6%',
      },


      {
        name: (
          <div className='w-full font-bold text-start'></div>
        ),
        selector: (row) =>
            <NavLink to={`/blog/single/${row._id}`}>
            <div className='flex' >
              <img
                src={row.image}
                alt='Table Item'
                style={{ width: '56px', height: '26px', marginRight: '10px',borderRadius:"5px" }} 
              />
            
            </div>
              </NavLink>
          ,
          width: '100px',
      },
    
      {
        name: (
          <div className='w-full font-bold text-start'>Title</div>
        ),
        selector: (row) =>
        
          
            <NavLink to={`/blog/single/${row._id}`}>
            <div className='flex' >
              
              <div className='flex items-start'>{row.title}</div>
            </div>
              </NavLink>
          ,
        sortable: true,
        width: '400px',
        
      },
      
      {
        name: (<div className='font-bold'>Catrgory</div>),
        selector: (row) =>
          editId === row.id ? (
            <input
              type='text'
              name='category'
              value={editData.category}
              onChange={handleInputChange}
              className='p-2 border border-red-400 rounded'
            />
          ) : (
            row.category
          ),
        sortable: true,
        width: '200px',
      },

      {
        name: (<div className='font-bold'>Author</div>),
        selector: (row) =>
          editId === row.id ? (
            <input
              type='text'
              name='category'
              value={editData.author}
              onChange={handleInputChange}
              className='p-2 border border-red-400 rounded'
            />
          ) : (
            row.author
          ),
        sortable: true,
        width: '200px',
      },
      {
        name: (<div className='font-bold'>Actions</div>),
        cell: (row) => {

         
          // console.log(row.status);
          
          return(
            <div className='flex gap-2'>
            <NavLink to={`/blog/edit/${row._id}`}>
              <img
                src={EditIcon}
                alt='edit'
                className='cursor-pointer'
              />
            </NavLink>
              <img
                src={DeleteIcon}
                alt='delete'
                className='cursor-pointer'
                onClick={() => handleOpen(row._id)}
              />
  
              <button
              className='flex items-center gap-1 text-blue-500 hover:text-blue-700'
              onClick={() => handleOpenStatusPopup(row )}
            >
              {statusAction ==="inactive" || row.status  === 'inactive' ? (
                <>
                  <RemoveCircleIcon fontSize='small' /> 
                </>
              ) : (
                <>
                  <CheckCircleIcon fontSize="small" /> 
                </>
              )}
            </button> 
            </div>
          )
         
        },
        width: '100px',
      },
    ];
    


      // Conditional Row Styles
      // const conditionalRowStyles = [
      //   {
      //     when: (row, index) => {
      //       // console.log(`Row: ${row}, Index: ${index}`);
      //       return index % 2 === 0; 
      //     },
      //     style: {
      //       backgroundColor: 'black',
      //       color: '#000',
      //     },
      //   },
      // ];
      
      
    return (
      <>
       <ToastContainer/>
        <div className=''>
        <div className='bg-[#F9F9F9] w-full'>
          <div className='lg:px-[70px] xl:px-[70px] px-[10px] pt-[53px] flex lg:flex-row xl:flex-row md:flex-row flex-col justify-between'>
            <p className='text-[25px] leading-[27px] font-semibold font-[Poppins]'>All  Blogs </p>
            <NavLink
              to='/addnewblogs'
              className='text-[18px] font-semibold text-white bg-grey px-[20px] py-[10px] rounded-xl hover:bg-blue ease-out duration-300 transition-all'
            >
              Add New Blog
            </NavLink>
          </div>

          <div className='bg-white mx-[10px] lg:ml-[17px] xl:ml-[17px] mt-[33px] border border-[#D9D9D9] rounded-lg'>
                <div className='mt-[33px] lg:mx-[50px] xl:mx-[50px] mx-[10px] lg:px-[47px] xl:px-[47px] px-[10px] pt-[25px] pb-[41px] border border-[#D9D9D9] bg-[#F9F9F9] rounded-lg flex lg:flex-row xl:flex-row md:flex-row flex-col gap-[30px] justify-between items-center'>
                  <div className='flex flex-col max-w-[357px] w-full'>
                    <label htmlFor='category' className='text-[16px] font-[Poppins] leading-[24px] font-[400]'>
                      Search by category
                    </label>
                    <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                     className='pl-[10px] pr-[15px] py-[10px] bg-white rounded-lg border border-[#D9D9D9]'>
                      <option selected >Search here</option>
                      {categories && categories.map((category)=>(
                        <option key={category._id} value={category.name}>{category.name}</option>
                      ))}
                      
                    
                    </select>
                  </div>

                  <div className='flex flex-col max-w-[357px] w-full'>
                    <label htmlFor='title' className='text-[16px] font-[Poppins] leading-[24px] font-[400]'>
                      Search by Title
                    </label>
                    <input
                     value={searchTitle}
                     onChange={handleTitleChange}
                     type='text' className='pl-[10px] pr-[15px] py-[10px] bg-white rounded-lg border border-[#D9D9D9]'/>
                    
                    
                  </div>

                  <div className='mt-[15px]'>
                    <button
                    onClick={handleSearch} 
                    className='text-[18px] font-[500] font-[Poppins] leading-[27px] px-[44px] py-[9px] bg-grey hover:bg-blue text-white rounded-lg text-center'>
                      Search
                    </button>
                  </div>
                </div>

            {/*  delete multiple  */}
            <Modal
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
        </Modal>

          <div className='flex items-end justify-end mr-[20px]  lg:mr-[50px] mt-[20px]'><button onClick={handleOpenDeleteMultipleModal}>Delete Multiple</button></div>

            <div className='mt-[10px] lg:mx-[50px] xl:mx-[50px] md:mx-[30px]   border border-[#D9D9D9] bg-[#F9F9F9] rounded-xl flex flex-col gap-[30px] '>
          
          
          <div className='max-w-full rounded-xl'>
          {loading ? (<div><GlobalLoader/></div>) :(
            <DataTable
            className="custom-data-table"
            columns={columns} 
            data={filteredData} 
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
          </div>
        </div>
        </div>


          {/* Status Change Modal */}
      <Modal open={statusPopupOpen} onClose={handleCloseStatusPopup}>
        <Box sx={style}>
          <Typography variant="h6">Confirm {statusAction === 'active' ? 'Activation' : 'Deactivation'}</Typography>
          <Typography sx={{ mt: 2 }}>Do you want to {statusAction === 'active' ? 'deactivate ' : 'activate'} this blog?</Typography>
          <div className='flex justify-end gap-4'>
            <button className='px-4 py-2 text-white rounded-md bg-grey hover:bg-blue' onClick={handleCloseStatusPopup}>Cancel</button>
            <button className='px-4 py-2 text-white rounded-md bg-grey hover:bg-blue' onClick={handleStatusChange}>Yes</button>
          </div>
        </Box>
      </Modal>

       {/* Modal for deleting multiple blogs */}
       <Modal
  open={openDeleteMultipleModal} // Ensure this is hooked to the correct state
  onClose={handleCloseDeleteMultipleModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box sx={style}>
    <Typography id="modal-title" variant="h6">
      Confirm Deletion
    </Typography>
    <Typography id="modal-description" sx={{ mt: 2 }}>
      Are you sure you want to delete the selected blogs?
    </Typography>
    <div className='flex justify-end gap-4 mt-4'>
      <button className='px-4 py-2 text-white rounded-md bg-grey hover:bg-blue' onClick={handleCloseDeleteMultipleModal}>
        Cancel
      </button>
      <button className='px-4 py-2 text-white rounded-md bg-grey hover:bg-blue' onClick={handleDeleteMultiple}>
        Yes, Delete
      </button>
    </div>
  </Box>
</Modal>

       
      </>
    );
  };

  export default AllBlogsBody;
