import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import PhoneInput from "../../components/PhoneInput/PhoneInput";
import PrimaryButton from '../../components/Button/PrimaryButton';



export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState("");
    // const isPhoneValid = phoneNumber.length === 10;
    const isPhoneValid = /^[6-9]\d{9}$/.test(phoneNumber);
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.subtitle}>WELCOME</Text>
                <Text style={styles.title}>Log in</Text>
                <Text style={styles.subtitle}>PHONE NUMBER</Text>
                <PhoneInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                {phoneNumber.length > 0 && !isPhoneValid && (
                    <Text style={styles.error}>
                        Enter a valid 10-digit mobile number
                    </Text>
                )}
            </View>

            <View style={styles.footer}>
                <PrimaryButton
                    title="Send OTP"
                    onPress={() => console.log("Send OTP")}
                    disabled={!isPhoneValid}
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
    }, header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }, footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
    }, error: {
        color: "#FF4D4F",
        fontSize: 14,
        marginTop: 8,
    },
});