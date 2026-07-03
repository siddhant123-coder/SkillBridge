import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Logo from '../../components/Logo/logo';
import PrimaryButton from '../../components/Button/PrimaryButton';
export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Logo />
        <Text style={styles.title}>SkillBridge</Text>
        <Text style={styles.subtitle}>Learn from real people near you</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Get Started"
          onPress={() => console.log("Get Started")}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
  }, title: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700'
  }, subtitle: {
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 8,
  }, hero: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }, footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});