import React, { useState, useEffect } from "react";
import { Text, Pressable, View, TextInput, ToastAndroid } from "react-native";
import { styles } from "../layout/styleSheet";
import * as Location from 'expo-location'

export default Home = ({ navigation, route }) => {
    const [location, setLocation] = useState(null);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [postalLocation, setPostalLocation] = useState(null);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Access to location was denied');
                ToastAndroid.show("Access to location was denied! - Change this feature in your settings to be able to continue using this app", ToastAndroid.LONG)
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
            }

        })();
    }, [location, postalLocation]);
    console.log('filter', filter)

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
                        value={filter}
                        onChangeText={setFilter}
                    />
                </View>
            </View>
            <View style={[styles.logInButtons]}>
                <Pressable
                    onPress={() => {
                        navigation.navigate('Map', { location: location, filter: filter })
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