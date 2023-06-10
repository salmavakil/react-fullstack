import React from 'react'
import axios from "axios";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [listOfPosts,setListOfPosts] = useState([])
    let history = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3001/posts').then((response)=>{
      setListOfPosts(response.data);
      console.log('.list',listOfPosts);
    })
  },[])
  
  return (
    <div>
    {(listOfPosts.length>0)?(listOfPosts.map((post,i)=>{
        return <div className='post' key={i} onClick={()=>{history(`/post/${post.id}`)}}>
          <div className='post-title'>{post.title}</div>
          <div className='post-text'>{post.postText}</div>
          <div className='footer'>{post.username}</div>
        </div>
      })):<div>Loading Posts...</div>}
      </div>
  )
}

export default Home