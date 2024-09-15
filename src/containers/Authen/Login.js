import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as     actions from "../../store/actions";
import './Login.scss'
import { handleLoginAPI } from '../../services/userService';
import { FormattedMessage } from 'react-intl';








class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPass: false,
            errMessage: ''
        }

    }
    handleShowHidePass = () => {
        this.setState({
            showPass: !this.state.showPass
        });
    }
    handleOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        });
        console.log(event.target.value)
    }
    handleOnChangePass = (event) => {
        this.setState({
            password: event.target.value
        });
        console.log(event.target.value)
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })

        try {
            let data = await handleLoginAPI(this.state.username, this.state.password)
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message

                    })
                }
            }



        }

    }
    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'  >
                            <label>Username</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUser(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input'>

                                <input type={this.state.showPass ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePass(event)} />

                                <span onClick={() => { this.handleShowHidePass() }}>

                                    <i className={this.state.showPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}></i>
                                </span>

                            </div>

                        </div >
                        <div className='col-12'>
                            {this.state.errMessage}
                        </div>
                        <div><button className='col-12 btn-login' onClick={(event) => this.handleLogin(event)}>Login</button></div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center' >
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fa-brands fa-google google"></i>
                            <i className="fa-brands fa-facebook-f facebook"></i>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
