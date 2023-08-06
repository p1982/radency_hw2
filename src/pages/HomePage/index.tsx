import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { GetNotes } from '../../action/NotesAction/NotesAction';
import { NotesList } from '../../components/NotesList';
import { ToggleModal } from '../../action/ModalAction/ModalAction';
import Button from "../../components/Common/Button"
import { useSelector } from 'react-redux';
import { Modal } from '../../components/Common/Modal';
import { RootStore } from '../../Store';

//create home page
export const HomePage = () => {
  //variables
  const dispatch = useDispatch()

  //useselectors
  const isOpen = useSelector((state: RootStore) => state.modal.isOpen)
  const modalId = useSelector((state: RootStore) => state.modal.data?.modalId)

  //useeffects
  useEffect(() => {
    const init = async () => {
      dispatch(GetNotes())
    }
    init()
  }, [dispatch])

  //render
  return (
    <main>
      <div className="container max-w-[1200px] mx-auto my-0">
        <NotesList configId="notes" />
        <section className='text-right my-3'>
          <Button onClick={() => dispatch(ToggleModal({ modalId: "createModal" }))} configId="createNotesModal" />
        </section>
        <NotesList configId="stats" />
        <NotesList configId="archive" />
      </div>
      {isOpen && <Modal configId={modalId} />}
    </main>

  )
}
