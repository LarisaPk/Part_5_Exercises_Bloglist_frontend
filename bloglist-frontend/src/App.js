import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import './App.css'
import Togglable from './components/Togglable'
import  { useField } from './hooks'

//component for displaying sucess/error operation messsage
const Notification = ({ message,clName }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={clName}>
      {message}
    </div>
  )
}
const App=() => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [clName, setClName] = useState('')

  const username = useField('text')
  const password = useField('text')

  //load all blogs
  useEffect(() => {
    console.log('blogs load')
    blogService
      .getAll()
      .then(initialBlogs => {
        const sorted = initialBlogs.sort(function(a, b){return a.likes - b.likes}).reverse()
        setBlogs(sorted)
      })
  }, [])

  //set token if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //when cheanges are made (likes added)
  const updateBlogState = () => {
    blogService
      .getAll()
      .then(initialBlogs => {
        const sorted = initialBlogs.sort(function(a, b){return a.likes - b.likes}).reverse()
        setBlogs(sorted)
      })
  }

  //sets added blog to state and sets message and style to display
  const handleAddedBlog =(returnedBlog, message, cls) => {
    if (returnedBlog){
      updateBlogState()
    }
    setMessage(message)
    setClName(cls)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.i.value,
        password: password.i.value,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()

    } catch (exception) {
      setMessage('Wrong username or password')
      setClName('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setMessage(`user ${user.name} logged out`)
    setClName('sucess')
    setUser(null)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  //generates login form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
    username
        <input { ...username.i }/>
      </div>
      <div>
    password
        <input {...password.i} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} clName={clName}/>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} clName={clName}/>

      <p>{user.name} logged in <button type="button" onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new blog" >
        <BlogForm handleAddedBlog={handleAddedBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog user={user} updateBlogState ={updateBlogState} key={blog.id} blog={blog}/>
      )}

    </div>
  )
}

export default App
