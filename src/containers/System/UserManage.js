import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Usermanage.scss';
import ModalUser from './ModalUser';
import { createNewService, getAllUsers } from '../../services/userService';
import { reject } from 'lodash';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        console.log('API response:', response); // Kiểm tra phản hồi từ API
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {
                console.log('Updated users:', this.state.arrUsers); // Kiểm tra danh sách người dùng
            });
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }

    createNewUser = async (data) => {
        console.log('createNewUser called with data:', data); // Kiểm tra dữ liệu đầu vào
        try {
            let response = await createNewService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                }, () => {
                    console.log('Modal closed:', this.state.isOpenModalUser);
                });
            }
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    createNewUser={this.createNewUser}
                    toggleFromParent={this.toggleModalUser}
                />

                <div className="title text-center">Manage users with React</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={this.handleAddNewUser}
                    >
                        <i className="fa-solid fa-plus"></i> Add new users
                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Address</th>
                                <th>Action s</th>
                            </tr>


                            {
                                arrUsers && arrUsers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'>
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                            <button className='btn-delete'>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
