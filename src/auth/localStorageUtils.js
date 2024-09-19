// localStorageUtils.js

export const saveUserDataToLocalStorage = (userData) => {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    usersData.push(userData);
    localStorage.setItem('usersData', JSON.stringify(usersData));
  };
  
  export const getUserDataFromLocalStorage = () => {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
    return usersData;
  };
  