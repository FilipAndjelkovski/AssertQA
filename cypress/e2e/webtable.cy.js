// Ignoriši React greške
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Minified React error') || err.message.includes('React error')) {
    return false;
  }
  return true;
});

describe('Web Table Tests', () => {
  beforeEach(() => {
    cy.visit('/practice/webtables');
    cy.scrollTo('top'); // Scroll na vrh stranice
    cy.get('table', { timeout: 10000 }).should('be.visible');
  });

  it('should filter employees with Dept=Engineering and Status=Active, then sum their salaries', () => {
    // Scroll na vrh ponovo pre nego što počnemo sa filtriranjem
    cy.scrollTo('top');
    
    // Selektuj Department - koristimo native DOM API direktno u .then() da izbegnemo React re-rendering problem
    cy.get('[data-cy="department-filter"]').then(($select) => {
      const selectElement = $select[0];
      selectElement.value = 'Engineering';
      // Triggeruj change event direktno na DOM elementu
      const changeEvent = new Event('change', { bubbles: true });
      selectElement.dispatchEvent(changeEvent);
      // Takođe triggeruj input event za sigurnost
      const inputEvent = new Event('input', { bubbles: true });
      selectElement.dispatchEvent(inputEvent);
    });
    
    cy.wait(1000); // Sačekaj da React procesira promenu
    
    // Selektuj Status
    cy.get('[data-cy="status-filter"]')
      .should('be.visible')
      .select('Active');
    
    cy.wait(1000);
    
    // Proveri da je tabela filtriraна - proveravamo tabelu umesto select-a
    cy.get('tbody tr', { timeout: 5000 })
      .should('have.length.greaterThan', 0)
      .first()
      .find('td')
      .eq(6)
      .should('contain', 'Engineering');
    
    // Sakupljamo plate
    cy.get('tbody tr').then(($rows) => {
      const salaries = [];
      
      cy.wrap($rows).each(($row) => {
        cy.wrap($row).find('td').eq(6).invoke('text').then((dept) => {
          cy.wrap($row).find('td').eq(7).find('span').invoke('text').then((status) => {
            if (dept.trim() === 'Engineering' && status.trim() === 'Active') {
              cy.wrap($row).find('td').eq(5).invoke('text').then((salaryText) => {
                const salaryNumber = parseInt(salaryText.replace(/[$,]/g, ''), 10);
                salaries.push(salaryNumber);
              });
            }
          });
        });
      }).then(() => {
        const totalSalary = salaries.reduce((sum, salary) => sum + salary, 0);
        
        cy.log(`Broj zaposlenih sa Engineering/Active: ${salaries.length}`);
        cy.log(`Ukupna suma plata: $${totalSalary.toLocaleString()}`);
        
        expect(salaries.length).to.be.greaterThan(0);
        expect(totalSalary).to.be.greaterThan(0);
      });
    });
  });
});
