const Blog = ({ blog }) => (
  <div className="pt-2">
    {blog.title} by {blog.author}
  </div>
)

export default Blog
