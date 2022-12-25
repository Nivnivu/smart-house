import React, { useState, useContext } from 'react'
import CreateRoom from '../CreateRoom'
import Rooms from '../Rooms'
import { RoomsContext } from '../../contextApi';


function HomePage(props) {

    const {screen} = useContext(RoomsContext)
    
 
    const changeScreen = () => {
        return (screen == 0 ? <Rooms/> : <CreateRoom />)
    }




  return (
    <div className='container'>
        {changeScreen()}
    </div>
  )
}

export default HomePage