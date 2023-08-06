import React, { FormEventHandler, useState, ChangeEventHandler } from 'react'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { ToggleModal } from '../../../action/ModalAction/ModalAction'
import { Input } from '../Input'
import { Select } from '../Select'
import { CreateNotes, EditNotes } from '../../../action/NotesAction/NotesAction'

//interface Forms
interface IFormNotes {
    name?: string;
    dates?: Array<Date>;
    content?: string;
    category?: string;
    id?: number;
    created?: Date;
    archive?: boolean
}

//create form
export const FormNotes: React.FC<IFormNotes> = ({ name: editName, dates: editDates, content: editContent, category: editCategory, id, created: editCreated, archive: editArchive }) => {
    //variables
    const dispatch = useDispatch()
    let dateOfNotes = (editDates && editDates[editDates.length - 1]) ? new Date(editDates[editDates.length - 1]).toISOString().substr(0, 10) : ""
    
    //states
    const [name, setName] = useState(editName || "")
    const [dates, setDates] = useState(dateOfNotes || "")
    const [content, setContent] = useState(editContent || "")
    const [category, setCategory] = useState(editCategory || "Task")
    
     //handlers
    const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setName(e.target.value)
    }
    const handleDatesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setDates(e.target.value)
    }
    const handleContentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setContent(e.target.value)
    }
    const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        setCategory(e.target.value)
    }
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if (!id) {
            dispatch(CreateNotes({ name, newDate: dates, content, category }))
        }
        if (id) {
            dispatch(EditNotes({
                name,
                content,
                category,
                id,
                created: editCreated,
                archive: editArchive,
                dates: editDates,
                newDate: dates,
            }))
        }
        dispatch(ToggleModal({ currentId: null, modalId: null }))
    }

    //render
    return (
        <form className='flex flex-col p-5 gap-4' onSubmit={handleSubmit}>
            <Input
                configId="name"
                onChange={handleNameChange}
                value={name}
            />
            <Input
                configId="date"
                onChange={handleDatesChange}
                value={dates}
            />
            <Input
                configId="content"
                onChange={handleContentChange}
                value={content}
            />
            <Select
                configId="notes"
                onChange={handleCategoryChange}
                value={category}
            />
            <div className='flex gap-4'>
                {id && <Button configId="editNotes" />}
                {!id && <Button configId="createNotes" />}
                <Button configId="cancel" onClick={() => dispatch(ToggleModal({ currentId: null, modalId: null }))} />
            </div>

        </form>
    )
}