import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const orientation = screenWidth > screenHeight ? "landscape" : "portrait";
