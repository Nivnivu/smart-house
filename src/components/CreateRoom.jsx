import React, { useState, useContext } from 'react'
import { RoomsContext } from '../contextApi'
import {Link} from 'react-router-dom'


const CreateRoom = () => {

    const {addRoom,setRoomType,setRoomName,setRoomColor,errorMessage, setErrorMessage, setScreen} = useContext(RoomsContext)



  return  (


      <div className='room'>
       <select name="rooms" id="rooms"  required onChange={(e) => {setRoomType(e.target.value)}}>
       <option value="Pick A Room">Pick A Room</option>
        <option value="Living Room">Living Room</option>
        <option value="Toilet">Toilet</option>
         <option value="Bathroom">Bathroom</option>
         <option value="Office">Office</option>
         <option value="Bedroom">Bedroom</option>
        </select>


       <br />
       <input type="text" placeholder='Room Name' maxlength="5"  onChange={(e) => {setRoomName(e.target.value)}} />
       <br />
       <label for="color">Pick a color:  </label>
       <input type="color" id="color" onChange={(e) => {setRoomColor(e.target.value)}} />
       <br />
       <button className='addRoomBtn' onClick={() => {addRoom(); setRoomName(''); setRoomColor(''); setRoomType('');}}>Add Room</button>
       {<div className="error"> {errorMessage} </div>}
       <Link to={'/'}>
      <button onClick={() => {setErrorMessage(''); setScreen(0)}}>HomePage</button>
    </Link>
       </div> 
  )

}

export default CreateRoom