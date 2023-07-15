import React, { useContext, useState, useEffect } from "react";
import { Pressable, Text, TextInput, View, ToastAndroid } from "react-native";
import { styles } from "../layout/styleSheet";
import { verifyUserCredentials, addUser } from '../database-service';
import { LoginContext } from "./SignIn";


export default SignUp = ({ navigation }) => {
    const [loginState, setLoginState] = useContext(LoginContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function signUp() {
        verifyUserCredentials(userName, password, (user) => {
            if (user == undefined) {
                addUser(userName, password, () => {
                    setLoginState({ signedIn: true, token: "temporaryToken", userName: userName });
                });

            }
        })
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
                <View style={[styles.logInButtons]}>
                    <Pressable
                        title="Sign Up"
                        onPress={() => { signUp(userName, password) }}
                        style={styles.defaultMainButton}
                    >
                        <Text
                            style={[styles.buttonText]}
                        >Sign Up</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('SignIn')
                        }}>
                        <Text style={styles.backText}>Back to Login</Text>
                    </Pressable>
                </View>
            </View >
        </>
    )
}