import {createAsyncThunk} from "@reduxjs/toolkit"
import Questions from "../../../services/questions";


export const fetchQuestions = createAsyncThunk(
    'questions/fetch',
    async () => {
      const response = await Questions.get();

      return response.data;
    }
);


