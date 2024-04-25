import { createSlice } from "@reduxjs/toolkit"
import axios from "../config/instance"
import { useParams } from "react-router-dom";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        post: [],
        user: [],
        mypost: [],
        status: [],
        like: [],
        myuser: []

    },
    reducers: {
        fetchPostSuccess: (state, action) => {
            state.post = action.payload
            console.log(state, action, 'ini state ');
        },
        fetchUsersSuccess: (state, action) => {
            state.user = action.payload;
        },
        fetchMyPostSuccess: (state, action) => {
            state.mypost = action.payload;
        },
        fetchTokenSuccess: (state, action) => {
            state.status = action.payload;
        },
        fetchLikeSuccess: (state, action) => {
            state.like = action.payload;
        },
        fetchMyUsersSuccess: (state, action) => {
            state.like = action.payload;
        }
    },
});

export const {fetchPostSuccess, fetchUsersSuccess, fetchMyPostSuccess, fetchTokenSuccess, fetchLikeSuccess, fetchMyUsersSuccess} = appSlice.actions

// Thunk => function yang nge return sebuah function
export function fetchPost() {
   return async function fetchPostThunk(dispatch) {
    try {
        let { data } = await axios({
            url: '/post',
            method: 'get',
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`
            }
          })
          console.log(data, '<<<');
          dispatch(fetchPostSuccess(data))
    } catch (error) {
        console.log(error);
    }
   }
}

export function fetchUsers(){
    return async function fetchUsersThunk(dispatch) {
        try {
        const {data} = await axios({
            url: '/users/me',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            },
        })
        console.log(data.image, 'ini data');
            dispatch(fetchUsersSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchMyPost(){
return async function fetchMyPostThunk(dispatch) {
    try {
        let { data } = await axios({
            url: '/mypost',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`
            }
          })
          
          console.log(data, 'ini datanya');
          dispatch(fetchMyPostSuccess(data))
    } catch (error) {
        console.log(error);
    }
    }
}

export function fetchToken(){
    return async function fetchTokenThunk(dispatch) {
        try {
        const {data} = await axios({
            url: '/users/me',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        })
        console.log(data);
            dispatch(fetchTokenSuccess(data.status))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchLike(){
    return async function fetchLikeThunk(dispatch) {
        try {
        const {data} = await axios({
            url: '/like',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        })
            dispatch(fetchLikeSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchMyUsers(id){
    return async function fetchMyUsersThunk(dispatch) {
        try {
        const {data} = await axios({
            url: `/users/${id}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            },
        })
            dispatch(fetchMyUsersSuccess(data))
        } catch (error) {
            console.log(error);
        }
    }
}

export default appSlice.reducer;