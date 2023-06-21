import { useState } from 'react'
import blogService from '../services/blogs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Blog = ({ blog, token }) => {
  const [visibility, setVisibility] = useState(false)

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  const newPost = {
    tittle: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.update(blog.id, newPost, token)
      if (response.data) {
        toast.success(`You liked ${blog.title}`)
      }
    } catch (error) {
      toast.error('Sorry likes are not accepted today')
    } finally {
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl border-white border-solid border-2 border-opacity-10 indicator flex flex-col my-4">
      <button
        className="indicator-item badge badge-primary"
        onClick={handleVisibility}
      >
        {visibility ? 'Hide' : 'Show'}
      </button>

      {visibility ? (
        <div>
          <div className="card-body">
            <div className="mb-2">
              <h2 className="card-title">{blog.title}</h2>
              <h3 className=" font-normal">By {blog.author} </h3>
            </div>
            <div className="mb-4">
              <a href={blog.url}>{blog.url}</a>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Likes {blog.likes}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-body">
          <div>
            <h2 className="card-title">
              {blog.title} By {blog.author}
            </h2>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default Blog
