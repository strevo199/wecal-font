import { Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');

export const COLORS = {
    // base colors;
    primary: "#013C94",  //bule
    darkPrimary: "#161b5b",  //bule
    lightBlue: "#5a81e31c",
    secondary: '#0c381f',   //darkgreen
    orange: "#9e6a0a",
    yellow: "#f5c105",



    lime: "#00ba63",
    emerald: "#2bc978",

    red: "#ff4134",
    lightRed: "#fff1f0",

    purple: "#6b3ce9",
    lightpurple: "#f3efff",
    transparentBlack: '#1b191b92',

    lightyellow: "#fff9ec",

    black: "#1e1f20",
    white: "#ffffff",

    ligthGray: "#6c6d7162",
    gray: "#6a6668",
    darkgray: "#363633",


    transparent: "transparent",
    
    link: '#0976ca',
    creditBgCOlor: "#66d59a23",
    creditCOlor: "#01642a",
    debitBgCOlor: "#de230a27",
    debitCOlor: "#de230a",
}

export const SIZES = {
    // global sizex;
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // fontSize
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimension
    width,
    height


}

 

export const FONTS = {
    largeTitle: {fontFamily: "Roboto-Black",fontSize:SIZES.largeTitle, lineHeight: 55},
    h1: {fontFamily: "Roboto-Black",fontSize:SIZES.h1, lineHeight: 36},
    h2: {fontFamily: "Roboto-Bold",fontSize:SIZES.h2, lineHeight: 30},
    h3: {fontFamily: "Roboto-Bold",fontSize:SIZES.h3, lineHeight: 22},
    h4: {fontFamily: "Roboto-Bold",fontSize:SIZES.h4, lineHeight: 22},
    body1: {fontFamily: "Roboto-regular",fontSize:SIZES.body1, lineHeight: 36},
    body2: {fontFamily: "Roboto-regular",fontSize:SIZES.body2, lineHeight: 30},
    body3: {fontFamily: "Roboto-regular",fontSize:SIZES.body3, lineHeight: 22},
    body4: {fontFamily: "Roboto-regular",fontSize:SIZES.body4, lineHeight: 22},
    body5: {fontFamily: "Roboto-regular",fontSize:SIZES.body5, lineHeight: 22},
}