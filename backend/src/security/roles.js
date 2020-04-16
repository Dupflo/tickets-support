/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      manager: 'manager',
      employee: 'employee',
      ticketOwner: 'ticketOwner',
    };
  }
}

module.exports = Roles;
