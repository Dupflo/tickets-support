import Roles from 'security/roles';
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [
          roles.manager,
          roles.employee,
        ],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
        ],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.manager,
          roles.employee,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
        ],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.manager],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.manager],
      },
      ticketImport: {
        id: 'ticketImport',
        allowedRoles: [
          roles.manager,
          roles.employee,
        ],
      },
      ticketCreate: {
        id: 'ticketCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
        allowedStorageFolders: ['ticket'],
      },
      ticketEdit: {
        id: 'ticketEdit',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
        allowedStorageFolders: ['ticket'],
      },
      ticketDestroy: {
        id: 'ticketDestroy',
        allowedRoles: [
          roles.manager,
          roles.employee
        ],
        allowedStorageFolders: ['ticket'],
      },
      ticketRead: {
        id: 'ticketRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
      },
      ticketAutocomplete: {
        id: 'ticketAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
      },

      requestImport: {
        id: 'requestImport',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
      },
      requestCreate: {
        id: 'requestCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
        allowedStorageFolders: ['request'],
      },
      requestEdit: {
        id: 'requestEdit',
        allowedRoles: [
          roles.manager
        ],
        allowedStorageFolders: ['request'],
      },
      requestDestroy: {
        id: 'requestDestroy',
        allowedRoles: [
          roles.manager
        ],
        allowedStorageFolders: ['request'],
      },
      requestRead: {
        id: 'requestRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
      },
      requestAutocomplete: {
        id: 'requestAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.ticketOwner
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
