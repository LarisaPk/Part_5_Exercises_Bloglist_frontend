import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog>', () => {
  let component

  const blog = {
    title: 'Testing Title of the blog',
    author: 'Some Author',
    likes:1,
    url: '/url/fortest'
  }
  const user = {
    name: 'Name',

  }
  const updateBlogState = () => {
    console.log('delete clicked')

  }
  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} updateBlogState={updateBlogState}/>

    )
  })

  test('only the name and author of the blog post are shown by default', () => {
    const hiddendiv = component.container.querySelector('.hidden')
    expect(hiddendiv).toHaveStyle('display: none')

    const showndiv = component.container.querySelector('.shown')
    expect(showndiv).not.toHaveStyle('display: none')

  })

  test('when the blog post is clicked, the other information becomes visible', () => {

    const button = component.container.querySelector('.shown')
    fireEvent.click(button)

    const hiddendiv = component.container.querySelector('.hidden')
    expect(hiddendiv).not.toHaveStyle('display: none')

    const showndiv = component.container.querySelector('.shown')
    expect(showndiv).toHaveStyle('display: none')

  })

})
