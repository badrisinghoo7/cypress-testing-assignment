describe("Home Page Load Test",()=>{
beforeEach(()=>{

    cy.visit("https://opensource-demo.orangehrmlive.com/")


   

})

 it("Verify that key UI elements (such as the login form or headline) are rendered correctly.",()=>{

        cy.get(".orangehrm-login-title").should("be.text","Login")
        cy.get(".oxd-form").should("exist")
    })

it("Ensure that username and password fields are visible.",()=>{
    cy.get('input[name="username"]').should("be.visible")
    cy.get('input[name="password"]').should("be.visible")
})

it("Check that the login button is present and clickable.",()=>{

    cy.get('button[type="submit"]').should("be.visible").and("be.enabled")
})


it('Verify invalid login alert', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-alert-content-text') 
      .should("be.visible")
      .and("contain.text", "Invalid credentials");
  });

  it("Confirm that an error message appears and that the user is not redirected.",()=>{


    cy.get('button[type="submit"]').click();

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .eq(0)
      .should('be.visible')
      .and('contain.text', 'Required');

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .eq(1)
      .should('be.visible')
      .and('contain.text', 'Required');
  })



})

describe("Successful Login & Redirection Test",()=>{
    beforeEach(()=>{
        cy.visit("https://opensource-demo.orangehrmlive.com/")
       
    })
    it("Verify successful login and redirection to the dashboard.",()=>{
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/index.php/dashboard');

        
        cy.get('.oxd-topbar-header-breadcrumb-module').should("contain.text","Dashboard")
        
    })
})