import { Dispatch } from "redux";
import {
  NotesDispatchTypes,
  NotesTypeCreated,
  NotesType,
  NOTES_LOADING,
  NOTES_FAIL,
  NOTES_SUCCESS,
  NOTE_CREATED,
  NOTES_DELETE_ALL,
  NOTES_ARCHIVE_ALL,
  NOTE_DELETE_ONE,
  NOTE_TOGGLE_ONE,
  NOTES_UNARCHIVE_ALL,
  NOTES_ARCHIVE_SUCCESS,
  NOTES_UNARCHIVE_SUCCESS,
  NOTE_EDIT,
  STATS_SUCCESS,
  IStatistic,
} from "./NotesActionTypes";
import axios from "axios";

//ACTIONS
//getAll notes from server(here json in public) - 
//here all initial get data - notes, archived, active
//in real projects I think it will be different request 
export const GetNotes =
  () => async (dispatch: Dispatch<NotesDispatchTypes>) => {
    try {
      dispatch({
        type: NOTES_LOADING,
      });
      const res = await axios.get("./db.json");
      dispatch({
        type: NOTES_SUCCESS,
        payload: res.data.notes,
      });
      const archive = await res.data.notes.filter(
        (note: NotesType) => note.archive
      );
      dispatch({
        type: NOTES_ARCHIVE_SUCCESS,
        payload: archive,
      });
      const notArchive = await res.data.notes.filter(
        (note: NotesType) => !note.archive
      );
      dispatch({
        type: NOTES_UNARCHIVE_SUCCESS,
        payload: notArchive,
      });
      const archiveTask = await archive.filter(
        (note: NotesType) => note.category === "Task"
      );
      const archiveIdea = await archive.filter(
        (note: NotesType) => note.category === "Idea"
      );
      const archiveQuote = await archive.filter(
        (note: NotesType) => note.category === "Quote"
      );
      const archiveRandom = await archive.filter(
        (note: NotesType) => note.category === "Random Thought"
      );
      const notArchiveTask = await notArchive.filter(
        (note: NotesType) => note.category === "Task"
      );
      const notArchiveIdea = await notArchive.filter(
        (note: NotesType) => note.category === "Idea"
      );
      const notArchiveQuote = await notArchive.filter(
        (note: NotesType) => note.category === "Quote"
      );
      const notArchiveRandom = await notArchive.filter(
        (note: NotesType) => note.category === "Random Thought"
      );
      const stats: { [key: string]: IStatistic } = {
        Task: {
          id: "Task",
          archive: archiveTask.length,
          unarchive: notArchiveTask.length,
        },
        Idea: {
          id: "Idea",
          archive: archiveIdea.length,
          unarchive: notArchiveIdea.length,
        },
        Quote: {
          id: "Quote",
          archive: archiveQuote.length,
          unarchive: notArchiveQuote.length,
        },
        "Random Thought": {
          id: "Random Thought",
          archive: archiveRandom.length,
          unarchive: notArchiveRandom.length,
        },
      };
      dispatch({
        type: STATS_SUCCESS,
        payload: stats,
      });
    } catch (e) {
      dispatch({
        type: NOTES_FAIL,
      });
    }
  };

//Shoud be asynx axios function to send fetch to server
//create note
export const CreateNotes = ({
  name,
  content,
  category,
  newDate,
}: NotesTypeCreated): NotesDispatchTypes => {
  let id = 20;
  ++id;
  const created = new Date();
  const noteDate = newDate ? new Date(newDate) : new Date();
  const dates = [noteDate];
  return {
    type: NOTE_CREATED,
    payload: { name, dates, content, category, created, archive: false, id },
  };
};

//Shoud be asynx axios function to send fetch to server
//edit note
export const EditNotes = ({
  name,
  content,
  category,
  id,
  created,
  archive,
  dates,
  newDate,
}: NotesType): NotesDispatchTypes => {
  created = new Date();
  const noteDate = newDate ? new Date(newDate) : new Date();
  const allDates = dates ? [...dates, noteDate] : [];
  return {
    type: NOTE_EDIT,
    payload: { name, dates: allDates, content, category, created, archive, id },
  };
};

//Shoud be asynx axios function to send fetch to server
//delete note
export const deleteNote = (id: number): NotesDispatchTypes => {
  return {
    type: NOTE_DELETE_ONE,
    payload: id,
  };
};


//Shoud be asynx axios function to send fetch to server
//delete all note
export const deleteAllNotes = (): NotesDispatchTypes => {
  return {
    type: NOTES_DELETE_ALL,
  };
};


//Shoud be asynx axios function to send fetch to server
//archive all note
export const archiveAllNotes = (): NotesDispatchTypes => {
  return {
    type: NOTES_ARCHIVE_ALL,
  };
};


//Shoud be asynx axios function to send fetch to server
//unarchive all note
export const unarchiveAllNotes = (): NotesDispatchTypes => {
  return {
    type: NOTES_UNARCHIVE_ALL,
  };
};

//Shoud be asynx axios function to send fetch to server
//toggle one note
export const toggleArchiveOne = (id: number): NotesDispatchTypes => {
  return {
    type: NOTE_TOGGLE_ONE,
    payload: id,
  };
};
