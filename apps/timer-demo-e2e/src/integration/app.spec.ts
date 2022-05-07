import { getGreeting } from '../support/app.po';

describe('timer-demo', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    // https://docs.cypress.io/api/cypress-api/custom-commands#Syntax
    // cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Timer');
  });
});
