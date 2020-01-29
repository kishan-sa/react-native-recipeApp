import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginComponent from './components/LoginComponent';
import RecipeListComponent from './components/RecipeListComonent';

export default function App() {
  return (
    <RecipeListComponent></RecipeListComponent>
    // <LoginComponent></LoginComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
