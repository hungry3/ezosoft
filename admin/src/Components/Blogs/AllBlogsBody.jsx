import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import DeleteIcon from '/src/assets/images/delete-icon.svg';
import EditIcon from '/src/assets/images/edit-icon.svg';
import SaveIcon from '/src/assets/images/SaveIcon.svg';
import UpArrowicon from '/src/assets/images/dropdown-arrow.svg'
import DropDownArrow from '/src/assets/images/downwardarowicon.svg'
import TableImage from '/src/assets/images/table-image.svg'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

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
  const [data1, setData] = useState([
    // { id: '1', category: 'Template', title:  `Lorem ipsum is a placeholder text commonly used to.........`, image: TableImage    , author:'lorem ipsum'},
    // { id: '2', category: 'Presentation', title: 'Lorem ipsum is a placeholder text commonly used to.........', image: TableImage , author:'lorem ipsum'},
    // { id: '3', category: 'Template', title: 'Lorem ipsum is a placeholder text commonly used to.........' , image: TableImage    , author:'lorem ipsum'},
    // { id: '4', category: 'Presentation', title: 'Lorem ipsum is a placeholder text commonly used to.........' , image: TableImage, author:'lorem ipsum'},
    // { id: '5', category: 'Template', title: 'Lorem ipsum is a placeholder text commonly used to.........', image: TableImage     , author:'lorem ipsum'},
    // { id: '6', category: 'Presentation', title: 'Lorem ipsum is a placeholder text commonly used to.........' , image: TableImage, author:'lorem ipsum'},
  ]);

  const getApiData =  async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
     
      setData(response.data);
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

  const [editId, setEditId] = useState(null); // Track which row is being edited
  const [editData, setEditData] = useState({ id: '', category: '', title: '' }); // Track the data to be edited
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows for multiple delete
  const [open, setOpen] = React.useState(false);

  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const handleOpen = (id) => {
    setSelectedDeleteId(id); // Store the id of the row to be deleted
    setOpen(true);
  };
  
  const handleClose = () => {
    setSelectedDeleteId(null); // Reset the id
    setOpen(false);
  };
  // Handle delete action
  const handleDelete = () => {
    
   
      const updatedData = data1.filter((item) => item.id !== selectedDeleteId);
      setData(updatedData);
      handleClose()
   
  };


  // Handle delete action
  const handleDeleteMultiple = () => {
    const updatedData = data1.filter(item => !selectedRows.includes(item.id));
    setData(updatedData);
    setSelectedRows([]); // Clear selection after deletion
  };
  const handleSelectedRows = (state) => {
    setSelectedRows(state.selectedRows.map(row => row.id));
  };
  

   // Check if there's updated data passed via navigate
   useEffect(() => {
    if (location.state && location.state.updatedRow) {
      const updatedRow = location.state.updatedRow;
      
      // Update the data array with the new row values
      setData((prevData) =>
        prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
    }
  }, [location.state]);
  // Handle edit action
  const handleEdit = (row) => {
    // setEditId(row.id); // Set the row being edited
    // setEditData(row); // Set the current data to be edited
    navigate(`/edit/${row.id}`, { state: row }); // Pass the selected row as state
  };

  // Handle input change for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle save action
  const handleSave = () => {
    const updatedData = data1.map((item) =>
      item.id === editId ? editData : item
    );
    setData(updatedData); // Update the data with the edited row
    setEditId(null); // Exit edit mode
  };


  

  // Define table columns
  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
      sortable: true,
      width: '6%',
    },
    // {
    //   name: '',
    //   selector: (row) => (
    //     <img
    //       src={row.image} 
    //       alt='Table Item'
    //       style={{ width: '150px', height: '30px' }} // Adjust the size as needed
    //     />
    //   ),
    //   sortable: false,
    //   width: '15%',
    // },
    {
      name: (
        <div className='w-full font-bold text-center'>Title</div>
      ),
      selector: (row) =>
        editId === row.id ? (
          <input
            type='text'
            name='title'
            value={editData.title}
            onChange={handleInputChange}
            className='p-2 border border-red-400 rounded'
          />
        ) : (
          <div className='flex' >
            <img
              src={row.image}
              alt='Table Item'
              style={{ width: '100px', height: '50px', marginRight: '10px' }} // Adjust size and spacing
            />
            <div className='flex items-center'>{row.title}</div>
          </div>
        ),
      sortable: true,
      width: '50%',
      // This centers the content inside the column
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
      width: '15%',
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
      width: '15%',
    },
    {
      name: (<div className='font-bold'>Actions</div>),
      cell: (row) => (
        <div className='flex gap-2'>
          <img
            src={EditIcon}
            alt='edit'
            className='cursor-pointer'
            onClick={() => handleEdit(row.id)} // Navigate to edit page with selected row
          />
          <img
            src={DeleteIcon}
            alt='delete'
            className='cursor-pointer'
            onClick={() => handleOpen(row.id)}
          />
        </div>
      ),
      width: '6%',
    },
  ];
  


    // Conditional Row Styles
    const conditionalRowStyles = [
      {
        when: (row, index) => {
          console.log(`Row: ${row}, Index: ${index}`);
          return index % 2 === 0; // Check if the index is even
        },
        style: {
          backgroundColor: 'black',
          color: '#000',
        },
      },
    ];
    
    
  return (
    <>
      <div className=''>
      <div className='bg-[#F9F9F9] w-full'>
        <div className='lg:mx-[70px] xl:mx-[70px] mx-[10px] mt-[53px] flex lg:flex-row xl:flex-row md:flex-row flex-col justify-between'>
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

          <div className='mt-[33px] lg:mx-[50px] xl:mx-[50px] md:mx-[30px] lg:px-[47px] xl:px-[47px]  pt-[25px] pb-[41px] border border-[#D9D9D9] bg-[#F9F9F9] rounded-lg flex flex-col gap-[30px] '>
         
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

         <div className='flex items-end justify-end'><button onClick={handleDeleteMultiple}>Delete Multiple</button></div>
         <div className='max-w-full'>
          <DataTable
           columns={columns} 
           data={data1} 
           selectableRows 
           fixedHeader 
           pagination
           responsive
           selectableRowsHighlight
           highlightOnHover
           onSelectedRowsChange={handleSelectedRows}
            conditionalRowStyles={ conditionalRowStyles}  />
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
