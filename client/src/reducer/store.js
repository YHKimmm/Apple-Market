import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import commentsSlice from "./commentSlice";
import sortSlice from "./sortSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        comments: commentsSlice,
        sort: sortSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});