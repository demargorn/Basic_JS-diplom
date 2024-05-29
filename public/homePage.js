'use strict';

const logout = new LogoutButton();
logout.action = function() {
   ApiConnector.logout(response => {
      if (response) {
         location.reload();
      } else {
         userForm.setLoginErrorMessage('Не удалось выйти');
      };
   });
};
