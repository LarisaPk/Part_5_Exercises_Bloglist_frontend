import React from 'react'
import blogService from '../services/blogs'
import  { useField } from '../hooks'

const BlogForm = ({ handleAddedBlog }) => {

  const newtitle = useField('text')
  const newauthor = useField('text')
  const newurl = useField('text')

  const addBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: newtitle.i.value,
        author: newauthor.i.value,
        url: newurl.i.value,
      }
      const returnedBlog = await blogService.create(blogObject)
      const message= `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      const cls = 'sucess'
      handleAddedBlog(returnedBlog, message,cls)
      newtitle.reset()
      newauthor.reset()
      newurl.reset()

    }catch (error) {
      const message= 'title and author are requred fields'
      const cls = 'error'
      handleAddedBlog('',message,cls)
    }
  }
  return (
  <>
  <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input { ...newtitle.i }/>
      </div>
      <div>
        author:
        <input { ...newauthor.i }/>
      </div>
      <div>
       url:
        <input { ...newurl.i }/>
      </div>
      <button type="submit">create</button>
    </form>
  </>
  )
}

export default BlogForm