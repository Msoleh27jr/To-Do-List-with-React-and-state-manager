import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getData } from '../../store';
import { useAtom } from 'jotai';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  
  
  const EditUser = ({elem}) => {
    const [data , setData] = useAtom(getData)
    const [editName , setName] = useState('')
    const [editAge , setAge] = useState('')
    const [editStatus , setStatus] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function funEdit(){
        setData(data.map((e)=> {
            if(e.id == elem.id){
                e.name = editName
                e.age = editAge 
                e.status = editStatus == "true" ? true : false
            }
            return e
        }))
    }
  return (
    <div>
      <button className="border-1 px-5 rounded-2xl" onClick={()=> {
        setName(elem.name)
        setAge(elem.age)
        setStatus(elem.status ? "true" : "false")
        handleOpen()
      }}>Edit</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input className="border-b-1 my-3" type="text" value={editName} onChange={(e)=> setName(e.target.value)} placeholder='Edit Name'/>
            <input className="border-b-1 my-3" type="text" value={editAge} onChange={(e)=> setAge(e.target.value)} placeholder='Edit Name'/>
            <br />
            <select className="border-1 my-5" value={editStatus} onChange={(e)=> setStatus(e.target.value)}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
            </select>
            <br />
            <button onClick={()=> {
                funEdit()
                handleClose()
            }} className="border-1 px-4 bg-green-700 text-white">Edit</button>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default EditUser