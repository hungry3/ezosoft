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



const UserBody = () => {
  const [isError, setError] = useState('')
  const [data1, setData] = useState([
    // { _id: '1', fullName: 'John Snow', company:'company name here',example: 'example@email.com', number:'123 456 7890', user:'04',subscription:'free trial'},
    // { _id: '2', fullName: 'John Snow', company:'company name here',example: 'example@email.com', number:'123 456 7890', user:'04',subscription:'monthly'   },
    // { _id: '3', fullName: 'John Snow', company:'company name here',example: 'example@email.com', number:'123 456 7890', user:'04',subscription:'yearly'    },
    // { _id: '4', fullName: 'John Snow', company:'company name here',example: 'example@email.com', number:'123 456 7890', user:'04',subscription:'free trial'},
    // { _id: '5', fullName: 'John Snow', company:'company name here',example: 'example@email.com', number:'123 456 7890', user:'04',subscription:'monthly'   },
    // { _id: '6', fullName: 'John Snow', company:'company name here',example: 'example@email.com', number:'123 456 7890', user:'04',subscription:'yearly'    },
  ]);

  const getApiData = async () => {
    try{
    const response = await axios.get('https://ezosoft-server.vercel.app/api/admin/all-users'
   
    
    )
    console.log(response?.data?.statusCode)
    // setData(response.data)
    setData(response?.data?.statusCode)
    }catch{
      (error) =>{
        console.log('kaka API fetch nhi ho rhi',error)
        setError(error.message)
      }
    }
  }

  useEffect(()=>{
   getApiData()
  },[])
  const navigate =useNavigate()
  const location = useLocation();

  const [editId, setEditId] = useState(null); // Track which row is being edited
  const [editData, setEditData] = useState({ _id: '', category: '', title: '' }); // Track the data to be edited
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows for multiple delete
  const [open, setOpen] = React.useState(false);

  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const handleOpen = (_id) => {
    setSelectedDeleteId(_id); // Store the _id of the row to be deleted
    setOpen(true);
  };
  
  const handleClose = () => {
    setSelectedDeleteId(null); // Reset the _id
    setOpen(false);
  };
  // Handle delete action
  const handleDelete = () => {
    
   
      const updatedData = data1.filter((item) => item._id !== selectedDeleteId);
      setData(updatedData);
      handleClose()
   
  };



  

  // Handle delete action
// const handleDeleteMultiple = () => {
//   const updatedData = data1.filter((item) => !selectedRows.includes(item));
//   setData(updatedData);
//   setSelectedRows([]); // Clear selection after deletion
// };

   // Check if there's updated data passed via navigate
   useEffect(() => {
    if (location.state && location.state.updatedRow) {
      const updatedRow = location.state.updatedRow;
      
      // Update the data array with the new row values
      setData((prevData) =>
        prevData.map((row) => (row._id === updatedRow._id ? updatedRow : row))
      );
    }
  }, [location.state]);
  // Handle edit action
  const handleEdit = (row) => {
    console.log(row);
    
    // setEditId(row._id); // Set the row being edited
    // setEditData(row); // Set the current data to be edited
    navigate(`/edit/${row._id}`); // Pass the selected row as state
  };

const handleDeleteMultiple = () => {
  const updatedData = data1.filter(item => !selectedRows.includes(item._id));
  setData(updatedData);
  setSelectedRows([]); // Clear selection after deletion
};

const handleSelectedRows = (state) => {
  setSelectedRows(state.selectedRows.map(row => row._id));
};


  // Handle input change for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Handle save action
  const handleSave = () => {
    const updatedData = data1.map((item) =>
      item._id === editId ? editData : item
    );
    setData(updatedData); // Update the data with the edited row
    setEditId(null); // Exit edit mode
  };

  const handleSort = (columnKey) => {
    // Toggle sorting direction based on the current state
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
  
    // Perform sorting on the data based on the column and direction
    const sortedData = [...data].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) return direction === 'asc' ? -1 : 1;
      if (a[columnKey] > b[columnKey]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

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
  
  

  // Define table columns
  const columns = [
    {
      name: '#',
      selector: (row) => row._id,
      sortable: true,
      width: '6%',
    },
 
    {
      name: (
        <div className='font-bold '>Full Name</div>
      ),
      selector: (row) =>
        
          <input
            type='text'
            name='title'
            value={`${row.firstName} ${row.lastName}`}
            onChange={handleInputChange}
            className='text-inherit bg-inherit'
          />,
   
           
                 sortable: true,
      width: '15%',
      // This centers the content inside the column
    },
    
    {
      name:  (
        <div className='font-bold '>Company</div>
      ),
      selector: (row) =>
        
          <input
            type='text'
            name='category'
            value={row.company}
            onChange={handleInputChange}
            className='text-inherit bg-inherit'
          />,
      
      sortable: true,
      width: '15%',
    },

    {
      name:  (
        <div className='font-bold '>Email</div>
      ),
      selector: (row) =>
        
          <input
            type='text'
            name='category'
            value={row.email}
            onChange={handleInputChange}
            className='text-inherit bg-inherit'
          />
       ,
      sortable: true,
      width: '20%',
    },
    {
        name:  (
            <div className='font-bold '>Number</div>
          ),
        selector: (row) =>
          
            <input
              type='text'
              name='number'
              value={row.number}
              onChange={handleInputChange}
              className='text-inherit bg-inherit'
            />
         ,
        sortable: true,
        width: '10%',
      },
      {
        name:  (
            <div className='font-bold '>User</div>
          ),
        selector: (row) =>
          
            <input
              type='text'
              name='category'
              value={row.user}
              onChange={handleInputChange}
              className='text-inherit bg-inherit'
            />
         ,
        sortable: true,
        width: '8%',
      },
     
      {
        name:  (
            <div className='font-bold '>Subscription</div>
          ),
        selector: (row) =>
          
            <input
              type='text'
              name='subscriptiion'
              value={row.subcription}
              onChange={handleInputChange}
              className='text-inherit bg-inherit'
            />
          ,
        sortable: true,
        width: '10%',
      },
    {
      name:  (
        <div className='font-bold '>Actions</div>
      ),
      cell: (row) => (
        <div className='flex gap-2'>
          <img
            src={EditIcon}
            alt='edit'
            className='cursor-pointer'
            onClick={() => handleEdit(row._id)} // Navigate to edit page with selected row
          />
          <img
            src={DeleteIcon}
            alt='delete'
            className='cursor-pointer'
            onClick={() => handleOpen(row._id)}
          />
        </div>
      ),
      width: '6%',
    },
  ];
  



    
    
  return (
    <>
      <div className='bg-[#F9F9F9] w-full'>
        <div className='lg:mx-[70px] xl:mx-[70px] mx-[10px] mt-[53px] flex lg:flex-row xl:flex-row md:flex-row flex-col justify-between'>
          <p className='text-[25px] leading-[27px] font-semibold font-[Poppins]'>Users </p>
         
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

          <div className='mt-[33px] lg:mx-[50px] xl:mx-[50px] mx-[10px] lg:px-[47px] xl:px-[47px] px-[10px] pt-[25px] pb-[41px] border border-[#D9D9D9] bg-[#F9F9F9] rounded-lg flex flex-col gap-[30px] justify-between items-end'>
          

          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography _id="modal-modal-title" variant="h6" component="h2">
            Are You Sure?
          </Typography>
          <Typography _id="modal-modal-description" sx={{ mt: 2 }}>
           Do you want to delete this item?
          </Typography>
         <div className='flex items-end justify-end gap-4'>
         <button className='mt-[10px] bg-grey py-2 px-4 rounded-md text-white text-[16px] hover:bg-blue' onClick={handleClose}>Cancel</button>
         <button className='mt-[10px] bg-grey py-2 px-4 rounded-md text-white text-[16px] hover:bg-blue' onClick={handleDelete}>Yes</button>
         </div>
        </Box>
      </Modal>


         <button onClick={handleDeleteMultiple}>Delete Multiple</button>
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
          //  actions={<buttton onClick={handleDeleteMultiple}>Delet Multiple</buttton>}
            conditionalRowStyles={ conditionalRowStyles} />

            
          </div>
          {isError !=='' && <p>{isError}</p>}
        </div>
      </div>
    </>
  );
};

export default UserBody;
