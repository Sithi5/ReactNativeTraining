import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Id } from '../types/Id';

export type FavoritesState = {
    list: Id[];
};

const initialState: FavoritesState = {
    list: [],
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        updateFavorites: (state, action: PayloadAction<Id>) => {
            if (state.list.includes(action.payload)) {
                const index = state.list.indexOf(action.payload);
                if (index > -1) {
                    state.list.splice(index, 1);
                }
            } else {
                state.list.push(action.payload);
            }
        },
        addFavorites: (state, action: PayloadAction<Id>) => {
            if (!state.list.includes(action.payload)) {
                state.list.push(action.payload);
            }
        },
        removeFavorites: (state, action: PayloadAction<Id>) => {
            const index = state.list.indexOf(action.payload);
            if (index > -1) {
                state.list.splice(index, 1);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addFavorites, removeFavorites, updateFavorites } =
    favoritesSlice.actions;

export default favoritesSlice.reducer;
