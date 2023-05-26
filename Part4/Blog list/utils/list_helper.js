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



module.exports = {
  dummy,
  totalLikes
}