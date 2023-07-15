import React, { useEffect, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Text, View, FlatList } from "react-native";
import { styles } from "../layout/styleSheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


export default MapPage = ({ navigation, route }) => {
    const [currentFilter, setCurrentFilter] = useState(null)
    const [currentRegion, setCurrentRegion] = useState(null);
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState({});

    nearbySearch = () => {
        setTopRestaurants([])
        let nearbyRestaurants = []
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${route.params?.location?.coords.latitude},${route.params?.location?.coords.longitude}&radius=5000&type=restaurant&keyword=${route.params?.filter}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
        try {
            fetch(url)
                .then(res =>
                    res.json())
                .then(data => {
                    for (let i in data.results) {
                        if (data.results[i].rating > 3) {
                            nearbyRestaurants = [...nearbyRestaurants, data.results[i]]
                        }
                    }
                }).then(() => {
                    setCurrentFilter(route.params?.filter)
                    setTopRestaurants(nearbyRestaurants)
                })
        } catch (error) {
            console.log('Failed to fetch nearby restaurants: ', error)
        }

    }

    placeMarker = (data, details) => {
        console.log(details.geometry.location)
        setSelectedMarker(details.geometry.location)
        console.log(selectedMarker)
    }

    useEffect(() => {
        if (route.params?.location && !currentRegion) {
            setCurrentRegion({
                latitude: route.params?.location?.coords.latitude,
                longitude: route.params?.location?.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
        if (!route.params?.filter || route.params?.filter !== currentFilter) {
            nearbySearch()
        }
    }, [currentRegion, route.params?.filter])

    const Item = ({ title, rating }) => (
        <View>
            <Text>{title} | Rating: {rating}</Text>
        </View>
    );

    return (
        <>
            <GooglePlacesAutocomplete
                placeholder="Type a place"
                query={{ key: process.env.EXPO_PUBLIC_API_KEY, components: 'country:uk', type: 'restaurant' }}
                fetchDetails={true}
                onPress={(data, details = null) => placeMarker(data, details)}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results found')}
                style={styles.autoComplete}
                nearbyPlacesAPI='GooglePlacesSearch'
            >
            </GooglePlacesAutocomplete>
            {
                currentRegion && topRestaurants.length > 0 ?
                    <>
                        <FlatList
                            data={topRestaurants}
                            renderItem={({ item, i }) => <Item title={item.name} rating={item.rating} />}
                            keyExtractor={(item, id) => (`listKey-${id}`)}
                            style={[styles.listItems]}
                        />
                        <MapView style={styles.map} region={currentRegion}>
                            <>
                                {
                                    topRestaurants?.map((restaurant, i) => {
                                        return (<Marker key={i}
                                            coordinate={{
                                                latitude: restaurant.geometry.location.lat,
                                                longitude: restaurant.geometry.location.lng,
                                            }}
                                            pinColor={"purple"}
                                            title={restaurant.name}
                                            description={restaurant.name}
                                            onPress={() => console.log('pressed marker')}
                                        >
                                            {/* <Text style={styles.markerStyling}>Something</Text> */}
                                        </Marker>)
                                    })

                                }
                            </>
                        </MapView>
                    </>
                    :
                    <Text style={styles.loadingText}>
                        Loading...
                    </Text>
            }
        </>
    )
}