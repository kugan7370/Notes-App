import React, { useState } from 'react'
import { NotesDto } from '../types'
import { getUserFromLocalStorage } from '../utils/token'
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import axios, { AxiosError } from 'axios';
import CreateModal from './CreateModal';

interface colorProps {
    color: string,
    notes: NotesDto
}

function Notes({ color, notes }: colorProps) {
    const [User, setUser] = useState(getUserFromLocalStorage())
    const [isCreateOpen, setIsCreateOpen] = useState(false);


    let text = notes.text
    text.length > 150 ? text = text.slice(0, 100) + '...' : text


    const newDate = new Date(notes.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    })

    const handleRemove = async () => {
        const confirm = window.confirm('Are you sure you want to delete this note?')
        if (confirm) {
            try {
                const results = await axios({
                    url: `api/notes/delete/${notes._id}`,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                console.log(results);
                if (results.status === 200 || results.status === 201) {
                    const message = results?.data?.message
                    if (message) {
                        alert(message)
                    }
                    window.location.reload()
                }
            } catch (error: unknown) {
                if (error instanceof AxiosError && error.response) {
                    alert(error.response.data.message)
                } else {
                    alert(error instanceof Error ? error.message : 'Unknown error')
                }
            }

        }

    }



    return (
        <>
        <div className="w-[400px] h-auto rounded-lg p-4" style={{ backgroundColor: color }}>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-lg capitalize'>{notes.title}</h1>
                {User && User._id === notes.userId && <div className="flex">
                    <BiEdit onClick={()=>setIsCreateOpen(true)} className="text-2xl text-red-800 cursor-pointer mr-2" />
                    <MdDeleteForever onClick={handleRemove} className="text-2xl text-red-800 cursor-pointer" />
                </div>}

            </div>
            <p className="text-base text-gray-900 mt-5 text-justify">{text}</p>
            {/* username and data */}
            <div className="flex justify-between mt-5">
                <p className='text-gray-800 text-xs font-semibold'>{newDate}</p>
                {notes.name && <p className='font-semibold text-base'>--{notes.name}</p>}
            </div>

        </div>
        <CreateModal isCreateOpen={isCreateOpen} onCreateClose={() => setIsCreateOpen(false)} updateData={notes} />

        </>
    )
}

export default Notes