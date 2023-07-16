import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from 'react-native-maps';
import { Text, View, FlatList, Modal, Pressable, ToastAndroid } from "react-native";
import { styles } from "../layout/styleSheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from 'expo-location'

// Map Component
export default MapPage = ({ navigation, route }) => {
    const [currentFilter, setCurrentFilter] = useState(null);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [topRestaurants, setTopRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState({});
    const mapInstanceRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [modalDetails, setModalDetails] = useState({})

    // Gets places in a radius of 5km in accordance with the query parameters. If filter is provided, api will get search results related to the filter search.
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

    // Gets detailed data of the specified place via id
    placeSearch = (placeId) => {
        setSelectedRestaurant(null)
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
        try {
            fetch(url)
                .then(res =>
                    res.json())
                .then((data) => {
                    setSelectedRestaurant(data?.result)
                })
        } catch (error) {
            console.log('Failed to fetch selected restaurant: ', error)
        }
    }

    // Places a marker on the map when a restaurant is selected in the GooglePlacesAutocomplete search field.
    placeMarker = (details) => {
        setTopRestaurants([...topRestaurants, details])
        placeSearch(details.place_id);
        mapInstanceRef.current.animateToRegion({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }, 2000);
    }

    useEffect(() => {
        (async () => {
            let { granted } = await Location.getForegroundPermissionsAsync()
            console.log(granted)
            if (granted !== true) {
                console.log('Access to location was denied');
                ToastAndroid.show("Access to location was denied! - Change this feature in your settings to be able to continue using this app", ToastAndroid.LONG)
                return;
            }
        })()

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
                onPress={(data, details = null) => placeMarker(details)}
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
                        <MapView style={styles.map} ref={mapInstanceRef} region={currentRegion}>
                            <>
                                {
                                    topRestaurants?.map((restaurant, i) => {
                                        return (<Marker key={i}
                                            coordinate={{
                                                latitude: restaurant.geometry.location.lat,
                                                longitude: restaurant.geometry.location.lng,
                                            }}
                                            pinColor={"#FF9800"}
                                            title={restaurant.name}
                                            onPress={(e) => { placeSearch(restaurant.place_id) }}
                                            onCalloutPress={() => {
                                                mapInstanceRef.current.animateToRegion({
                                                    latitude: restaurant?.geometry?.location?.lat,
                                                    longitude: restaurant?.geometry?.location?.lng,
                                                    latitudeDelta: 0.01,
                                                    longitudeDelta: 0.01,
                                                }, 2000);
                                                setModalDetails({
                                                    website: selectedRestaurant?.website,
                                                    delivery: selectedRestaurant?.delivery,
                                                    description: selectedRestaurant?.editorial_summary?.overview,
                                                    dineIn: selectedRestaurant?.dine_in
                                                })
                                                setModalVisible(true)
                                            }}
                                        ></Marker>)
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
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                style={styles.modal}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View>
                    <View style={styles.modalContent}>
                        <Text style={styles.restaurantInfoTitle}>{modalDetails?.description}</Text>
                        <Text style={styles.restaurantInfo}>Dine In: {modalDetails?.dine_in ? "Available" : "Unavailable"}</Text>
                        <Text style={styles.restaurantInfo}>Delivery: {modalDetails?.delivery ? "Available" : "Unavailable"}</Text>
                        <Text style={styles.restaurantInfo}>Website: {modalDetails?.website}</Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.modalClose}
                                onPress={() => ToastAndroid.show("This feature has not been implemented yet!", ToastAndroid.LONG)}>
                                <Text style={styles.modalCloseText}>Click here to book or inquire</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={styles.modalClose}>
                                <Text style={styles.modalCloseText}>Close Modal</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </>
    )
}