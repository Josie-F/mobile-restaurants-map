import React, { useContext, useState, useEffect } from "react";
import { Pressable, Text, TextInput, View, ToastAndroid } from "react-native";
import { styles } from "../layout/styleSheet";
import { verifyUserCredentials } from '../database-service';

export const LoginContext = React.createContext({ loginState: { userName: '', signedIn: false, token: null }, setLoginState: () => { } });

// Sign in Component
export default SignIn = ({ navigation }) => {
    const [loginState, setLoginState] = useContext(LoginContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function checkUserCredentials() {
        if (userName && password) {
            verifyUserCredentials(userName, password, (user) => {
                if (user) {
                    setLoginState({ signedIn: true, token: user.id, userName: user.username })
                } else {
                    ToastAndroid.show("This user doesn't seem to exist, Please try again", ToastAndroid.SHORT)
                }
            })
        } else {
            ToastAndroid.show("Username and password must not be empty", ToastAndroid.LONG)
        }

    }

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.loginInputContainer]}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <></>
                    <TextInput
                        placeholder="Username"
                        value={userName}
                        onChangeText={setUserName}
                        style={[styles.inputs]}
                    />
                    <Text style={styles.inputLabel}>Password</Text>
                    <></>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        style={[styles.inputs]}
                    />
                </View>
                <View style={[styles.forgotPasswordText]}>
                    <Pressable
                        title="Forgot password"
                        onPress={() => {
                            ToastAndroid.show("This feature has not been implemented yet!", ToastAndroid.SHORT)
                        }}
                    >
                        <Text style={{ fontSize: 12 }}>Forgot Password?</Text>
                    </Pressable>
                </View>
                <View style={[styles.logInButtons]}>
                    <View style={[styles.loginMainContent]}>
                        <Text>Don't have an account?</Text>
                    </View>
                    <Pressable
                        title="Sign Up"
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                        style={styles.secondaryButton}
                    >
                        <Text
                            style={[styles.buttonTextSecondary]}
                        >Sign Up</Text>
                    </Pressable>
                    <Pressable
                        title="Log In"
                        onPress={() => { checkUserCredentials(userName, password) }}
                        style={[styles.defaultMainButton]}>
                        <Text
                            style={[styles.buttonText]}
                        >Sign In</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}