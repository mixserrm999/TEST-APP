import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function SettingsScreen({ isDarkMode, setIsDarkMode }) {
  const { colors } = useTheme();

  const toggleSwitch = () => setIsDarkMode((prevState) => !prevState);

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderColor: colors.border }]}>
      <Text style={[styles.text, { color: colors.text }]}>Settings Page</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.text, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleSwitch}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
});