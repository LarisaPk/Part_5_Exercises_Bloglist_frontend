import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {

  const response = await axios.get(baseUrl)

  var result  = response.data.map(blog => ({
    id: blog.id,
    likes: blog.likes,
    title:blog.title,
    author:blog.author,
    url:blog.url,
    username:blog.user.username,
    user:blog.user.id,
    name:blog.user.name
  })
  )
  return result
}
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return  response.data
}

const remove = async (id) => {

  const confDelete = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, confDelete)
}

export default { getAll, setToken, create, update, remove }