const express = require('express')

const router = express.Router();

const UserModel = require('../models/users');

const getAllUsers = async(req, res) => {
    try {
        const [data] = await UserModel.getAllUsers();
    
        res.status(200).json({
            message: "Get all users success",
            data: data
        })
    } catch (error) {
         res.status(500).json({
            message: "Server Error",
            serverMessage: error
        })
    }
}

const createNewUsers = async(req, res) => {
    const {body} = req;

    if(!body.name || !body.email || !body.address){
        return res.status(400).json({
            message: "Invalid payload",
            data: null
        })
    }

    try {
        await UserModel.createNewUser(body);
        res.status(201).json({
            message: "Create new users success",
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error
        })
    }
}

const updateUsers = async(req, res) => {
    const {idUser} = req.params;
    const {body} = req;
    try {
        await UserModel.updateUser(body, idUser);
        res.status(201).json({
            message: "Update users success",
            data: {
                id: idUser,
                ...body
            },
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error
        })
    }
}

const deleteUsers = async(req, res) => {
    const {idUser} = req.params;
    try {
        await UserModel.deleteUser(idUser);
        res.status(200).json({
            message: "Delete users success",
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage: error
        })
    }
}

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}