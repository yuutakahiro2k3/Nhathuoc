import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server Error');
    }
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    try {
        let message = await CRUDService.createNewUser(req.body);
        console.log(message);
        return res.redirect('/get-crud'); // Redirect to the page showing all users
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error creating user');
    }
};

let displaygetCRUD = async (req, res) => {
    try {
        let data = await CRUDService.getAllUser();
        console.log('---------');
        console.log(data);
        console.log('---------');
        return res.render('displayCRUD.ejs', {
            datatable: data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching users');
    }
};

let geteditCRUD = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let userData = await CRUDService.GetUserInfobyId(userId);
            return res.render('editCRUD.ejs', {
                user: userData
            });
        } else {
            return res.status(400).send('User ID is required');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error fetching user');
    }
};
let putCRUD = async (req, res) => {
    try {
        let data = req.body;
        let allUsers = await CRUDService.updateServerData(data);
        return res.render('displayCRUD.ejs', {
            datatable: allUsers
        });
    } catch (error) {
        console.error('Error in putCRUD:', error);
        return res.status(500).send('Error updating user');
    }
};



module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displaygetCRUD: displaygetCRUD,
    putCRUD: putCRUD,
    geteditCRUD: geteditCRUD
};
