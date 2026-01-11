// Ignoriši React greške
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Minified React error') || err.message.includes('React error')) {
    return false;
  }
  return true;
});

describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('/practice/basiclogin');
    cy.scrollTo('top'); // Scroll na vrh stranice
    cy.get('form[data-cy="basic-login-form"]', { timeout: 15000 }).should('be.visible');
  });

  describe('Positive Tests', () => {
    it('should successfully login with valid credentials', () => {
      // Prekidamo lančane komande zbog React re-rendering problema
      cy.get('#username').clear();
      cy.get('#username').type('testcat');
      cy.get('#password').clear();
      cy.get('#password').type('testcat');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/LOGIN SUCCESSFUL/i, { timeout: 10000 }).should('be.visible');
    });
  });

  describe('Negative Tests', () => {
    it('should show error with valid username and invalid password', () => {
      cy.get('#username').clear();
      cy.get('#username').type('testcat');
      cy.get('#password').clear();
      cy.get('#password').type('wrongpass');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with invalid username and valid password', () => {
      cy.get('#username').clear();
      cy.get('#username').type('wrongpass');
      cy.get('#password').clear();
      cy.get('#password').type('testcat');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with both invalid credentials', () => {
      cy.get('#username').clear();
      cy.get('#username').type('wrongpass');
      cy.get('#password').clear();
      cy.get('#password').type('wrongpass');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with empty username and empty password', () => {
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with empty username and valid password', () => {
      // Prekidamo lančani poziv zbog React re-rendering problema
      cy.get('#password').clear();
      cy.get('#password').type('testcat');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with valid username and empty password', () => {
      cy.get('#username').clear();
      cy.get('#username').type('testcat');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with empty username and invalid password', () => {
      cy.get('#password').clear();
      cy.get('#password').type('wrongpass');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });

    it('should show error with invalid username and empty password', () => {
      cy.get('#username').clear();
      cy.get('#username').type('wrongpass');
      cy.get('[data-cy="basic-login-submit-button"]').click();
      cy.contains(/username.*password.*not.*correct/i, { timeout: 8000 }).should('be.visible');
    });
  });
});
