import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import BlogForm from './components/BlogForm'
import './App.css'

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
const App=() =>{

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [clName, setClName] = useState('')

//load all blogs 
  useEffect(() => {
    console.log('blogs load')
    blogService
      .getAll()
      .then(initialBlogs=> {
        setBlogs(initialBlogs)
      })
  }, [])

//set token if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

//sets added blog to state and sets message and style to display
  const setAddedBlog =(returnedBlog, message, cls)=>{
    if (returnedBlog){
      setBlogs(blogs.concat(returnedBlog))
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
        username, password,
      })
     window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    window.localStorage.removeItem('loggedNoteappUser')
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
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
  </div>
  <div>
    password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
    />
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
      <h2>create new</h2>
      <BlogForm setAddedBlog={setAddedBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App;
