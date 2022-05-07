import express from 'express';
import Activities from '../../db/Activities';
import { isValidActivity } from './activities.utils';

const activityView = express.Router();

activityView.post("/", async (req, res) => {
    const {id, ...activity} = req.body;
    const userAgent = `${req.useragent?.browser} | mobile:${req.useragent?.isMobile}`

    if(!id){
        res.json({
            error: true,
            msg: "Missing id!"
        });
    }

    const {valid, reason} = isValidActivity(activity);
    if(!valid){
        res.json({
            error: true,
            msg: reason
        });
    }

    const newActivity = await (new Activities()).addActivity(id, activity, userAgent);
    if(newActivity){
        res.json({
         success: true,
         payload: activity
        })
    } else {
        res.json({
            error: true,
            msg: "Invalid Activity!"
        });
    }
});

export default activityView;