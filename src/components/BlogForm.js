import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setAddedBlog}) => {
    const [newTitle, setnewTitle] = useState('') 
    const [newAuthor, setnewAuthor] = useState('') 
    const [newUrl, setnewUrl] = useState('')

    const addBlog = async (event) => {
      try {
        event.preventDefault()
        const blogObject = {
          title: newTitle,
          author: newAuthor,
          url: newUrl,
        }
        const returnedBlog = await blogService.create(blogObject)
            const message= `a new blog ${returnedBlog.title} ${returnedBlog.author} added`
            const cls = "sucess"
            setAddedBlog(returnedBlog, message,cls)
            setnewTitle('')
            setnewAuthor('')
            setnewUrl('')
          
        }catch (error) {
          const message= `title and author are requred fields`
          const cls = "error"
          setAddedBlog('',message,cls)
      }
    }
  return (
    <form onSubmit={addBlog}>
       <div>
        title:
         <input
            type="text"
            value={newTitle}
            name="Username"
            onChange={({ target }) => setnewTitle(target.value)}
           />
        </div>
        <div> 
        author:
          <input
            value={newAuthor}
            onChange={({ target }) => setnewAuthor(target.value)}  
          />
      </div>
      <div>
       url: 
          <input
            value={newUrl}
            onChange={({ target }) => setnewUrl(target.value)}  
         />
      </div>
      <button type="submit">create</button>
    </form>  
  )
}

export default BlogForm