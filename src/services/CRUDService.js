import bcrypt from 'bcryptjs';
import db from '../models/index';
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
            password: data.hashPasswordFromBcrypt,
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

export default {
    createNewUser,
    hashUserPassword
};
