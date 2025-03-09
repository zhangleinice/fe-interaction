import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarouselState {
  currentIndex: number;
  autoPlay: boolean;
}

const initialState: CarouselState = {
  currentIndex: 0,
  autoPlay: true,
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    nextSlide: (state) => {
      // Logic for next slide will be implemented
    },
    prevSlide: (state) => {
      // Logic for previous slide will be implemented
    },
    toggleAutoPlay: (state) => {
      state.autoPlay = !state.autoPlay;
    },
  },
});

export const { setCurrentIndex, nextSlide, prevSlide, toggleAutoPlay } = carouselSlice.actions;
export default carouselSlice.reducer; 