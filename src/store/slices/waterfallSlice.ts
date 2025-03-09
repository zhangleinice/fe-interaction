import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnInfo {
  count: number;
  width: number;
}

interface WaterfallState {
  columnHeights: number[];
  columnInfo: ColumnInfo | null;
  imagesLoaded: number;
}

const initialState: WaterfallState = {
  columnHeights: [],
  columnInfo: null,
  imagesLoaded: 0,
};

const waterfallSlice = createSlice({
  name: 'waterfall',
  initialState,
  reducers: {
    setColumnHeights: (state, action: PayloadAction<number[]>) => {
      state.columnHeights = action.payload;
    },
    setColumnInfo: (state, action: PayloadAction<ColumnInfo>) => {
      state.columnInfo = action.payload;
    },
    incrementImagesLoaded: (state) => {
      state.imagesLoaded += 1;
    },
    resetImagesLoaded: (state) => {
      state.imagesLoaded = 0;
    },
  },
});

export const { 
  setColumnHeights, 
  setColumnInfo, 
  incrementImagesLoaded, 
  resetImagesLoaded 
} = waterfallSlice.actions;

export default waterfallSlice.reducer; 