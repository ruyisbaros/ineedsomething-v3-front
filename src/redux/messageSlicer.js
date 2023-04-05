import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isTyping: false,
    chatUsers: [],
    numberOfUsers: 0,
    data: [],
    typingTo: "",
    onlineUsers: []
}

const messagesSlicer = createSlice({
    name: "messages",
    initialState,
    reducers: {
        createSingleChat: (state, action) => {
            /* state.data = [...state.data, action.payload] */
            state.chatUsers = state.chatUsers.map(user =>
                user._id === action.payload.recipient._id || user._id === action.payload.sender._id
                    ? { ...user, chatMessage: action.payload.chatMessage, images: action.payload.images }
                    : user
            )

        },
        makeOnlineChatUser: (state, action) => {
            state.chatUsers = state.chatUsers.map(cu => (
                cu._id === action.payload ? { ...cu, isOnline: true } : cu
            ))
        },
        addToData: (state, action) => {
            state.data = [...state.data, action.payload]
        },
        addToOnlineList: (state, action) => {
            state.onlineUsers = !state.onlineUsers.includes(action.payload) ? [...state.onlineUsers, action.payload] : state.onlineUsers
        },
        createChatUser: (state, action) => {
            const user = action.payload
            if (state.chatUsers.every(item => item._id !== user._id)) {
                state.chatUsers = [user, ...state.chatUsers]
            }
        },
        fetchChatWith: (state, action) => {
            state.chatUsers = action.payload
        },
        getBetweenChats: (state, action) => {
            state.data = action.payload
        },
        deleteAMessage: (state, action) => {
            const id = action.payload
            /*  state.data = state.data.filter(item => item._id !== id) */
            state.data.forEach(item => {
                if (item._id === id) {
                    item.chatMessage = <span style={{ fontSize: "12px", color: "gray" }}>` This message has been deleted`</span>
                }
            })
        },
        readMessageRedux: (state, action) => {
            state.data = state.data.map(dt => (
                dt.recipient._id === action.payload ? { ...dt, isRead: true } : dt
            ))
        },
        deleteFullConversation: (state, action) => {
            const id = action.payload
            state.chatUsers = state.chatUsers.filter(item => item._id !== id)
        },
        makeUserOnline: (state, action) => {
            //console.log(action.payload);
            state.chatUsers = state.chatUsers.map(user =>
                state.onlineUsers.map(onl => (
                    onl === user._id ? { ...user, isOnline: true } : { ...user, isOnline: false }
                )))
        },
        makeUserOffline: (state, action) => {
            console.log(action.payload);
            state.chatUsers = state.chatUsers.map(user =>
                user._id === action.payload && { ...user, isOnline: false })
        },
        openTyping: (state, action) => {
            state.isTyping = true;
            state.typingTo = action.payload
        },
        closeTyping: (state, action) => {
            state.isTyping = false
        },
        /* openRead: (state, action) => {
            state.isRead = true
        },
        closeRead: (state, action) => {
            state.isRead = false
        }, */
        onlineUsersList: (state, action) => {
            state.onlineUsers = [...state.onlineUsers, ...action.payload]
        } 
    }
})

export const { createSingleChat, createChatUser, fetchChatWith, getBetweenChats, deleteAMessage, deleteFullConversation, addToData, makeUserOnline, makeUserOffline, readMessageRedux,
    openTyping, closeTyping, openRead, closeRead, onlineUsersList, addToOnlineList, makeOnlineChatUser
} = messagesSlicer.actions

export default messagesSlicer.reducer