import express from 'express';
import ApiError from '../../utils/ApiError';
import Users, { User } from '../../db/Users';
import { isValidUpdateParams, validKeysToUpdate } from './users.utils';

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

    const newUser = await (new Users().createNewUser(req.body.id, req.body.name))
    if(newUser){
        res.json({
            success: true,
            msg: `User ${params.id} created!`,
            payload: newUser
        });
    } else {
        ApiError.badRequest( `User ${params.id} doesn't exist!`, res).resolve()
    }
});



usersView.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const deletedUser = await (new Users().deleteById(id));
    if(deletedUser){
        res.json({
            success: true,
            msg: `User ${id} update!`,
        })
    } else {
        ApiError.badRequest(`User ${id} doesn't exist!`, res).resolve();
    }
});


usersView.put("/:id", async (req, res) => {
    const id = req.params.id;
    const params = req.body;

    if(!isValidUpdateParams(params)){
        ApiError.badRequest("missing valid Keys: " + validKeysToUpdate, res);
        return;
    }

    const updatedUser = await (new Users().updateById(id, params as Partial<User>));

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