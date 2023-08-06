import React from 'react'
import { configNotes } from './configNotes'

//interface
interface INoteCard {
    id: string;
    archive: number;
    unarchive: number
}

//create note stats card
export const NoteStatsCard: React.FC<INoteCard> = ({ id, archive, unarchive }) => {
    //variables
    const icon: React.ReactNode = configNotes[id]

    //render
    return (
        <li className='flex mb-2 h-[46px] bg-sky-500 grid-rows-1'>
            <div className='w-10 flex justify-center align-center'>{icon}</div>
            <p className='w-36 flex justify-center items-center'>{id}</p>
            <p className='w-[32rem] flex justify-center items-center'>{unarchive}</p>
            <p className='w-[32rem] flex justify-center items-center'>{archive}</p>
        </li>
    )
}