const lodash = require("lodash")

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce((previous, current) =>
    previous.likes > current.likes ? previous : current
  )
  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes,
  }
}

const mostBlogs = (blogs) => {
  const authors = lodash.map(blogs, "author")
  const author = lodash
    .chain(authors)
    .countBy()
    .toPairs()
    .max(lodash.last)
    .head()
    .value()
  const authorWithMostBlogs = blogs.find((blog) => blog.author === author)

  return authorWithMostBlogs.author
}

const mostLikes = (blogs) => {
  const authors = lodash.uniq(lodash.map(blogs, "author"))
  const likes = {}

  for (let i = 0; i < authors.length; i++) {
    likes[authors[i]] = 0
  }
  for (let i = 0; i < blogs.length; i++) {
    likes[blogs[i].author] += blogs[i].likes
  }

  return lodash.maxBy(lodash.keys(likes), function (o) {
    return likes[o]
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
