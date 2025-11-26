import { createSlice } from '@reduxjs/toolkit'

const init = {
    currentUser: {
        email: "",
        token: "",
        refershToken: "",
        tokenEx: "",
        refereshTokenEx: ""
    },
    profileDetail: {

        profile: {
            birth_date: "",
            gender: "",
            country: {
                id: "",
                created_at: "",
                updated_at: "",
                country_name: "",
                country_code: "",
                numeric_code: ""
            },
            phone_number: ""
        },
        health_info: {
            id: "",
            activity_level: {
                id: "",
                created_at: "",
                updated_at: "",
                title: "",
                is_active: true
            },
            health_condition: {
                id: "",
                created_at: "",
                updated_at: "",
                title: "",
                description: "",
                is_active: true
            },
            fitness_goal: {
                id: "",
                created_at: "",
                updated_at: "",
                title: "",
                is_active: true
            },
            created_at: "",
            updated_at: "",
            height: 0,
            weight: 0
        },
        wallet: {
            id: "",
            total_rewards_today: "",
            day_streak: "",
            rank: "",
            created_at: "",
            updated_at: "",
            balance: 0
        },
        today_calories: 0,
        today_steps: 0,
        updated_at: "",
        username: "",
        first_name: "",
        last_name: "",
        is_active: "",
        date_joined: "",
        created_at: "",
        email: "",
        has_complete_profile: ""
    },
    loading: false,
    error: false
}
const userReducer = createSlice({
    name: "userReducer",
    initialState: init,
    reducers: {

        setGmailVerify: (state, action) => {
            state.currentUser.email = action.payload.email;

        },
        setToken: (state, action) => {
            state.currentUser.token = action.payload.token;
            state.currentUser.refershToken = action.payload.refershToken;
            state.currentUser.tokenEx = action.payload.tokenEx
            state.currentUser.refereshTokenEx = action.payload.refereshTokenEx
        },
        setProfileDetail: (state, action) => {
            state.profileDetail = { ...action.payload }
        },
        logout: (state) => {
            // پاک کردن همه stateهای مربوط به auth
            state.currentUser.token ="";
            state.currentUser.refershToken = "";
            state.currentUser.tokenEx = "";
            state.currentUser.refereshTokenEx = "";
        },
        startLogin: (state, action) => {
            state.loading = true;
        },
        successLogin: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        faillLogin: (state, action) => {
            state.error = true;
            state.loading = false
        }
    }
})

export const {
    startLogin,
    successLogin,
    faillLogin,
    setGmailVerify,
    setToken,
    logout,
    setProfileDetail
} = userReducer.actions;
export default userReducer.reducer;