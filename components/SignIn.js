import React, { useContext, useState, useEffect } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../layout/styleSheet";
import { verifyUserCredentials } from '../database-service';

export const LoginContext = React.createContext({ loginState: { userName: '', signedIn: false, token: null }, setLoginState: () => { } });


export default SignIn = ({ navigation }) => {
    const [loginState, setLoginState] = useContext(LoginContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function checkUserCredentials() {
        console.log(userName, password)
        verifyUserCredentials(userName, password, (user) => {
            console.log(user, "user")
            if (user) {
                setLoginState({ signedIn: true, token: user.id, userName: user.username })
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
                <View style={[styles.loginMainContent]}>
                    <Text style={{ fontSize: 10 }}>Forgot Password?</Text>
                    <Text>Don't have an account?</Text>
                </View>
                <View style={[styles.logInButtons]}>
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