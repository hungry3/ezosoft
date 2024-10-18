import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DeleteIcon from '/src/assets/images/delete-icon.svg';
import EditIcon from '/src/assets/images/edit-icon.svg';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { axiosConfig } from '../../utils/axiosConfig';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 200,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const AllBlogsBody = () => {
  const [isError, seterror] =useState('')
  const [data1, setData] = useState([]);

  const getApiData =  async () => {
    try {
      const response = await axiosConfig.get('/blog/all');
      
     console.log(response.data.data,"response");
     
     
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      seterror(error.message)
    }
   
  }

  useEffect(()=>{
   getApiData()
  },[])

  const navigate =useNavigate()
  const location = useLocation();

  const [editId, setEditId] = useState(null); 
  const [editData, setEditData] = useState({ id: '', category: '', title: '' }); 

  const [selectedRows, setSelectedRows] = useState([]); 
  const [open, setOpen] = React.useState(false);

  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  console.log(selectedDeleteId,"selectedDeleteId")

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
      await axiosConfig.delete(`/blog/delete`, { data: { id: selectedDeleteId } });
      const updatedData = data1.filter((item) => item._id !== selectedDeleteId);
      
      setData(updatedData);
      console.log(data1);
      
      
      alert("deleted successfully")
      handleClose();
    } catch (error) {
      console.error('Error deleting the blog:', error);
   
    }
  };




  const conditionalRowStyles = [
    {
      when: (row, index) => {
        console.log(`Row index: ${index}`);
        return index % 2 !== 0;
      },
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    {
      when: (row, index) => index % 2 === 0,
      style: {
        backgroundColor: 'white',
      },
    },
  ];
  
  

  // Handle delete action
  const handleDeleteMultiple = () => {
    const updatedData = data1.filter(item => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]);
  };
  const handleSelectedRows = (state) => {
    setSelectedRows(state.selectedRows.map(row => row.id));
  };
  


   useEffect(() => {
    if (location.state && location.state.updatedRow) {
      const updatedRow = location.state.updatedRow;

      setData((prevData) =>
        prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
    }
  }, [location.state]);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
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
      cell: (row) => (
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
        </div>
      ),
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
      <div className=''>
      <div className='bg-[#F9F9F9] w-full'>
        <div className='lg:px-[70px] xl:px-[70px] px-[10px] pt-[53px] flex lg:flex-row xl:flex-row md:flex-row flex-col justify-between'>
          <p className='text-[25px] leading-[27px] font-semibold font-[Poppins]'>All  Blogs </p>
          <NavLink
            to='/addnewblogs'
            className='text-[18px] font-semibold text-white bg-grey px-[20px] py-[10px] rounded-xl hover:bg-blue ease-out duration-300 transition-all'
          >
            Add New Blogs
          </NavLink>
        </div>

        <div className='bg-white mx-[10px] lg:ml-[17px] xl:ml-[17px] mt-[33px] border border-[#D9D9D9] rounded-lg'>
          <div className='mt-[33px] lg:mx-[50px] xl:mx-[50px] mx-[10px] lg:px-[47px] xl:px-[47px] px-[10px] pt-[25px] pb-[41px] border border-[#D9D9D9] bg-[#F9F9F9] rounded-lg flex lg:flex-row xl:flex-row md:flex-row flex-col gap-[30px] justify-between items-center'>
            <div className='flex flex-col max-w-[357px] w-full'>
              <label htmlFor='category' className='text-[16px] font-[Poppins] leading-[24px] font-[400]'>
                Search by category
              </label>
              <select className='pl-[10px] pr-[15px] py-[10px] bg-white rounded-lg border border-[#D9D9D9]'>
                <option selected disabled>Search here</option>
                <option value='template'>Template</option>
                <option value='documentation'>Document</option>
                <option value='presentation'>Presentation</option>
                <option value='freeTemplate'>Free Template</option>
              </select>
            </div>

            <div className='flex flex-col max-w-[357px] w-full'>
              <label htmlFor='title' className='text-[16px] font-[Poppins] leading-[24px] font-[400]'>
                Search by Title
              </label>
              <select className='pl-[10px] pr-[15px] py-[10px] bg-white rounded-lg border border-[#D9D9D9]'>
                <option disabled selected>Search here</option>
                <option value='template'>Template</option>
                <option value='documentation'>Document</option>
                <option value='presentation'>Presentation</option>
                <option value='freeTemplate'>Free Template</option>
              </select>
            </div>

            <div className='mt-[15px]'>
              <button className='text-[18px] font-[500] font-[Poppins] leading-[27px] px-[44px] py-[9px] bg-grey hover:bg-blue text-white rounded-lg text-center'>
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

         <div className='flex items-end justify-end mr-[20px]  lg:mr-[50px] mt-[20px]'><button onClick={handleDeleteMultiple}>Delete Multiple</button></div>

          <div className='mt-[10px] lg:mx-[50px] xl:mx-[50px] md:mx-[30px]   border border-[#D9D9D9] bg-[#F9F9F9] rounded-xl flex flex-col gap-[30px] '>
         
        
         <div className='max-w-full rounded-xl'>
          <DataTable
          //  className="custom-data-table"
           columns={columns} 
           data={data1} 
           selectableRows 
           fixedHeader 
           pagination
           responsive
           selectableRowsHighlight
           highlightOnHover
           onSelectedRowsChange={handleSelectedRows}
            // conditionalRowStyles={ conditionalRowStyles}
           
             />
            {isError !=='' && <p>{isError}</p>}
          </div>
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AllBlogsBody;
