import React from 'react'
import { render,fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'


describe('Simple Blog Component Tests', () => {

  test('component renders the title, author and amount of likes', () => {
    const blog = {
      title: 'Testing Title of the blog',
      author: 'Some Author',
      likes:1
    }
    const  component = render(
      <SimpleBlog blog={blog} />
    )
    expect(component.container).toHaveTextContent(
      'Testing Title of the blog')

    expect(component.container).toHaveTextContent(
      'Some Author')

    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent( `blog has ${blog.likes} likes`)
  })

  test('clicking the button calls event handler twice', () => {
    const blog = {
      title: 'Testing Title of the blog',
      author: 'Some Author',
      likes:1
    }
    const mockHandler = jest.fn()

    const  { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

