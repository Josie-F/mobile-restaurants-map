import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Text, View, FlatList } from "react-native";
import { styles } from "../layout/styleSheet";
import * as Location from 'expo-location'
import { TextInput } from "react-native";


export default MapPage = ({ navigation, route }) => {
    const [location, setLocation] = useState(null);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Access to location was denied - please update this in your settings');
                return;
            }
            console.log("before locale")
            const locale = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });

            setLocation(locale);
            if (location) {
                setCurrentRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                console.log(currentRegion, "current region")
            }

        })();
    }, [location]);

    const mockRestaurantData = [
        {
            id: '1',
            title: 'First Item',
        },
        {
            id: '2',
            title: 'Second Item',
        },
        {
            id: '3',
            title: 'Third Item',
        },
    ];

    const Item = ({ title }) => (
        <View >
            <Text >{title}</Text>
        </View>
    );

    return (
        <>
            <View style={[styles.listContainer]}>
                <TextInput
                    placeholder="Search..."
                    onChangeText={setSearch}
                    value={search}
                    style={[styles.inputs, styles.searchInput]}
                />
                <FlatList
                    data={mockRestaurantData}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                    style={[styles.listItems]}
                />
            </View>
            <MapView style={styles.map}
                region={currentRegion}
            >
                {
                    location &&
                    <Marker
                        draggable
                        coordinate={{
                            latitude: location.coords?.latitude,
                            longitude: location.coords?.longitude,
                        }}
                    />
                }
            </MapView>
        </>
    )
}