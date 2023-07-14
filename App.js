import { NavigationContainer } from '@react-navigation/native';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Map from './components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { LoginContext } from './components/SignIn';
import { initiateDatabase, getUsers, addUser } from './database-service'

const Stack = createNativeStackNavigator();

export default function App() {
  const [loginState, setLoginState] = useState({ userName: '', signedIn: false, token: null });
  initiateDatabase();
  // addUser('admin', 'admin');
  getUsers();

  return (
    <LoginContext.Provider value={[loginState, setLoginState]}>
      <NavigationContainer>
        <Stack.Navigator>
          {loginState.token ? (
            <Stack.Screen name="Home" component={Home} initialParams={{ userName: loginState.userName }}></Stack.Screen>
          ) : (
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: 'Home' }}>
            </Stack.Screen>
          )}
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: 'Map' }}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  );
}
