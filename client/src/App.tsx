import React, { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
import Notes from './components/Notes';
import { getRandomColor } from './utils/common';
import axios from 'axios';
import { NotesDto } from './types';
import { getTokenFromLocalStorage, getUserFromLocalStorage } from './utils/token';

function App() {
  const [getNotes, setgetNotes] = useState<NotesDto[]>([])
  const [token, setToken] = useState(getTokenFromLocalStorage())

  useEffect(()=>{
  const getNotes = async () => {
    try {
      let createApi='getNotes';
      if(token){
        createApi = `getUserNotes`

      }
      const results = await axios( {
        url: `api/notes/${createApi}`,
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    })
      setgetNotes(results.data.data)
    } catch (error) {
      alert(error)
    }
  }
  getNotes()

return () => {
  setgetNotes([])
}

  },[token])


  return (
    <div>
      <Navbar />

      {/* notes */}
      <div className='mt-20 mb-10 px-10'>
        <div className='grid grid-cols-3 gap-10'>
          {getNotes && getNotes?.map((item, index) => {
            return <Notes notes={item}  key={index} color={getRandomColor()} />
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
