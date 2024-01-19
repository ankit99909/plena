import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, Border, FontFamily } from "../screens/GlobalStyles";
import { Rating, AirbnbRating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../screens/CartContext';
import Carousel, { Pagination } from "react-native-snap-carousel";


const ProductDetails = ({ route, props }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const navigation = useNavigation();
  const { product } = route.params;
  const { state } = useCart();




  const addToCart = async () => {
    try {
      // Retrieve existing cart items from AsyncStorage
      const existingCartItemsJson = await AsyncStorage.getItem('cartItems');
      const existingCartItems = existingCartItemsJson ? JSON.parse(existingCartItemsJson) : [];

      // Check if the product is already in the cart
      const existingProductIndex = existingCartItems.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Product is already in the cart, update quantity
        existingCartItems[existingProductIndex].quantity += 1;
      } else {
        // Product is not in the cart, add it
        existingCartItems.push({ ...product, quantity: 1 });
      }

      // Save updated cart items to AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(existingCartItems));

      // Navigate to the next screen (e.g., Cart Screen)
      navigation.navigate('ShoppingCart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };


  return (
    <View style={styles.productDetails}>
      <View style={[styles.topBarIcon, styles.topIconLayout]}>
        <View style={[styles.cart, styles.ellipseLayout]}>
          <Image
            style={styles.bagIcon}
            contentFit="cover"
            source={require("../assets/bag1.png")}
          />
          <View style={[styles.ellipseParent, styles.ellipseLayout]}>
            <Image
              style={[styles.ellipseIcon, styles.ellipseLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-31.png")}
            />
            <Text style={[styles.text2, styles.text2Typo]}>{state.totalItems}</Text>
          </View>
        </View>
        <TouchableOpacity style={{ height: 40, width: 40, }} onPress={() => navigation.goBack()}>
          <Image
            style={[styles.topBarIconChild, styles.topIconLayout]}
            contentFit="cover"
            source={require("../assets/group-73.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, styles.titleClr]}>
        <Text style={styles.thinChoise}>{`Thin  Choise `}</Text>
        <Text style={styles.topOrange}>{product?.title}</Text>
      </Text>
      <View style={{
        position: "relative", marginTop: 280, backgroundColor: Color.greyScaleBlack05,
        width: 475,
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        left: -70,
      }}>
        <Carousel
          data={product?.images}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: item }} style={styles.imageIcon} contentFit="contain" />
              </View>
            )
          }}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={product?.images.length}
          activeDotIndex={activeSlide}
          containerStyle={{ marginTop: -15 }}
          dotStyle={{
            backgroundColor: Color.colorOrange,

            width: 23,
            height: 6,
            borderRadius: 5,
            marginHorizontal: 10,
            top: -150,
            right: 80,
            margin: 2,
          }}
          inactiveDotStyle={{
            backgroundColor: "#E4E4E4",
            width: 23,
            height: 6,
            borderRadius: 5,
            marginHorizontal: 10,
            top: -150,
            right: 80,
            margin: 2,
          }}
          inactiveDotOpacity={10}
          inactiveDotScale={0.6}
        />
      </View>
      <View style={styles.text}>
        <Text style={[styles.details, styles.titleClr]}>Details</Text>
        <Text style={[styles.praesentCommodoCursus, styles.kgLayout]}>
          {product?.description}
        </Text>
      </View>
      <View style={styles.button}>
        <View style={[styles.button1, styles.buttonLayout]}>
          <View style={[styles.button2, styles.buttonLayout]}>
            <TouchableOpacity style={[styles.bg, styles.bgLayout]} >
              <Text style={[styles.buyNow, styles.text2Typo]}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button3}>
          <TouchableOpacity style={styles.bg1} onPress={addToCart}>
            <Text style={[styles.addToCart, styles.kgClr]}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceText}>
        <View style={[styles.kgParent, styles.kgParentFlexBox]}>
          <Text style={[styles.kg, styles.kgClr]}>
            <Text style={styles.text1}>₹{product?.price}</Text>
            <Text style={styles.kg1}>/KG</Text>
          </Text>
          <View style={[styles.offWrapper, styles.kgParentFlexBox]}>
            <Text style={styles.off}>₹{product?.discountPercentage}OFF</Text>
          </View>
        </View>
      </View>
      {/* {/* <View style={styles.productImageAndIcon}>
        <View style={[styles.rectangleParent, styles.rectangleLayout]}>
       {/* <View style={[styles.rectangleView, styles.rectangleLayout]} />  */}

      {/* </View>
      </View>  */}
      <View style={[styles.reviewIcon, styles.kgParentFlexBox]}>
        <Rating
          type='star'
          ratingCount={5}
          imageSize={14}
          ratingColor='blue'
          ratingBackgroundColor='red'
          // showRating
          onFinishRating={product.rating}
        />
        <Text style={styles.reviews}>110 Reviews</Text>
      </View>

      {/* <Image
        style={styles.imageIcon}
        contentFit="cover"
        source={require("../assets/image-icon.png")}
      />  */}
    </View>
  );
};

const styles = StyleSheet.create({
  titleClr: {
    color: Color.greyScaleBlack,
    textAlign: "left",
  },
  kgLayout: {
    lineHeight: 24,
    fontSize: FontSize.bodyRegular16_size,
  },
  buttonLayout: {
    width: 169,
    top: 0,
    height: 56,
    position: "absolute",
  },
  bgLayout: {
    borderRadius: Border.br_xl,
    left: 0,
  },
  text2Typo: {
    color: Color.colorWhite,
    textAlign: "center",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
    position: "absolute",
  },
  kgClr: {
    color: Color.primaryLightBlue,
    textAlign: "center",
  },
  kgParentFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  groupLayout: {
    width: 21,
    borderColor: Color.colorGainsboro,
    height: 4,
    borderTopWidth: 4,
    top: -2,
    borderStyle: "solid",
    position: "absolute",
  },
  rectangleLayout: {
    height: 58,
    width: 58,
    position: "absolute",
  },
  topIconLayout: {
    height: 40,
    position: "absolute",
  },
  ellipseLayout: {
    width: 24,
    height: 24,
    position: "absolute",
  },
  productDetailsChild: {
    top: 281,
    backgroundColor: Color.greyScaleBlack05,
    width: 375,
    height: 207,
    left: 0,
    position: "absolute",
  },
  details: {
    textAlign: "left",
    fontFamily: FontFamily.heading01Regular30,
    lineHeight: 24,
    fontSize: FontSize.bodyRegular16_size,
  },
  praesentCommodoCursus: {
    color: Color.greyScaleBlack03,
    width: 327,
    marginTop: 6,
    textAlign: "left",
    fontFamily: FontFamily.heading01Regular30,
  },
  text: {
    top: 654,
    left: 24,
    position: "absolute",
  },
  bg: {
    backgroundColor: Color.primaryLightBlue,
    width: 169,
    top: 0,
    height: 56,
    position: "absolute",
  },
  buyNow: {
    left: 55,
    textAlign: "center",
    top: 19,
    color: Color.colorWhite,
  },
  button2: {
    left: 0,
  },
  button1: {
    left: 166,
  },
  bg1: {
    borderColor: Color.primaryLightBlue,
    borderWidth: 1,
    borderStyle: "solid",
    width: 143,
    borderRadius: Border.br_xl,
    top: 0,
    height: 56,
    left: 0,
    position: "absolute",
  },
  addToCart: {
    left: 31,
    width: 80,
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    color: Color.primaryLightBlue,
    fontSize: FontSize.body02Regular14_size,
    top: 19,
    position: "absolute",
  },
  button3: {
    width: 143,
    top: 0,
    height: 56,
    left: 0,
    position: "absolute",
  },
  button: {
    top: 568,
    width: 335,
    height: 56,
    left: 20,
    position: "absolute",
  },
  text1: {
    fontWeight: "700",
    fontFamily: FontFamily.manropeBold,
  },
  kg1: {
    fontFamily: FontFamily.heading01Regular30,
  },
  kg: {
    lineHeight: 24,
    fontSize: FontSize.bodyRegular16_size,
  },
  off: {
    fontSize: FontSize.labelMedium12_size,
    letterSpacing: 0.2,
    lineHeight: 16,
    color: Color.greyScaleBlack06,
    textAlign: "center",
    fontFamily: FontFamily.heading01Regular30,
  },
  offWrapper: {
    borderRadius: 70,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 14,
    backgroundColor: Color.primaryLightBlue,
  },
  kgParent: {
    top: 0,
    left: 0,
    position: "absolute",
  },
  priceText: {
    top: 514,
    width: 178,
    height: 24,
    left: 20,
    position: "absolute",
  },
  groupChild: {
    left: -2,
    borderColor: Color.colorOrange,
    width: 23,
    height: 4,
    borderTopWidth: 4,
    top: -2,
    borderStyle: "solid",
    position: "absolute",
  },
  groupItem: {
    left: 25,
  },
  groupInner: {
    left: 50,
  },
  lineParent: {
    top: 173,
    width: 69,
    height: 0,
    left: 0,
    position: "absolute",
  },
  rectangleView: {
    top: 58,
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    borderRadius: Border.br_xl,
    left: 0,
    backgroundColor: Color.colorWhite,
  },
  iconlytwoToneheart: {
    height: "19.38%",
    width: "9.38%",
    top: "6.31%",
    // right: "29.31%",
    bottom: "29.31%",
    left: "78.31%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    left: 262,
    top: 0,
  },
  productImageAndIcon: {
    top: 295,
    width: 320,
    height: 173,
    left: 20,
    position: "absolute",
  },
  reviewIconChild: {
    width: 101,
    height: 17,
  },
  reviews: {
    lineHeight: 20,
    color: "#a0a0ab",
    marginLeft: 5,
    textAlign: "center",
    fontSize: FontSize.body02Regular14_size,
    fontFamily: FontFamily.heading01Regular30,
  },
  reviewIcon: {
    top: 246,
    left: 26,
    position: "absolute",
  },
  thinChoise: {
    fontWeight: "300",
    fontFamily: FontFamily.manropeLight,
  },
  topOrange: {
    lineHeight: 58,
    textAlign: "left",
    fontWeight: "600",
    fontFamily: FontFamily.manropeExtraBold,
  },
  title: {
    top: 106,
    fontSize: 50,
    lineHeight: 63,
    width: 306,
    left: 20,
    textAlign: "left",
    position: "absolute",
  },
  bagIcon: {
    top: 3,
    left: 4,
    width: 16,
    height: 18,
    position: "absolute",
  },
  ellipseIcon: {
    top: 0,
    left: 0,
  },
  text2: {
    top: 2,
    left: 7,
    textAlign: "center",
  },
  ellipseParent: {
    top: -7,
    left: 9,
  },
  cart: {
    top: 10,
    left: 315,
  },
  topBarIconChild: {
    width: 40,
    top: 0,
    left: 0,
  },
  topBarIcon: {
    top: 45,
    width: 339,
    left: 20,
  },
  imageIcon: {
    backgroundColor: Color.greyScaleBlack05,
    width: 300,
    height: 180,
    left: 20,
    top: 20
  },
  productDetails: {
    borderRadius: Border.br_6xl,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
  dot: {
    backgroundColor: "#E4E4E4",
    width: 23,
    height: 4,
    borderRadius: 5,
    marginHorizontal: 12,
    top: -340,
    right: 110,
    margin: 2,
  },
  activeDotStyle: {
    backgroundColor: Color.colorOrange,
    width: 23,
    height: 4,
    borderRadius: 5,
    margin: 2,
    marginHorizontal: 12,
    top: -340,
    right: 110,

  },
  slide: {
    // top: 281,
    width: 475,
    height: 475,
    // position: "absolute",
  },
  wrapper: {
    backgroundColor: "red",

    // top:270,
  }
});

export default ProductDetails;
