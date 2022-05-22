import express from 'express';
import ApiError from '../../utils/ApiError';
import Activities from '../../db/Activities';
import { isValidActivity } from './activities.utils';

const activityView = express.Router();
activityView.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
})

activityView.post("/", async (req, res) => {
    const {id, ...activity} = req.body;
    const userAgent = `${req.useragent?.browser} | mobile:${req.useragent?.isMobile}`

    if(!id){
        ApiError.badRequest("missing id!", res);

        return;
    }

    const {valid, reason} = isValidActivity(activity);
    if(!valid){
        ApiError.badRequest("Invalid activity received, " + reason, res);

        return;
    }

    const newActivity = await (new Activities()).addActivity(id, activity, userAgent);
    if(newActivity){
        res.json({
         success: true,
         payload: activity
        })
    } else {
        ApiError.badRequest("Invalid Activity!" + reason, res);
    }
});

export default activityView;