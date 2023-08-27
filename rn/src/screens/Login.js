import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    // Very basic email validation
    return email.includes('@') && email.includes('.');
  };

  const handleLogin = () => {
    const isEmailOK = validateEmail(email);
    if (email && password && isEmailOK && password.length >= 4) {
      setIsValid(true);
      setIsPasswordValid(true);
      setIsEmailValid(true);
      navigation.navigate('Home');
    } else {
      setIsValid(email && password);
      setIsPasswordValid(password.length >= 4);
      setIsEmailValid(isEmailOK);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {!isEmailValid && (
        <Text style={styles.errorText}>Digite um email válido.</Text>
      )}
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {!isPasswordValid && (
        <Text style={styles.errorText}>A senha deve ter no mínimo 4 caracteres.</Text>
      )}
      {!isValid && (
        <Text style={styles.errorText}>Preencha os campos corretamente.</Text>
      )}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#0095f6',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#0095f6',
    fontSize: 14,
  },
});