import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from '../../Store';
import { NoteCard } from './NoteCard';


import { configNotesList } from './NoteCard/configNotes';
import Button from '../Common/Button';
import { ToggleModal } from '../../action/ModalAction/ModalAction';
import { archiveAllNotes, unarchiveAllNotes } from '../../action/NotesAction/NotesAction';
import { NoteStatsCard } from './NoteCard/NoteStatsCard';
//interface note list component
interface INotesList {
  configId: string;
}

//create note list component
export const NotesList: React.FC<INotesList> = ({ configId }) => {
  //variables
  const { text, className, id } = configNotesList[configId]
  const dispatch = useDispatch()

  // useselectors
  const archive = useSelector((state: RootStore) => Object.values(state.notes?.archive ?? {}))
  const unarchive = useSelector((state: RootStore) => Object.values(state.notes?.unarchive ?? {}))
  const stats = useSelector((state: RootStore) => Object.values(state.notes?.stats ?? {}))

  //renders
  return (
    <section>
      {id}
      <ul>
        <div className='mb-2 flex bg-sky-500 h-[50px] text-center'>
          {text.map((item, index) => (
            <p key={item} className={className[index]}>{item}</p>
          ))}
          {configId === "notes" && !!unarchive.length && <Button configId="archivAllNotes" onClick={() => dispatch(archiveAllNotes())} />}
          {configId === "archive" && !!archive.length && <Button configId="archivAllNotes" onClick={() => dispatch(unarchiveAllNotes())} />}
          {configId === "notes" && !!unarchive.length && <Button configId="deleteNotesModal" onClick={() => dispatch(ToggleModal({ currentId: null, modalId: "deleteAllModal" }))} />}
          {configId === "archive" && !!archive.length && <Button configId="deleteNotesModal" onClick={() => dispatch(ToggleModal({ currentId: null, modalId: "deleteAllModal" }))} />}
        </div>
        {configId === "notes" && unarchive.map(note => (
          <NoteCard key={note.id} {...note} />
        ))}
        {configId === "stats" && stats.map(note => (
          <NoteStatsCard key={note.id} {...note} />
        ))}
        {configId === "archive" && archive.map(note => (
          <NoteCard key={note.id} {...note} />
        ))}
      </ul>
    </section>
  )
}
