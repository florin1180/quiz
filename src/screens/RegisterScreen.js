import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {
  const [first_name, setFirst] = useState(null);
  const [last_name, setLast] = useState(null);
  const [user_name, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {isLoading, register} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={first_name}
          placeholder="Enter First Name"
          onChangeText={text => setFirst(text)}
        />

        <TextInput
          style={styles.input}
          value={last_name}
          placeholder="Enter Last Name"
          onChangeText={text => setLast(text)}
        />

        <TextInput
          style={styles.input}
          value={user_name}
          placeholder="Enter User Name"
          onChangeText={text => setUser(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Register"
          onPress={() => {
            register(first_name, last_name, user_name, email, password);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default RegisterScreen;
