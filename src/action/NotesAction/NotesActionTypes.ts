//types
export const NOTES_LOADING = "NOTES_LOADING";
export const NOTES_FAIL = "NOTES_FAIL";
export const NOTES_SUCCESS = "NOTES_SUCCESS";
export const NOTE_CREATED = "NOTE_CREATED";
export const NOTES_DELETE_ALL = "NOTES_DELETE_ALL";
export const NOTES_ARCHIVE_ALL = "NOTES_ARCHIVE_ALL";
export const NOTE_DELETE_ONE = "NOTE_DELETE_ONE";
export const NOTE_TOGGLE_ONE = "NOTE_TOGGLE_ONE";
export const NOTES_UNARCHIVE_ALL = "NOTES_UNARCHIVE_ALL";
export const NOTES_ARCHIVE_SUCCESS = "NOTES_ARCHIVE_SUCCESS";
export const NOTES_UNARCHIVE_SUCCESS = "NOTES_UNARCHIVE_SUCCESS";
export const NOTE_EDIT = "NOTE_EDIT";
export const STATS_SUCCESS = "STATS_SUCCESS";

//interfaces
export type NotesType = {
  id: number;
  name: string;
  created: Date | undefined;
  category: string;
  content: string;
  archive: boolean | undefined;
  dates: Array<Date> | undefined;
  newDate?: Date | undefined | string;
};

export type NotesTypeCreated = {
  name: string;
  category: string;
  content: string;
  newDate: Date | string | undefined;
};

export interface NoteLoading {
  type: typeof NOTES_LOADING;
}

export interface NoteFail {
  type: typeof NOTES_FAIL;
}

export interface NoteSuccess {
  type: typeof NOTES_SUCCESS;
  payload: Array<object>;
}

export interface NoteCreate {
  type: typeof NOTE_CREATED;
  payload: NotesType;
}

export interface NoteDeleteAll {
  type: typeof NOTES_DELETE_ALL;
}

export interface NoteArchiveAll {
  type: typeof NOTES_ARCHIVE_ALL;
}

export interface NoteDeleteOne {
  type: typeof NOTE_DELETE_ONE;
  payload: number;
}

export interface NoteToogleOne {
  type: typeof NOTE_TOGGLE_ONE;
  payload: number;
}

export interface NoteUnarchiveAll {
  type: typeof NOTES_UNARCHIVE_ALL;
}

export interface NoteArchiveSuccess {
  type: typeof NOTES_ARCHIVE_SUCCESS;
  payload: Array<object>;
}

export interface NoteUnarchiveSuccess {
  type: typeof NOTES_UNARCHIVE_SUCCESS;
  payload: Array<object>;
}

export interface NoteEdit {
  type: typeof NOTE_EDIT;
  payload: NotesType;
}

export interface IStatistic {
  id: string;
  archive: number;
  unarchive: number;
}

export interface IStats {
  type: typeof STATS_SUCCESS;
  payload: { [key: string]: IStatistic };
}

//All types
export type NotesDispatchTypes =
  | NoteLoading
  | NoteFail
  | NoteSuccess
  | NoteCreate
  | NoteDeleteAll
  | NoteArchiveAll
  | NoteDeleteOne
  | NoteToogleOne
  | NoteUnarchiveAll
  | NoteArchiveSuccess
  | NoteUnarchiveSuccess
  | NoteEdit
  | IStats;
