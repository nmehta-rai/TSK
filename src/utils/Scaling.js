import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (width / guidelineBaseWidth) * size;

export {scale, DEVICE_HEIGHT, DEVICE_WIDTH};
