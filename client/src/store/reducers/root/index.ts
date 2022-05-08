import { Question } from "../../../@types/questions";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { fetchQuestions } from "./root.action";

interface RootState{
    questions: Question[],
    questionsIndex: number,
    victory: boolean
    logs: boolean[]
    loaders: {
        questions: boolean
    }
    errors: {
        questions: boolean
    }
}

const defaultState:RootState = {
    questions: [],
    questionsIndex: -1,
    victory: false,
    logs: [],
    loaders: {
        questions: false,
    },
    errors: {
        questions: false
    }
}

const rootSlice = createSlice({
    name: 'root',
    initialState: defaultState,
    reducers: {
        updateLogs: (state, action: PayloadAction<{index: number, status: boolean}>) => {
            const {index,status} = action.payload;

            state.logs[index] = status;
        },
        setLogs: (state, action: PayloadAction<boolean[]>) => {
            state.logs = action.payload;
        },

        setVictory:(state, action: PayloadAction<boolean>) => {
            state.victory = action.payload
        },

        resetChallenge: () => defaultState
    },
    extraReducers: builder => {
        builder.addCase(fetchQuestions.pending, (state, action) => {
           state.loaders.questions = true;
           state.errors.questions = false;
        });

        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.loaders.questions = false;

            state.questions = action.payload.questions;
            state.questionsIndex = action.payload.index;
        });
    }
  })

  export const {updateLogs, setLogs, setVictory, resetChallenge} = rootSlice.actions;

  export default rootSlice;