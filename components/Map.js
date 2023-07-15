import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from "react-native";
import { styles } from "../layout/styleSheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


export default MapPage = ({ navigation, route }) => {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        if (route.params?.location && !currentRegion) {
            setCurrentRegion({
                latitude: route.params?.location.coords.latitude,
                longitude: route.params?.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }, [currentRegion])

    // const mockRestaurantData = [
    //     {
    //         id: '1',
    //         title: 'First Item',
    //     },
    //     {
    //         id: '2',
    //         title: 'Second Item',
    //     },
    //     {
    //         id: '3',
    //         title: 'Third Item',
    //     },
    // ];

    const Item = ({ title }) => (
        <View >
            <Text >{title}</Text>
        </View>
    );

    return (
        <>
            <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{ key: process.env.EXPO_PUBLIC_API_KEY }}
                fetchDetails={true}
                onPress={(data, details = null) => console.log('ON PRESS DATA', data, details)}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results found')}
                style={styles.autoComplete}
            >
            </GooglePlacesAutocomplete>
            {/* <TextInput
                    placeholder="Search..."
                    onChangeText={setSearch}
                    value={search}
                    style={[styles.inputs, styles.searchInput]}
                /> */}
            {/* <FlatList
                    data={mockRestaurantData}
                    renderItem={({ item }) => <Item title={item.title} />}
                    keyExtractor={item => item.id}
                    style={[styles.listItems]}
                /> */}
            {
                currentRegion ?
                    <MapView style={styles.map}
                        region={currentRegion}
                    >

                        <Marker
                            coordinate={{
                                latitude: currentRegion?.latitude,
                                longitude: currentRegion?.longitude,
                            }}
                        />
                    </MapView>
                    :
                    <Text style={styles.loadingText}>
                        Loading...
                    </Text>
            }
        </>
    )
}