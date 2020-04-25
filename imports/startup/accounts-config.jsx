import { Accounts } from 'meteor/accounts-base'


// Set the configuration of the AccountsIUWrapper
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});