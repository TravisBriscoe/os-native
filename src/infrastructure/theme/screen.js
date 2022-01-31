/**
 *
 * Screen width and height calculations passed into a context and added to the theme
 * Accessable in props.theme.
 *
 */

import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const screenOrientation = screenWidth > screenHeight ? "landscape" : "portrait";
