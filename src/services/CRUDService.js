import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

let createNewUser = async (data) => {
    try {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        console.log('Data from service: ', data);
        console.log('Hashed password: ', hashPasswordFromBcrypt);
        await db.User.create({

            firstName: data.firstName,
            password: hashPasswordFromBcrypt,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            gender: data.gender === '1' ? true : false,
            phonenumber: data.phonenumber,
            roleId: data.roleId,
            positionId: data.positionId,
            image: data.image


        });

        return 'create success';

    } catch (e) {
        console.error(e);
    }
};
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};


let GetUserInfobyId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)

            }
            else
                resolve({});
        } catch (e) {
            reject(e);
        }
    });
};

let updateServerData = async (data) => {
    try {

        let user = await db.User.findOne({
            where: { id: data.id }
        });

        if (user) {

            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            user.phonenumber = data.phonenumber;
            user.gender = data.gender === '1' ? true : false;
            user.roleId = data.roleId;
            user.positionId = data.positionId;
            user.image = data.image;


            await user.save();


            let allUsers = await db.User.findAll();
            return allUsers;
        } else {

            return [];
        }
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};


export default {
    createNewUser,
    hashUserPassword,
    getAllUser,
    GetUserInfobyId,
    updateServerData
};
