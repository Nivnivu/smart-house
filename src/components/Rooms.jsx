import React ,{useContext} from 'react'
import {Link} from 'react-router-dom'
import { RoomsContext } from '../contextApi'




function Rooms(props) {



  const {rooms,setScreen, setErrorMessage} = useContext(RoomsContext)

  const roomChecker = () => {
    if (rooms.length === 0) {
        return (
            <h2>Click To Add First Room</h2>
        )
    }
    return (
        <h2>Pick a Room</h2>
    )
}


  return (
    <div>
    <div className='container'>
        {rooms.map((item, index )=> (
            <Link key={index}  to={`/rooms/${item.name}`}>
            <div className='item' style={{ backgroundColor: `${item.color}` }} onClick={() => {setErrorMessage('')}}>
            <h2>{item.name}</h2>
            <h3>{item.type}</h3>
           
        </div>
        </Link>
        ))}
        
        
    </div>
    {roomChecker()}
    <button className='addBtn' onClick={() => {setScreen(1)}}>+</button>
    </div>
  )
}

export default Rooms