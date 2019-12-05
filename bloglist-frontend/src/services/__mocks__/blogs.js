const blogs = [
  {
    likes: 84,
    title: 'Test blog with user',
    author: 'Some Author5',
    url: '/url/url.com',
    user: {
      username: 'New User 2',
      name: 'user2',
      id: '5dc18dec9c5ac136c074138a'
    },
    id: '5dc1acedeb35da3a88040627'
  },
  {
    likes: 1,
    title: 'Test blog with user 2',
    author: 'Some Authorqwerty',
    url: '/url/url.com',
    user: {
      username: 'New User 2',
      name: 'user2',
      id: '5dc18dec9c5ac136c074138a'
    },
    id: '5dc1b246fb95802478fa7151'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
// eslint-disable-next-line no-unused-vars
let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }