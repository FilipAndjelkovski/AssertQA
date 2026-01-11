// Ignoriši React greške
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Minified React error') || err.message.includes('React error')) {
    return false;
  }
  return true;
});

describe('Loading Animation Tests', () => {
  beforeEach(() => {
    // Otvori stranicu
    cy.visit('/practice/loadinganimation');
    cy.scrollTo('top'); // Scroll na vrh stranice
    
    // Čekaj da se dugme učita
    cy.get('[data-cy="loading-animation-start-button"]', { timeout: 10000 }).should('be.visible');
  });

  it('should click button, wait for loading to complete, and show TEST PASSED message', () => {
    // Klikni na dugme "Start Test Cat"
    // Prekidamo lančanu komandu zbog React re-rendering problema
    cy.get('[data-cy="loading-animation-start-button"]').should('be.visible');
    cy.get('[data-cy="loading-animation-start-button"]').click();
    
    // Čekaj da se pojavi "passed-state" div
    // Ovo znači da je animacija završena
    // Timeout od 10000ms (10 sekundi) pokriva maksimalno trajanje od 6 sekundi + dodatno vreme
    cy.get('[data-cy="loading-animation-passed-state"]', { timeout: 10000 }).should('be.visible');
    
    // Potvrdi da je poruka "TEST PASSED" vidljiva i sadrži tačan tekst
    cy.get('[data-cy="loading-animation-result-title"]')
      .should('be.visible')
      .and('contain', 'TEST PASSED');
    
    // Opcionalno: potvrdi da postoji i poruka o uspešnom završetku
    cy.get('[data-cy="loading-animation-result-message"]')
      .should('be.visible')
      .and('contain', 'Loading animation has successfully completed');
  });
});
