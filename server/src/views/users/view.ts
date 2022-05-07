import express from 'express';
import Users, { User } from '../../db/Users';
import { isValidUpdateParams } from './users.utils';

const usersView = express.Router();

usersView.get('/:id',  async (req, res) => {
    const id = req.params.id;

    const user = await (new Users().getWithId(id));

    res.json(user.data);
});

usersView.post('/',  async (req, res) => {
    const params = req.body;
    console.log(params);
    if(!("id" in params && "name" in params)){
        res.json({
            error: true,
            msg: "Missing params!"
        });
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
        res.json({
            error: true,
            msg: `User ${params.id} doesn't exist!`
        })
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
        res.json({
            error: true,
            msg: `User ${id} doesn't exist!`
        })
    }
});


usersView.put("/:id", async (req, res) => {
    const id = req.params.id;
    const params = req.body;

    if(!isValidUpdateParams(params)){
        res.json({
            error: true,
            msg: "invalid update key"
        })
    }

    const updatedUser = await (new Users().updateById(id, params as Partial<User>));

    console.log(updatedUser);

    if(updatedUser){
        res.json({
            success: true,
            msg: `User ${id} updated!`,
            payload: updatedUser
        })
    } else {
        res.json({
            error: true,
            msg: "User doesn't exist!"
        })
    }
});



export default usersView;