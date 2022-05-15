import express from 'express';
import ApiError from '../../utils/ApiError';
import Users, { User } from '../../db/Users';
import UserDB from "../../db/User";
import { isValidUpdateParams, validKeysToUpdate } from './users.utils';
import Logger from '../../logger/Logger';

const usersView = express.Router();
usersView.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next()
})

usersView.get('/:id',  async (req, res) => {
    const id = req.params.id;

    const user = await (new Users().getWithId(id));
    if(user){
        res.json(user.data);
    } else {
        ApiError.badRequest( `User ${id} doesn't exist!`, res).resolve()
    }
});

usersView.post('/',  async (req, res) => {
    const params = req.body;

    if(ApiError.raiseOnMissingParams<any>(["id", "name"], params, res)){
        return;
    }

    //const newUser = await (new Users().createNewUser(req.body.id, req.body.name))
    const newUser = new UserDB({scheme: {id: params.id, name: params.name}});

    try{
        await newUser.save();

        res.json({
            success: true,
            msg: `User ${newUser.id} created!`,
            payload: newUser.toJson()
        });
    } catch (e){
        Logger.ERROR(`User ${newUser.id} could not be saved\n${e}`);
        ApiError.internal( `User ${newUser.id} could not be saved!`, res).resolve()
    }
});



usersView.delete("/:id", async (req, res) => {
    const id = req.params.id;

    //const deletedUser = await (new Users().deleteById(id));
    const deletedUser = await UserDB.get({filters: {id}});
    if(!deletedUser){
        ApiError.badRequest(`User ${id} doesn't exist!`, res).resolve();
        return;
    }

    try{
        await deletedUser.delete();

        res.json({
            success: true,
            msg: `User ${id} deleted!`,
        })
    } catch(e){
        Logger.ERROR(`User ${id} could not be deleted\n${e}`);
        ApiError.internal(`User ${id} could not be deleted!`, res).resolve();
    }
});


usersView.put("/:id", async (req, res) => {
    const id = req.params.id;
    const params = req.body;

    if(!isValidUpdateParams(params)){
        ApiError.badRequest("missing valid Keys: " + validKeysToUpdate, res);
        return;
    }

    //const updatedUser = await (new Users().updateById(id, params as Partial<User>));
    const updatedUser = await UserDB.get({filters: {id}});
    if(!updatedUser){
        ApiError.badRequest(`User ${id} doesn't exist!`, res).resolve();
        return;
    }

    updatedUser.

    if(updatedUser){
        res.json({
            success: true,
            msg: `User ${id} updated!`,
            payload: updatedUser
        })
    } else {
        ApiError.badRequest(`User ${id} doesn't exist!`, res).resolve();
    }
});



export default usersView;