const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { CartProvider } from './screens/CartContext';

import ShoppingCart from "./screens/ShoppingCart";
import ProductDetails from "./screens/ProductDetails";
import BottomTabScreens from "./screens/BottomTabScreens";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Manrope-Light": require("./assets/fonts/Manrope-Light.ttf"),
    "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("./assets/fonts/Manrope-ExtraBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
     <CartProvider>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>

            <Stack.Screen
              name="GroceryHome"
              component={BottomTabScreens}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ShoppingCart"
              component={ShoppingCart}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
      </CartProvider>
    </>
  );
};
export default App;
