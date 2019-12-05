import React, { useState } from 'react'
import blogService from '../services/blogs'
import DeleteButton from './DeleteButton'

const Blog = ({ blog, updateBlogState, user }) => {

  const [allvisible, setallVisible] = useState(false)

  const hideWhenVisible = { display: allvisible ? 'none' : '' }
  const showWhenVisible = { display: allvisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setallVisible(!allvisible)
  }

  const addLike = async () => {
    const newLikes =blog.likes+1

    const blogObject = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url:blog.url,
      likes: newLikes
    }

    const updatedBlog = await blogService.update(blog.id, blogObject)
    console.log(updatedBlog)

    console.log(newLikes)
    updateBlogState()
  }

  return(
    <div style={blogStyle} className="blog">

      <div onClick={toggleVisibility} style={hideWhenVisible} className="shown">
        {blog.title} {blog.author}
      </div>

      <div  style={showWhenVisible} className="hidden">
        <div onClick={toggleVisibility}> {blog.title} {blog.author}</div>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes <button onClick={addLike}>like</button><br />
      added by {blog.name}<br />
        <DeleteButton updateBlogState={updateBlogState} blog={blog} user={user}/>
      </div>

    </div>
  )
}

export default Blog