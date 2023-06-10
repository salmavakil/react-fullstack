import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    let history = useNavigate();
    const initialValues = {
        title:'',
        postText:'',
        username:''
    }

    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/posts",data).then((response)=>{
            console.log('...response',response);
            history('/')
        })
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required(),
        username:yup.string().min(3).max(15).required(),
        postText:yup.string().required()
    })
  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <label>Post Title</label>
                <Field id='inputCreatePost' name='title' placeholder='Post Title...'/>
                <ErrorMessage component='span' name='title'/>
                <label>Post</label>
                <Field id='inputCreatePost' name='postText' placeholder='Post...'/>
                <ErrorMessage component='span' name='postText'/>
                <label>Post Title</label>
                <Field id='inputCreatePost' name='username' placeholder='Post Username...'/>
                <ErrorMessage component='span' name='username'/>
                <button type='submit'>Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost