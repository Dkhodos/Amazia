import {createAsyncThunk} from "@reduxjs/toolkit"
import Questions from "../../../services/questions";


export const fetchQuestions = createAsyncThunk(
    'questions/fetch',
    async ({quizIndex}:{quizIndex: number | null }) => {
      const response = await Questions.get(quizIndex ?? undefined);

      return response.data;
    }
);


