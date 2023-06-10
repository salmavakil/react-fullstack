import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Post() {
    let {id} = useParams()
    const [post,setPost] = useState({})
    const [comments,setComments] = useState([])
    const [newComment,setNewComment] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
            setPost(response.data)
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
          setComments(response.data)
      })
    },[])

  const addComment = () =>{
    axios.post(`http://localhost:3001/comments`,{commentBody: newComment ,PostId: id},{headers:{accessToken:localStorage.getItem('accessToken')}}).then((response)=>{
          if(response.status === 200){
            console.log('.status',response)
            const commentToAdd = [{commentBody:response.data.commentBody, PostId:id, username:response.data.username}]
            setComments([...comments,...commentToAdd])
            setNewComment('');
          }
      })
  }

const deleteComment = (event)=>{
  console.log(event)
    axios.delete(`http://localhost:3001/comments/${event.id}`).then((response)=>{
console.log('..deleted',response)
    })
  }


  return (
    <div>
        <div className='row'>
          <div className='col-md-6'>
        <div>{post.title}</div>
        <div>{post.postText}</div>
        <div>{post.username}</div>
        </div>
        <div className='col-md-6'>
          <div>
            <input type='text' placeholder='Add a comment...' value={newComment} onChange={(event)=>{setNewComment(event.target.value)}}/>
            <button onClick={addComment}>Add Comment</button>
          </div>
          <div>
{comments.map((comment,i)=>(
  <div key={i}>{comment.commentBody} {comment.username}
  <button onClick={()=>deleteComment(comment)}>Delete</button>
  </div>
))}
          </div>
        </div>
        </div>
        </div>
  )
}

export default Post