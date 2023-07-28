/* eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]
    totalLikes += blog.likes
  }

  return totalLikes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favorite = blogs[0]

  for (let i = 1; i < blogs.length; i++) {
    const blog = blogs[i]
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  }

  return favorite
}

const mostBlogs = (blogs) => {
  const authorStats = {}

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]
    const author = blog.author

    if (author in authorStats) {
      authorStats[author]++
    } else {
      authorStats[author] = 1
    }
  }

  let mostBlogsAuthor = null
  let mostBlogsCount = 0

  for (const author in authorStats) {
    const blogCount = authorStats[author]

    if (blogCount > mostBlogsCount) {
      mostBlogsCount = blogCount
      mostBlogsAuthor = author
    }
  }

  return { author: mostBlogsAuthor, blogs: mostBlogsCount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
