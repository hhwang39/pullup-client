import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postLogin } from '../actions';

class LoginPage extends Component {

    renderField(field) {
        const className = 'form-group myField';
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className='form-control' type={field.type} {...field.input} />
            </div>
        );
    }

    onSubmit(values) {
        this.props.postLogin(values);
    }

    componentDidUpdate() {
        const { headers } = this.props.config;
        if (!headers) return;
        if (headers.success === false) {
            alert(headers.message);
        } else if(headers.success === true) {
            alert('welcome');
            this.props.history.push('/');
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
           
            <form className='myLogin' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h2> Welcome to PullUp Parking App Login</h2>
                <Field
                    type='email'
                    label='User email:' 
                    name='email'
                    component={this.renderField} />
                <Field
                    type='password'
                    label='Password:'
                    name='password'
                    component={this.renderField} />
                <button type='submit' className='btn btn-primary'>Login</button>
                <Link to='/signup' className='btn btn-danger'>Register</Link>
            </form>
        );
    }
}

function mapStateToProps({ config }) {
    return { config };
}

export default reduxForm({
    form: 'LoginPage'
})(
    connect(mapStateToProps,{ postLogin })(LoginPage)
);
