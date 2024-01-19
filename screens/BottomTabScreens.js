import React, { useRef, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, LogBox, Animated } from "react-native";
import GroceryHome from "./GroceryHome";
import { FontSize, Color, FontFamily, Border, icons, pressedIcons } from "../screens/GlobalStyles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


const Tab = createBottomTabNavigator()

const TabArr = [
  { route: "Home", label: "Home", icon: icons.home, pressedIcon: pressedIcons.homeyellow, component: GroceryHome },
  { route: "Categories", label: "Categories", icon: icons.Categories, pressedIcon: pressedIcons.Categoriesyellow, component: GroceryHome },
  { route: "Favourite", label: "Favourite", icon: icons.Favourite, pressedIcon: pressedIcons.Favouriteyellow, component: GroceryHome },
  { route: "More", label: "More", icon: icons.More, pressedIcon: pressedIcons.More, component: GroceryHome }
];


const TabButton = (props) => {
  const translateYValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const animatel = { 0: { scale: 0.5, translateY: -7 }, 0.92: { translateY: 34 }, 1: { scale: 1.2, translateY: -24 } };
  const animate2 = { 0: { scale: 1.2, translateY: 24 }, 1: { scale: 1, translateY: -7 } };
  const circle1 = { 0: { scale: 0 }, 0.3: { scale: 0.9 }, 0.5: { scale: 0.2 }, 0.4: { scale: 3 }, 1: { scale: 1 } };
  const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animatel);
      circleRef.current.animate(circle1);
      Animated.timing(translateYValue, {
        toValue: 2, // Adjust this value based on your design
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      Animated.timing(translateYValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);



  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={1}
    >
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}
      >
        <View style={[styles.btn, {
          borderColor: focused ? Color.white : Color.primary,
        }]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle}
          />
          <Animated.Image
            contentFit="cover"
            source={focused ? item.pressedIcon : item.icon}
            style={{
              height: 24,
              width: 24,
              tintColor: focused ? "#E0B420" : Color.white,
              transform: [{ translateY: translateYValue }],
            }} />
        </View>
        {!focused && (
          <Animated.Text
            ref={textRef}
            style={[styles.text, { transform: [{ translateY: translateYValue }] }]}
          >
            {item.label}
          </Animated.Text>
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
}

export default function BottomTabScreens() {

  return (

    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarStyle: {
        // position: "absolute",
        height: 90,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
      }
    }}>
      {
        TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })
      }
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 10,
    flex: 1,
    alignItems: "center",
    // backgroundColor:"red",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set background color to transparent
    borderColor: Color.primary, // Border color
  },
  text: {
    fontSize: FontSize.labelMedium12_size,
    fontWeight: "500",
    fontFamily: FontFamily.labelMedium12,
    color: Color.greyScaleBlack03,
    textAlign: "center",

  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.iconColor,
    borderRadius: 25,
    height: 50,

  },
});



