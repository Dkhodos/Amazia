import express from 'express';
import questionsView from './questions/view';
import usersView from './users/view';

const apiView = express.Router();

apiView.use("/questions",questionsView);
apiView.use("/users",usersView);

export default apiView;