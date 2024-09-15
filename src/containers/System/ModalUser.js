import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        };
    }
    componentDidMount() { }
    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            console.log('CHECK PROP', this.props)
            this.props.createNewUser(this.state, 'abc');
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className='modal-user-container'
                size='lg'

            >
                <ModalHeader toggle={this.toggle}>Add new Users</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-group'>
                            <div className='input-container half-width'>
                                <label>Email</label>
                                <input
                                    type='text'
                                    name='email'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, "email")}
                                />
                            </div>
                            <div className='input-container half-width'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangeInput(event, "password")}
                                />
                            </div>
                        </div>
                        <div className='input-group'>
                            <div className='input-container half-width'>
                                <label>First name</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={this.state.firstName}
                                    onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                />
                            </div>
                            <div className='input-container half-width'>
                                <label>Last name</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={this.state.lastName}
                                    onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                />
                            </div>
                        </div>
                        <div className='input-container full-width'>
                            <label>Address</label>
                            <input
                                type='text'
                                name='address'
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                            />
                        </div>
                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={this.handleAddNewUser}>
                        Add new
                    </Button>
                    <Button color="secondary" onClick={this.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
