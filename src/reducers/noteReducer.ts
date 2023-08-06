import {
  NotesDispatchTypes,
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
} from "../action/NotesAction/NotesActionTypes";

//interface
interface IInitialState {
  loading?: boolean;
  notes?: { [key: number]: NotesType };
  archive?: { [key: number]: NotesType };
  unarchive?: { [key: number]: NotesType };
  id?: number | null;
  stats?: { [key: string]: IStatistic };
}

//initial state
const initialState: IInitialState = {
  loading: false,
  id: null,
};

//note reducer
const NotesReducer = (
  state: IInitialState = initialState,
  action: NotesDispatchTypes
): IInitialState => {
  switch (action.type) {
    case NOTES_FAIL:
      return {
        loading: false,
      };
    case NOTES_LOADING:
      return {
        loading: true,
      };
    case NOTES_SUCCESS:
      const notes = action.payload.reduce((acc: any, cur: any) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return {
        ...state,
        loading: false,
        notes,
      };
    case STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };
    case NOTE_CREATED:
      let stats: IStatistic = { unarchive: 0, archive: 0, id: "" };
      if (state?.stats && state.stats[action.payload.category]) {
        stats = { ...state.stats[action.payload.category] };
        let count = ++state.stats[action.payload.category].unarchive;
        stats.unarchive = count;
      }
      return {
        ...state,
        notes: { ...state.notes, [action.payload.id]: action.payload },
        unarchive: { ...state.unarchive, [action.payload.id]: action.payload },
        stats: { ...state.stats, [action.payload.category]: stats },
      };
    case NOTE_EDIT:
      if (!action.payload.archive) {
        return {
          ...state,
          notes: { ...state.notes, [action.payload.id]: action.payload },
          unarchive: {
            ...state.unarchive,
            [action.payload.id]: action.payload,
          },
        };
      }
      if (action.payload.archive) {
        return {
          ...state,
          notes: { ...state.notes, [action.payload.id]: action.payload },
          archive: { ...state.archive, [action.payload.id]: action.payload },
        };
      }
      return state;
    case NOTES_DELETE_ALL:
      return {
        ...state,
        notes: {},
        archive: {},
        unarchive: {},
        stats: {},
      };
    case NOTE_DELETE_ONE:
      const deleted = { ...state };
      if (action.payload && deleted.notes) {
        delete deleted.notes[action.payload];
        deleted.id = null;
        return deleted;
      }
      return state;
    case NOTES_ARCHIVE_SUCCESS:
      const notesArchive = action.payload.reduce((acc: any, cur: any) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return {
        ...state,
        loading: false,
        archive: notesArchive,
      };
    case NOTES_UNARCHIVE_SUCCESS:
      const notesUnarchive = action.payload.reduce((acc: any, cur: any) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return {
        ...state,
        loading: false,
        unarchive: notesUnarchive,
      };
    case NOTE_TOGGLE_ONE:
      const newState = { ...state };
      const id = action.payload;
      if (
        newState.notes &&
        newState.notes[action.payload] &&
        newState.archive &&
        newState.unarchive &&
        newState.stats
      ) {
        if (newState.notes[action.payload].archive && action.payload) {
          const toggledNote = {
            ...newState.notes[action.payload],
            archive: !newState.notes[action.payload].archive,
          };
          delete newState.archive[id];
          newState.notes[id] = toggledNote;
          newState.unarchive[id] = toggledNote;
          let archiveCount = --newState.stats[toggledNote.category].archive;
          newState.stats[toggledNote.category].archive = archiveCount;
          let unarchiveCount = ++newState.stats[toggledNote.category].unarchive;
          newState.stats[toggledNote.category].unarchive = unarchiveCount;
          return newState;
        }
        if (!newState.notes[action.payload].archive && action.payload) {
          const toggledNote = {
            ...newState.notes[action.payload],
            archive: !newState.notes[action.payload].archive,
          };
          delete newState.unarchive[id];
          newState.notes[id] = toggledNote;
          newState.archive[id] = toggledNote;
          let archiveCount = ++newState.stats[toggledNote.category].archive;
          newState.stats[toggledNote.category].archive = archiveCount;
          let unarchiveCount = --newState.stats[toggledNote.category].unarchive;
          newState.stats[toggledNote.category].unarchive = unarchiveCount;
          return newState;
        }
      }
      return state;
    case NOTES_UNARCHIVE_ALL:
      if (state.notes) {
        const notes = Object.values(state.notes);
        const notesUnarchiveAll = notes.map((item) => ({
          ...item,
          archive: true,
        }));
        const reducedNotesUnarchiveAll = notesUnarchiveAll.reduce(
          (acc: any, cur: any) => {
            acc[cur.id] = cur;
            return acc;
          },
          {}
        );
        const notArchiveTask = notesUnarchiveAll.filter(
          (note: NotesType) => note.category === "Task"
        );
        const notArchiveIdea = notesUnarchiveAll.filter(
          (note: NotesType) => note.category === "Idea"
        );
        const notArchiveQuote = notesUnarchiveAll.filter(
          (note: NotesType) => note.category === "Quote"
        );
        const notArchiveRandom = notesUnarchiveAll.filter(
          (note: NotesType) => note.category === "Random Thought"
        );
        const stats: { [key: string]: IStatistic } = {
          Task: {
            id: "Task",
            archive: 0,
            unarchive: notArchiveTask.length,
          },
          Idea: {
            id: "Idea",
            archive: 0,
            unarchive: notArchiveIdea.length,
          },
          Quote: {
            id: "Quote",
            archive: 0,
            unarchive: notArchiveQuote.length,
          },
          "Random Thought": {
            id: "Random Thought",
            archive: 0,
            unarchive: notArchiveRandom.length,
          },
        };
        return {
          ...state,
          notes: reducedNotesUnarchiveAll,
          archive: {},
          unarchive: reducedNotesUnarchiveAll,
          stats,
        };
      }
      return state;

    case NOTES_ARCHIVE_ALL:
      if (state.notes) {
        const notes = Object.values(state.notes);
        const notesArchiveAll = notes.map((item) => ({
          ...item,
          archive: false,
        }));
        const reducedNotesArchiveAll = notesArchiveAll.reduce(
          (acc: any, cur: any) => {
            acc[cur.id] = cur;
            return acc;
          },
          {}
        );
        const archiveTask = notesArchiveAll.filter(
          (note: NotesType) => note.category === "Task"
        );
        const archiveIdea = notesArchiveAll.filter(
          (note: NotesType) => note.category === "Idea"
        );
        const archiveQuote = notesArchiveAll.filter(
          (note: NotesType) => note.category === "Quote"
        );
        const archiveRandom = notesArchiveAll.filter(
          (note: NotesType) => note.category === "Random Thought"
        );
        const stats: { [key: string]: IStatistic } = {
          Task: {
            id: "Task",
            archive: archiveTask.length,
            unarchive: 0,
          },
          Idea: {
            id: "Idea",
            archive: archiveIdea.length,
            unarchive: 0,
          },
          Quote: {
            id: "Quote",
            archive: archiveQuote.length,
            unarchive: 0,
          },
          "Random Thought": {
            id: "Random Thought",
            archive: archiveRandom.length,
            unarchive: 0,
          },
        };
        return {
          ...state,
          notes: reducedNotesArchiveAll,
          archive: reducedNotesArchiveAll,
          unarchive: {},
          stats,
        };
      }
      return state;
    default:
      return state;
  }
};

export default NotesReducer;
