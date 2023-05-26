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




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}