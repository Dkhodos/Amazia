import express from 'express';
import activityView from './activities/view';
import questionsView from './questions/view';
import usersView from './users/view';

const apiView = express.Router();

apiView.use("/questions",questionsView);
apiView.use("/users",usersView);
apiView.use("/activities",activityView);

export default apiView;