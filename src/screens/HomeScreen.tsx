import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * Placeholder home screen for the Money Journal app.
 * Displays app branding while features are being developed.
 */
const HomeScreen = (): React.JSX.Element => {
  return (
    <View style={styles.container} testID="home-screen">
      <Text style={styles.title} accessibilityRole="header">
        Money Journal
      </Text>
      <Text style={styles.subtitle}>Your personal finance companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HomeScreen;
