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

      cy.contains('Matti Meikäläinen logged in')
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrongUser")
      cy.get("#password").type("wrongPassword")
      cy.get("#login-button").click()
      
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      // log in user here
      cy.get("#username").type("mmeika")
      cy.get("#password").type("salainen")
      cy.get("#login-button").click()

      cy.contains("create new blog").click()
      cy.get("#title").type("Getting Started With React.js")
      cy.get("#author").type("John Smith")
      cy.get("#url").type("http://reactjs.org")
      cy.get("#create").click()
    })

    it('A blog can be created', function() {
      cy.contains("Getting Started With React.js John Smith")
    })

    it("A blog can be liked", function() {
        cy.contains("view").click()
        cy.contains("likes 0")
        cy.contains("like").click()
        cy.contains("likes 1")
    })

    it("A blog can be removed", function() {
        cy.contains("view").click()
        cy.get("#removeBlog").click()
    })
  })

})
