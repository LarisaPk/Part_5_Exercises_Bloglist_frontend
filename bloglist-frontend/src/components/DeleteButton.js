import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const DeleteButton = ({ updateBlogState, blog, user }) => {
  const buttonStyle = {
    backgroundColor: 'blue'
  }
  const removeBlog = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      updateBlogState()
    }
  }

  if (user.username===blog.username) {
    return (
      <button style={buttonStyle} onClick={removeBlog}>remove</button>
    )
  }
  return (
    <></>
  )
}
DeleteButton.propTypes = {
  updateBlogState: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}
export default DeleteButton