import React from "react";
import { Text, Pressable, View, TextInput } from "react-native";
import { styles } from "../layout/styleSheet";

export default Home = ({ navigation, route }) => {
    return (
        <>
            <View style={[styles.homeContainer]}>
                <Text style={styles.welcomeTitle}>Welcome {route.params.userName}</Text>
                <Text style={styles.locationText}>Your Location is: </Text>
                <View style={styles.mainContentContainer}>
                    <Text style={styles.mainContentText}>What food are you craving today?</Text>
                    <Text style={styles.mainContentText}>We'll find the highest rated places closest to you serving it!</Text>
                    <TextInput
                        placeholder="Search"
                        style={[styles.inputs, styles.searchInput]}
                    />
                </View>

            </View>
            <View style={[styles.logInButtons]}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('Map')
                    }}
                    style={styles.defaultMainButton}
                >
                    <Text
                        style={[styles.buttonText]}
                    >Find my Food</Text>
                </Pressable>
            </View>
        </>
    )
}