import React, {useContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { RoomsContext } from '../../contextApi';



function Room() {


    const {devices,rooms,setRooms, errorMessage, setErrorMessage, setError} = useContext(RoomsContext)

    let {userId} = useParams();
    const thisRoom = rooms.find(item => item.name === userId)

    const [name, setName] = useState('');
    const [buttonId, setButtonid ] = useState(0);
    const [page, setPages] = useState(0);
    const [counter, setCounter] = useState(0);

    const addRoomDevice = () => {
        setRooms(current =>
          current.map((obj)=> {
            if (obj.name === userId) {
              return {...obj, devices: [...obj.devices, {name: name, switch: false, id: counter}]};
            }
            return obj;
          }),
        );
        setCounter(counter + 1)
      };

    const soundCheck = thisRoom.devices.find(item => item.name === "Stero sound system")
    
    const handleClick = () => {
      if (name === '') {
        setErrorMessage('You must choose a device !')
      } else if(soundCheck !== undefined && name === "Stero sound system"){
        setErrorMessage("Can't add more than 1 sound system !")
      }
       else if (thisRoom.devices.length > 4)  {
        setErrorMessage("Can't add more than 5 devices !")
      } else {
        addRoomDevice()
      }
    }
    
    


    const customDataList = () => {
        switch(thisRoom.type) {
            case "Living Room":
            case "Office":
            case "Bedroom":
                return <> 
                 <select name="devices" id="devices" onChange={(e)=>{setName(e.target.value)}}>
                 <option value="Device:">Device:</option>
                 <option value={devices[0]}> {devices[0]} </option>
                <option value={devices[1]}> {devices[1]} </option>
                <option value={devices[3]}> {devices[3]} </option>
                <option value={devices[4]}> {devices[4]} </option>
                <option value={devices[6]}> {devices[6]} </option>
            </select>
            <button className='addDeviceBtn' onClick={() => {handleClick(); setPages(0)}}>Add Device</button>
           
            </>
            case "Bathroom":
            case "Toilet":
                return<> 
                 <select name="devices" id="devices" onChange={(e)=>{setName(e.target.value)}}>
                 <option value="device">Device:</option>
                <option value={devices[1]}>{devices[1]}</option> 
                <option value={devices[2]}>{devices[2]} </option>
                <option value={devices[3]}> {devices[3]} </option>
                <option value={devices[5]}>{devices[5]} </option>
            </select>
            <button className='addDeviceBtn' onClick={() => {handleClick(); setPages(0)}}>Add Device</button>
            
            </>
        }
    }

    const HeadLine = () => {
        return (
            <>
            <h2>Room Name: {userId}</h2>
            <h3>Room Type: {thisRoom.type}</h3>
            </>
        )
    }

    
    const updateThisRoom = (index) => {
        setRooms((room) =>
          room.map((obj) => {
            if (obj.name === userId) {
              return {
                ...obj,
                devices: obj.devices.map((device) => {
                  if (device.id === index) {
                    return { ...device, switch: thisRoom.devices[index].switch ? false : true };
                  }
                  return device;
                })
              };
            }
            return obj;
          })
        );
      };

    const switchPages = () => {
        if (page === 0) {
            return (
                <>
        {thisRoom.devices.map(({name},index) =>
       <button style={{backgroundColor: thisRoom.devices[index].switch ? '#23C552' : ' #F84F31'}} className="devices" id={index} key={index} onClick={()=>{updateThisRoom(index)}} >{name}</button>)}
                    <br />
                  <div className='error'>{errorMessage}</div>  
                    <br />
                    <button className='addDeviceBtn' onClick={() => {setPages(1); setErrorMessage('')}}>Add a device</button>
                   
                    </>
            )
        } else {
            return (
                <>
             <span>{customDataList()}</span>
                </>
            )
        }
    }



  return (
    <div className='deviceDiv'>
     <HeadLine />
    {switchPages()}
    <br />
    <Link to={'/'}>
      <button onClick={() => setErrorMessage('')} className="homePgBtn">HomePage</button>
    </Link>
</div>  )
}

export default Room