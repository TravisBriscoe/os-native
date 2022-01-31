/**
 *
 * Imports all files used in the Theme and grouped in an object, then default exported as "theme"
 * Passed into the ThemeProvider component in App.js
 *
 */

import { colors } from "./colors";
import { fonts } from "./font";
import { fontSizes, spacing } from "./sizing";
import { screenHeight, screenWidth, orientation } from "./screen";

const theme = { colors, fonts, fontSizes, spacing, screenHeight, screenWidth, orientation };

export default theme;
