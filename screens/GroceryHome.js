import React, { useRef, useEffect, useCallback, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { FontSize, Color, FontFamily, Border } from "../screens/GlobalStyles";
import { useCart } from '../screens/CartContext';


const GroceryHome = (props) => {
  const [loading, setLoading] = useState(false);
  const [Data, setData] = useState()
  const { state } = useCart();



  useEffect(() => {
    handleSubmitPress()
  }, [props])

  const handleSubmitPress = async () => {

    setLoading(true);
    fetch(`https://dummyjson.com/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // console.log(responseJson);
        setData(responseJson?.products)
        // If server response message same as Data Matched
        if (responseJson?.status_code === 200) {
          //  await AsyncStorage.setItem('token', responseJson?.data?.token);
        } else {
          // setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  const imageData = [
    { imagePath: require("../assets/download.png"), discountLabel: '50% OFF' },
    { imagePath: require("../assets/images-removebg.png"), discountLabel: '10% OFF' },
    { imagePath: require("../assets/images__1.png"), discountLabel: '40% OFF' },
    // Add more items as needed
  ];
  const cardColors = ["#f9b023", '#e4ddcb', "#2A4BA0",];

  return (
    <View style={styles.groceryHome}>
      <View style={styles.bg} />
      <View style={styles.heyRahulParent}>
        <Text style={[styles.heyRahul, styles.heyRahulClr]}>Hey, Rahul</Text>
        <View style={[styles.cartIcon, styles.iconLayout1]}>
          <Image
            style={[styles.bagIcon, styles.bagIconPosition]}
            contentFit="cover"
            source={require("../assets/bag.png")}
          />
          <View style={[styles.ellipseParent, styles.iconLayout1]}>
            <Image
              style={[styles.frameChild, styles.iconLayout1]}
              contentFit="cover"
              source={require("../assets/ellipse-3.png")}
            />
            <Text style={[styles.text10, styles.moreFlexBox]}>{state.totalItems}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.searchBar, styles.bg1Layout]}>
        <View style={[styles.bg1, styles.bg1Layout]} >
          <Image
            style={styles.searchIcon}
            contentFit="cover"
            source={require("../assets/search-icon.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="Search Products or store"
            placeholderTextColor={Color.colorWhite}
          />
        </View>
      </View>
      <View style={[styles.text6, styles.textParentLayout]}>
        <View style={[styles.deliveryToParent, styles.textParentLayout]}>
          <Text style={[styles.deliveryTo, styles.heyRahulClr]}>
            Delivery to
          </Text>
          <View style={[styles.greenWay3000SylhetParent, styles.getPosition1]}>
            <Text style={[styles.greenWay3000, styles.heyRahulClr]}>
              Green Way 3000, Sylhet
            </Text>
            <Image
              style={styles.arrowIocnIcon}
              contentFit="cover"
              source={require("../assets/arrow-iocn.png")}
            />
          </View>
        </View>
        <View style={[styles.textParent, styles.textParentLayout]}>
          <Text style={[styles.deliveryTo, styles.heyRahulClr]}>Within</Text>
          <View style={[styles.greenWay3000SylhetParent, styles.getPosition1]}>
            <Text style={[styles.greenWay3000, styles.heyRahulClr]}>
              1 Hour
            </Text>
            <Image
              style={styles.arrowIocnIcon}
              contentFit="cover"
              source={require("../assets/arrow-iocn.png")}
            />
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {imageData.map((item, index) => {
          const Color = cardColors[index % cardColors.length];

          return (
            <View style={[styles.bannerCard, { marginRight: -250, }]}>
              <View style={[styles.card8, styles.cardLayout]}>
                <View style={[styles.cardChild7, styles.cardChildLayout, { backgroundColor: Color }]} />
                <Text style={[styles.get, styles.getTypo]}>GEt</Text>
                <Text style={[styles.onFirst03Container, styles.getPosition]}>
                  <Text style={styles.getTypo}>{`On first `}</Text>
                  <Text style={styles.text4Typo}>03</Text>
                  <Text style={styles.getTypo}> order</Text>
                </Text>
                <Text style={[styles.off, styles.offTypo]}>{item.discountLabel}</Text>
                <Image
                  style={[styles.imagediscount]}
                  // contentFit="cover"
                  source={item?.imagePath}
                />
              </View>
            </View>
          )
        })}
      </ScrollView>
      <View style={{ top:-40 ,backgroundColor:"red",marginBottom:10,}}>
      <Text style={styles.title}>Recommended</Text>
      </View>
      <View style={{ flex: 1, top: 6 }}>
        <FlatList
          data={Data}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={{ left: 20, marginBottom: 20, flex: 1 }}>
                <TouchableOpacity style={[styles.card, styles.cardLayout1]} onPress={() => props.navigation.navigate('ProductDetails', { product: item })}>
                  <View style={[styles.cardChild, styles.cardLayout1]} />
                  <Image
                    style={styles.imageIcon}
                    contentFit="cover"
                    source={{ uri: item?.thumbnail }}
                  />
                  <View style={[styles.card1, styles.cardPosition1]}>
                    <Text style={[styles.text, styles.textTypo]}>₹{item?.price}</Text>
                    <Text style={[styles.clownTangh03, styles.fishh03Typo]}>
                      {item.title}
                    </Text>
                    <View style={[styles.cardItem, styles.cardItemFlexBox]} />
                    <Image
                      style={[styles.cardInner, styles.iconLayout1]}
                      contentFit="cover"
                      source={require("../assets/group-32.png")}
                    />
                  </View>
                  <Image
                    style={[styles.vectorIcon, styles.vectorIconLayout]}
                    contentFit="cover"
                    source={require("../assets/vector.png")}
                  />
                </TouchableOpacity >
              </View>
            )

          }
          }
        />
      </View>

      {/* <Image
        style={[styles.vectorIcon1, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vector1.png")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardLayout1: {
    height: 194,
    width: 160,
    //  position: "absolute",
  },
  cardPosition1: {
    width: 128,
    left: 17,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontSize: FontSize.body02Regular14_size,
  },
  fishh03Typo: {
    width: 112,
    color: Color.greyScaleBlack02,
    lineHeight: 16,
    fontFamily: FontFamily.heading01Regular30,
    letterSpacing: 0.2,
    fontSize: FontSize.labelMedium12_size,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  cardItemFlexBox: {
    justifyContent: "flex-end",
    left: 14,
    alignItems: "center",
  },
  iconLayout1: {
    height: 24,
    width: 24,
    position: "absolute",
  },
  cardPosition: {
    left: 195,
    height: 194,
    width: 160,
    position: "absolute",
  },
  bagIconPosition: {
    top: 3,
    position: "absolute",
  },
  goldFishh03Typo: {
    width: 123,
    color: Color.greyScaleBlack02,
    fontFamily: FontFamily.heading01Regular30,
    lineHeight: 16,
    letterSpacing: 0.2,
    fontSize: FontSize.labelMedium12_size,
    textAlign: "left",
    left: 0,
    position: "absolute",
  },
  cardLayout: {
    width: 50,
    height: 40,
    top: 0,
    position: "absolute",
  },
  cardChildLayout: {
    borderRadius: Border.br_base,
    width: 269,
    height: 123,
    left: 0,
    top: 0,
    position: "absolute",
  },
  getTypo: {
    fontFamily: FontFamily.manropeLight,
    fontWeight: "300",
  },
  getPosition: {
    left: 134,
    color: Color.colorWhite,
    textAlign: "left",
  },
  offTypo: {
    fontFamily: FontFamily.manropeExtraBold,
    fontWeight: "800",
    position: "absolute",
  },
  textParentLayout: {
    height: 38,
    position: "absolute",
  },
  heyRahulClr: {
    color: Color.greyScaleBlack05,
    textAlign: "left",
  },
  getPosition1: {
    top: 19,
    position: "absolute",
  },

  vectorIconLayout: {
    top: "5.59%",
    width: "8%",
    height: "6%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  cardChild: {
    borderRadius: Border.br_xs,
    backgroundColor: Color.greyScaleBlack05,
    left: 0,
    top: 0,
  },
  imageIcon: {
    top: 20,
    left: 43,
    width: 90,
    height: 90,
    opacity: 0.6,
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    color: Color.greyScaleBlack,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    left: 0,
    position: "absolute",
    top: 44,
  },
  clownTangh03: {
    top: 68,
  },
  cardItem: {
    alignItems: "center",
    top: 0,
    position: "absolute",
  },
  cardInner: {
    left: 104,
    width: 24,
    top: 44,
  },
  card1: {
    top: 90,
    height: 84,
  },
  card: {
    // left: 20,
    // top: 479,
  },
  text1: {
    top: 47,
    color: Color.greyScaleBlack,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    left: 0,
    position: "absolute",
  },
  fishh03: {
    top: 71,
  },
  frameView: {
    alignItems: "center",
    justifyContent: "flex-end",
    left: 14,
  },
  groupIcon: {
    left: 104,
    width: 24,
    top: 0,
  },
  card3: {
    top: 87,
    height: 87,
  },
  card2: {
    top: 695,
  },
  clownfishh03: {
    top: 68,
  },
  card4: {
    top: 479,
  },
  goldFishh03: {
    top: 71,
  },
  card6: {
    top: 695,
    left: 20,
  },
  bg: {
    backgroundColor: Color.primaryLightBlue,
    width: 386,
    height: 252,
    maxHeight:"100%",
    maxWidth:"100%",
    left: 0,
    top: 0,
    position: "absolute",
  },
  title: {
    color: Color.greyScaleBlack02,
    fontSize: FontSize.heading01Regular30_size,
    lineHeight: 38,
    fontFamily: FontFamily.heading01Regular30,
    textAlign: "left",
    left: '5%', // Use percentage for left
    position: "absolute",
  },
  cardChild7: {
    backgroundColor: Color.colorOrange,
  },
  get: {
    fontSize: FontSize.size_xl,
    width: 34,
    height: 29,
    color: Color.colorWhite,
    left: 134,
    textAlign: "left",
    top: 19,
    position: "absolute",
  },
  text4Typo: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
  },
  onFirst03Container: {
    top: 80,
    fontSize: FontSize.size_smi,
    width: 96,
    height: 19,
    color: Color.colorWhite,
    position: "absolute",
  },
  off: {
    fontSize: FontSize.size_7xl,
    width: 114,
    height: 39,
    color: Color.colorWhite,
    left: 134,
    textAlign: "left",
    top: 44,
  },
  card8: {

    left: 20,
  },
  cardChild8: {
    backgroundColor: "#e4ddcb",
  },
  card9: {
    left: 287,
  },
  bannerCard: {
    // top: 220,
    width: 556,
    height: 123,
    left: 0,
    position: "relative"
  },
  deliveryTo: {
    fontSize: FontSize.size_2xs,
    textTransform: "uppercase",
    opacity: 0.5,
    fontFamily: FontFamily.manropeExtraBold,
    fontWeight: "800",
    position: "absolute",
    letterSpacing: 0.2,
    color: Color.greyScaleBlack05,
    left: 0,
    top: 0,
  },
  greenWay3000: {
    fontFamily: FontFamily.labelMedium12,
    fontWeight: "500",
    fontSize: FontSize.body02Regular14_size,
  },
  arrowIocnIcon: {
    width: 7,
    height: 4,
    marginLeft: 10,
  },
  greenWay3000SylhetParent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
  },
  deliveryToParent: {
    width: 174,
    left: 0,
    top: 0,
  },
  textParent: {
    left: 278,
    width: 58,
    top: 0,
  },
  text6: {
    top: 202,
    width: 336,
    left: 20,
  },
  bg1: {
    borderRadius: 28,
    backgroundColor: "#153075",
    width: 335,
    height: 56,
    left: 0,
    top: 0,
  },
  searchIcon: {
    height: "32.14%",
    width: "5.37%",
    top: "33.93%",
    right: "86.27%",
    bottom: "33.93%",
    left: "8.36%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  input: {
    // borderRadius: 28,
    // backgroundColor: "#153075",
    width: 282,
    height: 56,
    left: 54,
    top: 0,
    fontSize: FontSize.body02Regular14_size,
    color: Color.colorWhite

  },
  text9: {
    left: 58,
    top: 19,
    position: "absolute",
    textAlign: "left",
    fontSize: FontSize.body02Regular14_size,
  },
  searchBar: {
    top: 117,
    width: 335,
    height: 56,
    left: 20,
  },
  heyRahul: {
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    left: 0,
    top: 0,
    position: "absolute",
  },
  bagIcon: {
    left: 4,
    width: 16,
    height: 18,
  },
  frameChild: {
    left: 0,
    top: 0,
  },
  text10: {
    top: 2,
    left: 7,
    color: Color.colorWhite,
    fontFamily: FontFamily.buttonButton0114,
    fontWeight: "600",
    fontSize: FontSize.body02Regular14_size,
  },
  ellipseParent: {
    top: -7,
    left: 9,
  },
  cartIcon: {
    top: 1,
    left: 315,
  },
  heyRahulParent: {
    top: 52,
    width: 339,
    height: 30,
    left: 20,
    position: "absolute",
  },

  vectorIcon: {
    right: "87.31%",
    left: "8.8%",
  },
  vectorIcon1: {
    right: "40.64%",
    left: "55.47%",
  },
  groceryHome: {
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
  scrollView: {
    marginHorizontal: 10,
    top: 220,
  },
  imagediscount: {
    height: 100,
    width: 100,
    position: "relative",
    top: 10,
    left: 10,
  }
});

export default GroceryHome;
