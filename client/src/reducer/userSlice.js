import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        displayName: '',
        uid: '',
        photoURL: '',
        email: '',
        accessToken: '',
        isLoading: false,
    },
    reducers: {
        loginUser(state, action) {
            state.displayName = action.payload.displayName;
            state.uid = action.payload.uid;
            state.photoURL = action.payload.photoURL;
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.isLoading = true;
        },
        logoutUser(state) {
            state.displayName = '';
            state.uid = '';
            state.photoURL = '';
            state.email = '';
            state.accessToken = '';
        },
        updateUserProfileImage(state, action) {
            state.photoURL = action.payload.photoURL;
        },
    },
});


export const updateUserImage = (uid, photoURL) => async (dispatch) => {
    try {
        const body = {
            uid: uid,
            photoURL: photoURL
        }
        const response = await axios.post('/api/user/image/save', body)
        if (response.data.userInfo.modifiedCount !== 1) {
            return alert("Image updated same as previous image")
        }

        if (response.data.success) {
            console.log(response.data)
            dispatch(updateUserProfileImage({ photoURL: body.photoURL }))
            alert('Profile Image saved successfully')

        } else {
            console.log("Failed to update user profile image")
        }
    } catch (err) {
        console.log(err)
    }
}



export const { loginUser, logoutUser, updateUserProfileImage } = userSlice.actions;
export default userSlice.reducer;