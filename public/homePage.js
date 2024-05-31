'use strict';

// выход из учетной записи
const logoutButton = new LogoutButton();
logoutButton.action = function() {
   ApiConnector.logout(response => {
      if (response.success) {
         location.reload();
      } else {
         userForm.setLoginErrorMessage(response.error);
      };
   });
};

// получение данных о пользователе
ApiConnector.current(response => {
   if (response.success) {
      ProfileWidget.showProfile(response.data);
   };
});

// запрос курса валют
const ratesBoard = new RatesBoard();
function getStonks() {
   ApiConnector.getStocks(response => {
      if (response.success) {
         ratesBoard.clearTable();
         ratesBoard.fillTable(response.data);
      };
   });
};
getStonks();
setInterval(getStonks, 60000);

// пополнение кошелька
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function(data) {
   ApiConnector.addMoney(data, response => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
      } else {
         moneyManager.setMessage('', response.error);
      };
   });
};

// конвертация валюты
moneyManager.conversionMoneyCallback = function(data) {
   ApiConnector.convertMoney(data, response => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
      } else {
         moneyManager.setMessage('', response.error);
      };
   });
};

// перевод валюты
moneyManager.sendMoneyCallback = function(data) {
   ApiConnector.transferMoney(data, response => {
      if (response.success) {
         ProfileWidget.showProfile(response.data);
      } else {
         moneyManager.setMessage('', response.error);
      };
   });
};

// запрос начального списка избранных пользователей
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
   if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
   };
});

// добавление пользователя(ей) в список избранных
favoritesWidget.addUserCallback = function(data) {
   ApiConnector.addUserToFavorites(data, response => {
      if (response.success) {
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
      } else {
         moneyManager.setMessage('', response.error);
      };
   });
};

// удаление пользователя(ей) в список избранных
favoritesWidget.removeUserCallback = function(data) {
   ApiConnector.removeUserFromFavorites(data, response => {
      if (response.success) {
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
      } else {
         moneyManager.setMessage('', response.error);
      };
   });
};
