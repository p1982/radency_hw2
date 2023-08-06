import React from 'react'
import { formatDateWithMonth, formatDate } from '../../../utils/utils'
import { configNotes } from './configNotes'
import Button from '../../Common/Button';
import { useDispatch } from 'react-redux';
import { ToggleModal } from '../../../action/ModalAction/ModalAction';
import { toggleArchiveOne } from '../../../action/NotesAction/NotesAction';

//interface Notecard componnent
interface INoteCard {
    id: number;
    name: string;
    created?: Date;
    category: string;
    content?: string;
    dates?: Array<Date>
}

// Create note card
export const NoteCard: React.FC<INoteCard> = ({ id, name, created, category, content, dates }) => {
    //variables
    const dispatch = useDispatch()
    const formatedDate: string | Date = (created) ? formatDateWithMonth(created) : new Date()
    const icon: React.ReactNode = configNotes[category]

    //render
    return (
        <li className='flex mb-2 min-h-[46px] bg-sky-500 grid-rows-1'>
            <div className='flex justify-center items-center w-10'>{icon}</div>
            <h6 className='flex justify-center items-center w-36'>{name}</h6>
            <p className='flex justify-center items-center w-60'>{formatedDate.toString()}</p>
            <p className='flex justify-center items-center w-60'>{category}</p>
            <p className='flex justify-center items-center w-60'>{content}</p>
            <ul className='flex justify-center flex-col items-center w-56'>
                {dates?.map((date: Date) => (
                    <li key={date.toString()}>
                        {formatDate(date)},
                    </li>))}
            </ul>
            <Button configId='editNotesModal' onClick={() => {
                dispatch(ToggleModal({ currentId: id, modalId: "editModal" }))
            }} />
            <Button configId='archivNotes' onClick={() => dispatch(toggleArchiveOne(id))} />
            <Button configId='deleteNotesModal' onClick={() => dispatch(ToggleModal({ currentId: id, modalId: "deleteModal" }))} />
        </li>
    )
}
