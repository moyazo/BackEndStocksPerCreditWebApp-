'use strict';
const router = require('express').Router();
const { signup } = require('../controllers/auth');
const {
    getUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    investOnProject
} = require('../controllers/users');

router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        if(!users) {
            res.status(502).json('No users found');
        }
        res.status(200).json(users);
    } catch (error) {
        console.log('Error getting users', error.message);
    }   
});

router.get('/:id', async (req, res) => {
    try {
        if(!req.params.id) {
            res.status(502).json('Not id given at the request');
        }
        const id = req.params.id;
        const user = await getUserById(id);
        if(!user) {
            res.status(502).json('No user found');
        }
        res.status(200).json(user);
    } catch (error) {
        console.log('Error getting user', error.message);
    }   
});

router.post('/', async (req, res) => {
    try {
        if(!req.body) {
            res.status(502).json('Not body given at the request');
        }
        const newData = req.body;
        const token = await signup(newData);
        if(!token) {
            res.status(502).json('User could not be created');
        }
        res.status(200).json('User created successfully');
    } catch (error) {
        console.log('Error creating user', error.message);
    }   
});
router.post('/invest', async (req, res) => {
    try {
        const { userId, projectId, amount } = req.body;
        if(!userId || !projectId || !amount){
            res.status(403).json('userId projectId amount not given at request.body');
        }
        const invested = await investOnProject(userId,projectId,amount);
        if(!invested) {
            res.status(502).json('user could not invest on project');
        }
        res.status(200).json(invested);
    } catch (error) {
        console.log('Error investing project', error.message);
    }   
});

router.put('/:id', async (req, res) => {
    try {
        if(!req.params.id) {
            res.status(502).json('Not id given at the request');
        }
        if(!req.body) {
            res.status(502).json('Not body given at the request');
        }
        const id = req.params.id;
        const newData = req.body;
        const user = await updateUser(id,newData);
        if(!user) {
            res.status(502).json('User could not be modify');
        }
        res.status(200).json(user);
    } catch (error) {
        console.log('Error modifying user', error.message);
    }   
});

router.delete('/:id', async (req, res) => {
    try {
        if(!req.params.id) {
            res.status(502).json('Not id given at the request');
        }
        const id = req.params.id;
        const userDeleted = await deleteUser(id);
        if(!userDeleted) {
            res.status(502).json('User could not be created');
        }
        res.status(200).json('User deleted ' + userDeleted);
    } catch (error) {
        console.log('Error deleting user', error.message);
    }   
});


module.exports = router
