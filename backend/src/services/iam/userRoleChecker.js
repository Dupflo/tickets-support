const Roles = require('../../security/roles')

modules.exports = class UserRoleChecker {

    static isTicketOwner(currentUser) {
        if (!currentUser || !currentUser.roles) {
            return false;
        }

        return !currentUser.roles.some((role) => {
            return [
                Roles.values.manager,
                Roles.values.employee,
            ].includes(role);
        })
    }

    static isManager(currentUser) {
        if (!currentUser || !currentUser.roles) {
            return false;
        }

        return currentUser.roles.some((role) => {
            return role === Roles.values.manager;
        })
    }

    static isEmployee(currentUser) {

        if (!currentUser || !currentUser.roles) {
            return false;
        }
        
        return (
            !this.isManager(currentUser) 
            && !this.isTicketOwner(currentUser)
        )
    }
}