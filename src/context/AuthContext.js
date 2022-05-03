import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [userPassword, setUserPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (first_name, last_name, user_name, email, password) => {
    setIsLoading(true);

    var dataToSend = {
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      email: email,
      password: password,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://diacut.ro/PPL/register.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          console.log('Super')
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
    }

  //   axios
  //     .post(`${BASE_URL}/register.php`, {
  //       first_name,
  //       last_name,
  //       user_name,
  //       email,
  //       password,
  //     })
  //     .then(res => {
  //       let userInfo = res.data;
  //       setUserInfo(userInfo);
  //       AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  //       setIsLoading(false);
  //       console.log(userInfo);
  //     })
  //     .catch(e => {
  //       console.log(`register error ${e}`);
  //       setIsLoading(false);
  //     });
  // };

  const login = (user_name, password) => {
    setIsLoading(true);

    let dataToSend = {user_name: user_name, password: password };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://diacut.ro/PPL/login.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        console.log(responseJson);
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('userInfo', responseJson.data.user_name);
          // console.log(responseJson.data.email);f
          navigation.replace('Navigation');
        } else {
          console.log(responseJson);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

    // axios
    //   .post(`${BASE_URL}/login.php`, {
    //     user_name,
    //     password,
    //   })
    //   .then(res => {
    //     let userInfo = res.data;
    //     console.log(userInfo);
    //     setUserInfo(userInfo);
    //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    //     setIsLoading(false);
    //   })
    //   .catch(e => {
    //     console.log(`login error ${e}`);
    //     setIsLoading(false);
    //   });
    // };
  

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
