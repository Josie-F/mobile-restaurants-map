import React, { useState, useEffect } from "react";
import { Text, Pressable, View, TextInput } from "react-native";
import { styles } from "../layout/styleSheet";
import * as Location from 'expo-location'

export default Home = ({ navigation, route }) => {
    const [location, setLocation] = useState(null);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [postalLocation, setPostalLocation] = useState(null);

    useEffect(() => {
        (async () => {
            console.log('asking permissions')
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Access to location was denied - please update this in your settings');
                return;
            }
            const locale = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
            if (locale && !location && !postalLocation) {
                setCurrentRegion({
                    latitude: locale.coords.latitude,
                    longitude: locale.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                const post = await Location.reverseGeocodeAsync({
                    latitude: locale.coords.latitude,
                    longitude: locale.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
                setPostalLocation(post[0])
                setLocation(locale);
                console.log(currentRegion, "current region")
                console.log(post, "current post")
            }

        })();
    }, [location, postalLocation]);

    return (
        <>
            <View style={[styles.homeContainer]}>
                <Text style={styles.welcomeTitle}>Welcome {route.params?.userName}</Text>
                <Text style={styles.locationText}>Your Location is: {postalLocation ? `${postalLocation?.city || postalLocation?.subregion}, ${postalLocation?.postalCode}` : `Loading...`} </Text>
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
                        navigation.navigate('Map', { location: location })
                    }}
                    style={styles.defaultMainButton}
                >
                    <Text style={[styles.buttonText]}>
                        Find my Food
                    </Text>
                </Pressable>
            </View>
        </>
    )
}