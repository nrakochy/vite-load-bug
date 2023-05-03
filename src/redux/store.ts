import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux/es/exports";
import coursesPreviewReducer from "./slices/coursesPreviewSlice";
import courseDetailsReducer from "./slices/courseDetailsSlice";
import videosProgressReducer from "./slices/videosProgressSlice";

const rootReducer = combineReducers({
  coursesPreview: coursesPreviewReducer,
  courseDetails: courseDetailsReducer,
  videosProgress: videosProgressReducer,
});

export function createReduxStore(initialState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
}

const store = createReduxStore();

type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
