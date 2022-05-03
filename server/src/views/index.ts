import express from 'express';
import questionsView from './questions/view';

const apiView = express.Router();

apiView.use("/questions",questionsView);

export default apiView;