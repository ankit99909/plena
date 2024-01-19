import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../screens/GlobalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../screens/CartContext';


const ShoppingCart = () => {
  const { state, dispatch, totalItems, setTotalItems } = useCart();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);

  // ... (existing code)

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItemsJson = await AsyncStorage.getItem('cartItems');
        const loadedCartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
        setCartItems(loadedCartItems);

        const total = loadedCartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalItems(total);
        dispatch({ type: 'ADD_TO_CART', payload: total });
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };
    loadCartItems();
  }, []);



  const updateCartItem = async (itemId, newQuantity) => {
    try {
      let updatedCartItems;

      // If the new quantity is 0, filter out the item from cartItems
      if (newQuantity === 0) {
        updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      } else {
        updatedCartItems = cartItems.map((item) =>
          item.id === itemId
            ? {
              ...item,
              quantity: newQuantity,
              total: newQuantity * item.price, // Calculate total price dynamically
            }
            : item
        );
      }
      // Calculate the total price of all items in the cart
      const totalPrice = updatedCartItems.reduce(
        (total, item) => total + item.total,
        0
      );
      // Save updated cart items and total price to AsyncStorage
      await AsyncStorage.setItem(
        'cartItems',
        JSON.stringify(updatedCartItems)
      );
      await AsyncStorage.setItem('totalPrice', JSON.stringify(totalPrice));
      dispatch({ type: 'ADD_TO_CART', payload: updatedCartItems });
      // Update state to re-render the component
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };


  const calculateSubtotal = () => {
    // Ensure that the cartItems array has the correct structure with a 'total' property
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return "0.00"; // Default value if there are no items in the cart
    }
  
    // Calculate the subtotal based on the 'total' property of each item
    const subtotal = cartItems.reduce((total, item) => total + item.total, 0);
    // Adjust the precision as needed
    return subtotal.toFixed(2);
  };

 

  const handleCheckout = async () => {
    navigation.navigate('GroceryHome');
    await AsyncStorage.removeItem('cartItems');
    setCartItems([]);
    dispatch({ type: 'CLEAR_CART' });
  };
  return (
    <View style={styles.shoppingCart2}>
      <View style={[styles.shoppingCart2Child, styles.childLayout]} />
      <View style={[styles.shoppingCart2Item, styles.childLayout]} />
      <View style={[styles.shoppingCart2Inner, styles.childLayout]} />
      <View style={[styles.topBar, styles.topBarLayout]}>
        <TouchableOpacity style={{
          height: 40,
          width: 40
        }} onPress={() => navigation.goBack()}>
          <Image
            style={[styles.plusMinusButtonItem, styles.plusLayout]}
            contentFit="cover"
            source={require("../assets/group-73.png")}
          />
        </TouchableOpacity>
        <Text style={styles.shoppingCart5}>Shopping Cart (5)</Text>
      </View>
      <View style={{ top: 120 }}>
        <FlatList
          data={cartItems}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.card03, styles.cardLayout]} key={item.id}>
                {/* <Text>{item.brand}</Text> */}
                <Text style={[styles.package02, styles.text5Position]}>Package 02</Text>
                <Text style={[styles.text5, styles.text5Position]}>₹{item?.quantity > 1 ? item?.total : item?.price}</Text>
                <View style={[styles.plusMinusButton, styles.topBarLayout]}>
                  <Text style={[styles.text6, styles.textTypo1]}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateCartItem(item.id, item.quantity + 1)}>
                    <Image
                      style={[styles.plusMinusButtonChild, styles.plusLayout]}
                      contentFit="cover"
                      source={require("../assets/group-37749.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => updateCartItem(item.id, Math.max(0, item.quantity - 1))}>
                    <Image
                      style={[styles.plusMinusButtonItem, styles.plusLayout]}
                      contentFit="cover"
                      source={require("../assets/group-37750.png")}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  style={[styles.imageIcon2, styles.imageIconLayout]}
                  contentFit="cover"
                  source={{ uri: item?.thumbnail }}
                />
              </View>
            )

          }
          }
        />
      </View>
      <View style={[styles.textbgButton, styles.textbgLayout]}>
        <View style={[styles.textbgButtonChild, styles.textbgLayout]} />
        <Text style={[styles.subtotal, styles.totalPosition]}>Subtotal</Text>
        <Text style={[styles.text1, styles.textTypo1]}>{calculateSubtotal()}</Text>
        <Text style={[styles.delivery, styles.totalPosition]}>Delivery</Text>
        <Text style={[styles.total, styles.totalPosition]}>Total</Text>
        <Text style={[styles.text2, styles.textTypo1]}>₹2.00</Text>
        <Text style={[styles.text3, styles.textTypo]}>₹{calculateSubtotal() + 2.00}</Text>
        <View style={[styles.button, styles.bgLayout]}>
          <TouchableOpacity style={[styles.bg, styles.bgLayout]} >
            <Text style={[styles.buttonText, styles.textTypo]} onPress={() => handleCheckout()}>
              Proceed To checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.edit, styles.textTypo1]}>Edit</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  childLayout: {
    height: 1,
    width: 328,
    borderTopWidth: 0.5,
    borderColor: Color.colorLavender,
    borderStyle: "solid",
    position: "absolute",
  },
  card04Layout: {
    height: 58,
    width: 327,
    left: 24,
    position: "absolute",
  },
  textTypo1: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
  },
  textPosition: {
    top: 22,
    fontFamily: FontFamily.heading01Regular30,
    lineHeight: 20,
  },
  imageIconLayout: {
    opacity: 0.6,
    height: 30,
    width: 30,
    top: 4,
    position: "absolute",
    overflow: "hidden",
  },
  textbgLayout: {
    height: 266,
    width: 359,
    position: "absolute",
  },
  totalPosition: {
    color: Color.greyScaleBlack02,
    left: 36,
    fontFamily: FontFamily.heading01Regular30,
    lineHeight: 20,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  bgLayout: {
    height: 56,
    width: 327,
    position: "absolute",
  },
  cardLayout: {
    height: 42,
    width: 325,
    left: 30,
    margin: 10,
  },
  text5Position: {
    left: 56,
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  topBarLayout: {
    height: 40,
    position: "absolute",
  },
  plusLayout: {
    width: 40,
    height: 40,
    top: 0,
    position: "absolute",
  },
  plusPosition: {
    left: 245,
    height: 40,
    width: 110,
    position: "absolute",
  },
  shoppingCart2Child: {
    top: 340,
    left: 24,
  },
  shoppingCart2Item: {
    top: 262,
    left: 24,
  },
  shoppingCart2Inner: {
    top: 184,
    left: 24,
  },
  groupChild: {
    top: 58,
    left: 0,
  },
  package03: {
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
    left: 62,
    top: 0,
  },
  text: {
    fontFamily: FontFamily.heading01Regular30,
    lineHeight: 20,
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
    left: 62,
  },
  imageIcon: {
    left: 6,
  },
  lineParent: {
    top: 438,
  },
  textbgButtonChild: {
    borderRadius: 30,
    backgroundColor: Color.greyScaleBlack05,
    top: 0,
    left: 0,
  },
  subtotal: {
    textAlign: "center",
    top: 17,
  },
  text1: {
    left: 277,
    textAlign: "right",
    top: 17,
    lineHeight: 20,
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  delivery: {
    top: 50,
    textAlign: "left",
  },
  total: {
    top: 86,
    textAlign: "left",
  },
  text2: {
    top: 51,
    left: 285,
    textAlign: "right",
    lineHeight: 20,
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  text3: {
    top: 87,
    left: 278,
    textAlign: "right",
    lineHeight: 20,
    color: Color.greyScaleBlack,
  },
  bg: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.primaryLightBlue,
    top: 0,
    left: 0,
  },
  buttonText: {
    top: 19,
    left: 92,
    color: Color.colorWhite,
    textAlign: "center",
  },
  button: {
    top: 141,
    left: 16,
  },
  textbgButton: {
    top: 584,
    left: 8,
  },
  edit: {
    top: 506,
    left: 300,
    fontSize: FontSize.labelMedium12_size,
    letterSpacing: 0.2,
    lineHeight: 16,
    color: Color.primaryLightBlue,
    width: 49,
    textAlign: "right",
    position: "absolute",
  },
  card04: {
    top: 360,
  },
  package02: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
    top: 0,
  },
  text5: {
    fontFamily: FontFamily.heading01Regular30,
    lineHeight: 20,
    top: 22,
  },
  text6: {
    top: 11,
    left: 51,
    textAlign: "left",
    color: Color.greyScaleBlack,
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  plusMinusButtonChild: {
    left: 70,
  },
  plusMinusButtonItem: {
    left: 0,
  },
  plusMinusButton: {
    top: 2,
    left: 215,
    width: 110,
    height: 40,
  },
  imageIcon2: {
    left: 0,
  },
  card03: {
    // top: 282,
  },
  card02: {
    top: 204,
  },
  card01: {
    top: 126,
  },
  shoppingCart5: {
    top: 8,
    left: 61,
    fontSize: FontSize.bodyRegular16_size,
    lineHeight: 24,
    width: 143,
    textAlign: "center",
    fontFamily: FontFamily.heading01Regular30,
    color: Color.greyScaleBlack,
    position: "absolute",
  },
  topBar: {
    top: 45,
    width: 204,
    left: 24,
  },
  plusMinusButton3: {
    top: 361,
  },
  plusMinusButton4: {
    top: 440,
  },
  shoppingCart2: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default ShoppingCart;
