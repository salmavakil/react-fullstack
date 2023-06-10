import React, { useContext } from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../helpers/AuthContext';

function Login() {
    let history = useNavigate();
    const {setAuthState} = useContext(authContext);
    const initialValues = {
        username:'',
        password:''
     }
 
     const validationSchema = yup.object().shape({
         username:yup.string().min(3).max(15).required(),
         password:yup.string().min(8).max(20).required()
     })
 
     const onSubmit = (data)=>{
         axios.post("http://localhost:3001/auth/login",data).then((response)=>{
            if(!response.data.error)  {localStorage.setItem('accessToken',response.data);
            setAuthState(true);
             history('/');}
            else alert(response.data.error)
         })
     }
  return (
    <div>
        <div>Login</div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
            <label>Username</label>
            <Field type='text' name='username'>
            </Field>
            <ErrorMessage component='span' name='title'></ErrorMessage>
            <label>Password</label>
            <Field type='password' name='password'>
            </Field>
            <ErrorMessage component='span' name='password'></ErrorMessage>
            <button type='submit'>Register</button>
        </Form>
    </Formik>
    </div>
  )
}

export default Login