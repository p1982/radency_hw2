import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import { ToggleModal } from '../../../action/ModalAction/ModalAction'
import { configModals } from './configModal'
import { FormNotes } from '../Form/FormNotes'
import { deleteAllNotes, deleteNote } from '../../../action/NotesAction/NotesAction'
import { RootStore } from '../../../Store'

//interface modal
interface IModal {
  configId: string | null | undefined
}

//create Modal
export const Modal: React.FC<IModal> = ({ configId }) => {
  //variables
  let title: string | undefined;
  let text: string | undefined;
  if (configId) {
    ({ title, text } = configModals[configId])
  }
  const dispatch = useDispatch()

  //useSelector
  const currentId: number | null | undefined = useSelector((state: RootStore) => state.modal.data?.currentId)
  const allNotes = useSelector((state: RootStore) => state.notes.notes)
  const currentNotes = (currentId && allNotes) ? allNotes[currentId] : {}

  //render
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={(e) => { dispatch(ToggleModal({ currentId: null, modalId: null })) }}>
        <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={e => e.stopPropagation()}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {title}
              </h3>
              <Button
                configId="closeModal"
                onClick={() => { dispatch(ToggleModal({ currentId: null, modalId: null })) }}
              />
            </div>
            <div className="relative p-6 flex-auto">
              <p>{text}</p>
              {(configId === "editModal" || configId === "createModal") && <FormNotes {...currentNotes} />}
              {configId === "deleteModal" && (
                <>
                  <Button configId="deleteNotes" onClick={() => {
                    if (currentId) {
                      dispatch(deleteNote(currentId))
                    }
                    dispatch(ToggleModal({ currentId: null, modalId: null }))

                  }} />
                  <Button configId="cancel" onClick={() => dispatch(ToggleModal({ currentId: null, modalId: null }))} />
                </>
              )}
              {configId === "deleteAllModal" && (
                <>
                  <Button configId="deleteNotes" onClick={() => {
                    dispatch(deleteAllNotes())
                    dispatch(ToggleModal({ currentId: null, modalId: null }))
                  }} />
                  <Button configId="cancel" onClick={() => dispatch(ToggleModal({ currentId: null, modalId: null }))} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
