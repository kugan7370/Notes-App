import React from 'react'
import { NotesDto } from '../types'

interface colorProps {
    color: string,
    notes: NotesDto
}

function Notes({color,notes}: colorProps ) {
    let text = notes.text
    text.length > 200 ? text = text.slice(0, 100) + '...' : text

    return (
        <div className="w-[400px] h-auto rounded-lg p-4 " style={{backgroundColor:color}}>
            <h1 className='font-bold text-lg'>{notes.title}</h1>
            <p className="text-base text-gray-900 mt-5 text-justify">{text}</p>
        </div>
    )
}

export default Notes