import { combineReducers } from "redux";
import NotesReducer from "./noteReducer";
import ModalReducer from "./modalReducer";

//combine reducers
const rootReducer = combineReducers({
    notes: NotesReducer,
    modal: ModalReducer
});

export default rootReducer;