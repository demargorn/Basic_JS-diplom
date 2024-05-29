'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
   ApiConnector.login(data, response => {
      if(response.success) {
         location.reload();
      } else {
         userForm.setLoginErrorMessage('Ошибка входа');
      };
   });
};

userForm.registerFormCallback = (data) => {
   ApiConnector.register(data, response => {
      if(response.success) {
         location.reload();
      } else {
         userForm.setLoginErrorMessage('Неудачная регистрация');
      };
   });
};