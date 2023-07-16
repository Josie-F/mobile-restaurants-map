import { NavigationContainer } from '@react-navigation/native';
import SignIn from './components/SignIn';
import Home from './components/Home';
import MapPage from './components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useContext } from 'react';
import { LoginContext } from './components/SignIn';
import { initiateDatabase, getUsers } from './database-service'
import SignUp from './components/SignUp';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ButtonScreen = () => null;

const TabScreens = ({ route, navigation }) => {
  const [loginState, setLoginState] = useContext(LoginContext);
  const { userName } = route.params;
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#0c222b' }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FF9800',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ userName: userName }}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                focused={focused}
                name="home"
                color={!focused ? '#FF9800' : '#f9cf93'}
                size={20}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                focused={focused}
                name="map"
                color={!focused ? '#FF9800' : '#f9cf93'}
                size={20}
              />
            );
          },
        }}
      />
      <Tab.Screen name="SignOut"
        options={({ navigation }) => ({
          tabBarButton: props => <TouchableOpacity {...props} onPress={() => setLoginState({ userName: '', signedIn: false, token: null })} />,
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                focused={focused}
                name="exit"
                color={!focused ? '#FF9800' : '#f9cf93'}
                size={20}
              />
            );
          },
        })}
        component={ButtonScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loginState, setLoginState] = useState({ userName: '', signedIn: false, token: null });


  initiateDatabase();
  // getUsers(); // DEBUG ONLY

  return (
    <LoginContext.Provider value={[loginState, setLoginState]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          {loginState.token ? (
            <Stack.Screen name="Nav" component={TabScreens} initialParams={{ userName: loginState.userName }} ></Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: 'SignIn', headerShown: true }}>
              </Stack.Screen>
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: 'SignUp', headerShown: true }}>
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  );
}
