import { combineReducers } from '@reduxjs/toolkit';
import carouselReducer from './slices/carouselSlice';
import waterfallReducer from './slices/waterfallSlice';

const rootReducer = combineReducers({
  carousel: carouselReducer,
  waterfall: waterfallReducer,
});

export default rootReducer; 