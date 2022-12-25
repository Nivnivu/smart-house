import './App.css';
import React, {useState, useEffect} from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/pages/HomePage.jsx'
import Room from './components/pages/Room'
import { useParams } from 'react-router-dom';
import { RoomsContext } from './contextApi'


function App() {

  let { userId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [screen, setScreen] = useState(0);
  const [roomType, setRoomType] = useState('');
  const [roomName, setRoomName] = useState('');
  const [roomColor, setRoomColor] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [devices, setDevices] = useState(["TV","Lamp","Boiler","Stero sound system","A/C","Heater","Blinds"]);



  
  const addRoom = () => {
    if (rooms.find(room => room.name === roomName) != undefined){
      setErrorMessage("Room name allready exist !");

    } else if (roomType === "" || roomName === "" || roomColor === '' ) {
      setErrorMessage("One Or More Values Are Empty !")
 
    } else {
      setIndex(index + 1);
      setScreen(0);
      setRooms(current => [...current,{id: index, type: roomType, name: roomName, color: roomColor , devices: [] }]);


    } 
     
}
useEffect(() => {
  setErrorMessage('')
}, [roomName,roomType,roomColor]);


  console.log(rooms.find(room => room.name === roomName))

  return (
    <div className="App">
     <RoomsContext.Provider value={{userId,addRoom, setDevices,devices,rooms,setRooms,screen,setScreen,roomType,setRoomType,roomName,setRoomName,roomColor,setRoomColor,errorMessage,setErrorMessage,index,setIndex}}>
     <Header />
        <HashRouter>
          <Routes>

          <Route path='/' element={<HomePage/>}/>
            <Route path="/rooms/:userId" element={<Room/>}/>
            
          </Routes>
        </HashRouter>
        </RoomsContext.Provider>
    </div>
  );
}

export default App;
