
/// Form Authentication
// Objective: Write a Cypress test to automate the login process on the Form Authentication page.

// Instructions:
// Navigate to the Form Authentication page at https://the-internet.herokuapp.com/login.
// Enter a username and password. Use "tomsmith" for the username and "SuperSecretPassword!" for the password.
// Click the Login button.
// Verify that you are redirected to the secure area and that a logout button is visible.
// Log out from the application and verify that you are back on the login page. 


let username = "tomsmith";
let password = "SuperSecretPassword!";

function BeforeLogin() {
  
  cy.visit(("https://the-internet.herokuapp.com/login"))
  cy.url().then((URL) => {

     if (URL.includes("login")) {
      cy.log("Login Page Successfully Loads!")
     }else{cy.log("Login Page Did Not Appear")}
  })

  cy.get('h2').should("contain", "Login Page")
  
  cy.get('[name="username"]').should("be.visible")
  cy.get('[name="password"]').should("be.visible")

  cy.get(':nth-child(1) > .large-6 > label').should("contain", "Username")
  cy.get(':nth-child(2) > .large-6 > label').should("contain", "Password")
  cy.get('.radius').should("contain", "Login")
}


function AfterLogin(){
  cy.url().should('include', '/secure')
  cy.contains('You logged into a secure area!').should('be.visible')
  cy.contains('Logout').should('be.visible')
  cy.log('Successfully logged into secure area')
}

function LogoutAndVerifyLoginPage(){
  cy.contains('Logout').click()
  cy.url().should('include', '/login')
  cy.get('h2').should('contain', 'Login Page')
  cy.get('[name="username"]').should('be.visible')
  cy.get('[name="password"]').should('be.visible')
  cy.contains('You logged out of the secure area!').should('be.visible')
  cy.log('Successfully logged out and returned to login page')
}

function Enter_validinputs (){
   
  cy.get('[name="username"]').type(username).debug()
  cy.get('[name="password"]').type(password)

  cy.log("Checking login form")
  cy.get('.radius').click()
}
 
describe('Login Page', () => { 
    
  it ("Enter Valid Credentials", () => {
    BeforeLogin()
    Enter_validinputs()
    AfterLogin()
    LogoutAndVerifyLoginPage()
  })
});