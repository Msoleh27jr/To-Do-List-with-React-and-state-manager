import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAtom } from "jotai";
import { getData } from "./store";
import EditUser from "./components/Edit User/EditUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [addName , setAddName] = useState('')
  const [addAge , setAddAge] = useState('')
  const [addStatus , setAddStatus] = useState('false')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data , setData] = useAtom(getData)
  const [search , setSearch] = useState('')
  const [select , setSelect] = useState('all')

  function funDel(id){
    setData(data.filter((e)=> e.id != id))
  }
  function funCheck(id){
    setData(data.map((e)=> {
      if(e.id == id){
        e.status = !e.status
      }
      return e
    }))
  }
  function funAdd(){
    let newUser = {
      id : `${Date.now()}` ,
      name : addName , 
      age : addAge , 
      status : addStatus == "true" ? true : false
    }
    setData([...data , newUser])
    setAddAge('')
    setAddName('')
    setAddStatus('false')
  }
  const fakeData = data.filter((e)=> {
    let arr = []
    if(search){
      arr = e.name.toLowerCase().includes(search.toLowerCase())
    }
    if(select != 'all'){
      arr = e.status.toString() == select
    }
    return arr
  })
  return (
    <div>
      <div className="m-5 flex items-center gap-3">
      <button className="border-1 px-5 rounded-2xl" onClick={handleOpen}>add</button>
      <input type="text" placeholder="Search ..." className="border-b-1 outline-0" onChange={(e)=> setSearch(e.target.value)} value={search}/>
      <select className="border-1 rounded-2xl" value={select} onChange={(e)=> setSelect(e.target.value)}>
        <option value="all">All</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input className="border-b-1 my-3" type="text" placeholder="Add name" value={addName} onChange={(e)=> setAddName(e.target.value)}/>
            <input className="border-b-1" type="text" placeholder="Add age" value={addAge} onChange={(e)=> setAddAge(e.target.value)}/>
            <br />
            <select className="border-1 my-5" value={addStatus} onChange={(e)=> setAddStatus(e.target.value)}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            <br />
            <button onClick={()=> {
              funAdd()
              handleClose()
            }} className="border-1 px-4 bg-green-700 text-white">Save</button>
          </Typography>
        </Box>
      </Modal>
      <div className="p-5 flex flex-wrap gap-5">
      {
        fakeData.map((e)=> {
          return (
            <div key={e.id} className="flex flex-col justify-center items-center gap-2 w-[300px] rounded-2xl text-center h-[300px] shadow-2xl">
              <h1 className="text-2xl font-bold">{e.name}</h1>
              <h1 className="text-[20px]">{e.age}</h1>
              <input type="checkbox" onClick={()=> funCheck(e.id)} checked={e.status} />
              <button onClick={()=> funDel(e.id)} className="border-1 px-4 rounded-2xl">Delete</button>
              <EditUser elem={e}/>
            </div>
          )
        })
      }
      </div>
    </div>
  );
};

export default App;
