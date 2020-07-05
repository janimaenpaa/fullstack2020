require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server")
const mongoose = require("mongoose")
const Author = require("./models/Author")
const Book = require("./models/Book")

mongoose.set("useFindAndModify", false)

console.log(`connecting to ${process.env.MONGODB_URI}`)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.find({ name: args.author })

      if (args.author && args.genre) {
        return Book.find({ author, genres: args.genre })
      }

      if (args.author) {
        return Book.find({ author })
      }

      if (args.genre) {
        return Book.find({ genres: args.genre })
      }

      return Book.find({})
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      //const count = books.filter((book) => book.author === root.name)
      const author = await Author.find({ name: root.name })
      console.log(author);
      
      return Book.find({ author }).countDocuments()
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let authorFound = await Author.findOne({ name: args.author })

      if (!authorFound) {
        authorFound = new Author({ name: args.author, born: null })
        authorFound.save()
      }

      const book = new Book({ ...args, author: authorFound })
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
