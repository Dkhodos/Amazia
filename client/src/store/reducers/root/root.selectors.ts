import { RootState } from "../..";

export const selectQuestions = (state : RootState) => state.root.questions;
export const selectLogs = (state : RootState) => state.root.logs;
export const selectQuestionsIndex = (state : RootState) => state.root.questionsIndex;
export const selectTime = (state : RootState) => state.root.time;
export const selectLoaders = (state : RootState) => state.root.loaders;
export const selectVictory = (state : RootState) => state.root.victory;