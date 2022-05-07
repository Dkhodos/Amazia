import { RootState } from "../..";

export const selectQuestions = (state : RootState) => state.root.questions;
export const selectQuestionsIndex = (state : RootState) => state.root.questionsIndex;
export const selectLoaders = (state : RootState) => state.root.loaders;