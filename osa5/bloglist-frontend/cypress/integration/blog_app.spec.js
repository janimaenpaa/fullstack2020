describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      name: "Matti Meikäläinen",
      username: "mmeika",
      password: "salainen",
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login from is shown", function () {
    cy.get("#username")
    cy.get("#password")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("mmeika")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()

      cy.contains("Matti Meikäläinen logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrongUser")
      cy.get("#password").type("wrongPassword")
      cy.get("#login-button").click()

      cy.contains("wrong username or password")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      cy.login({ username: "mmeika", password: "salainen" })
    })

    it("A blog can be created", function () {
      const blog = {
        title: "Getting Started With React.js",
        author: "John Smith",
        url: "http://reactjs.org",
      }
      cy.createBlog(blog)
      cy.contains("Getting Started With React.js John Smith")
    })

    it("A blog can be liked", function () {
      const blog = {
        title: "Getting Started With React.js",
        author: "John Smith",
        url: "http://reactjs.org",
      }
      cy.createBlog(blog)

      cy.contains("view").click()
      cy.contains("likes 0")
      cy.contains("like").click()
      cy.contains("likes 1")
    })

    it("A blog can be removed", function () {
      const blog = {
        title: "Getting Started With React.js",
        author: "John Smith",
        url: "http://reactjs.org",
      }
      cy.createBlog(blog)

      cy.contains("view").click()
      cy.contains("remove").click()
      cy.contains("Getting Started With React.js John Smith").should(
        "not.exist"
      )
    })

    it("Blogs are sorted by likes", function () {
      const blog = {
        title: "Blog 1",
        author: "John Smith",
        url: "http://reactjs.org",
      }
      const blog2 = {
        title: "Blog 2",
        author: "John Smith",
        url: "http://reactjs.org",
        likes: 5,
      }
      const blog3 = {
        title: "Blog 3",
        author: "John Smith",
        url: "http://reactjs.org",
        likes: 10,
      }
      cy.createBlog(blog)
      cy.createBlog(blog3)
      cy.createBlog(blog2)

      cy.get(".blog")
        .should(($blogs) => {
          expect($blogs[0]).to.contain("Blog 3")
          expect($blogs[1]).to.contain("Blog 2")
          expect($blogs[2]).to.contain("Blog 1")
        })
    })
  })
})
