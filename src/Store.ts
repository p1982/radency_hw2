import {createStore, applyMiddleware} from "redux"
import rootReducer from "./reducers/rootReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

//create Store
const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//type Dispatch
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export type RootStore = ReturnType<typeof rootReducer>

export default Store