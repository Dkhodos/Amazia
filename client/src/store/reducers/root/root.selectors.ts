import { RootState } from "../..";

export const selectQuestions = (state : RootState) => state.root.questions;
export const selectLoaders = (state : RootState) => state.root.loaders;