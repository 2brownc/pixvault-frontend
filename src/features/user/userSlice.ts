import { createAppSlice } from "../../app/createAppSlice";
import type { User, UpdateUser, UpdateImage, ImageRecord } from "../../types";
import { getUserProfile } from "../../api/user";
import { setFavorite, unsetFavorite } from "../../api/favs";
import {
  deleteAllRecentImageHistory,
  setRecentImage,
  unsetRecentImage,
} from "../../api/history";

// Initial state for the user slice
const initialState: User = {
  name: "",
  userId: "",
  history: [],
  favorites: [],
  accountLoading: false,
  historyLoading: false,
  favoritesLoading: false,
  accountAction: null,
  historyAction: null,
  favoritesAction: null,
};

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    // Async thunk to update user data
    updateUser: create.asyncThunk(
      async (payload: UpdateUser) => {
        const user: User = await getUserProfile(
          payload.userId,
          payload.accessToken
        );
        return user;
      },
      {
        // Set accountLoading to true while fetching user data
        pending: (state) => {
          state.accountLoading = true;
          state.accountAction = "Loading User Profile";
        },
        // Set accountLoading to false after fetching user data
        fulfilled: (state, action) => {
          if (action.payload) {
            state.name = action.payload.name;
            state.userId = action.payload.userId;
            state.history = action.payload.history;
            state.favorites = action.payload.favorites;
          }
          state.accountLoading = false;
          state.accountAction = "Loaded User Profile";
        },
        // Set accountLoading to false if fetching user data fails
        rejected: (state) => {
          state.accountLoading = false;
          state.accountAction = "Failed to Load User Profile";
        },
      }
    ),
    // Async thunk to add a favorite image
    addFavorites: create.asyncThunk(
      async (payload: UpdateImage) => {
        const result: boolean = await setFavorite(
          payload.userId,
          payload.imageRecord,
          payload.accessToken
        );
        return { result, imageRecord: payload.imageRecord };
      },
      {
        // Set favoritesLoading to true while adding a favorite
        pending: (state) => {
          state.favoritesLoading = true;
          state.favoritesAction = "Adding Favorite";
        },
        // Set favoritesLoading to false after adding a favorite
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.favorites.push(action.payload.imageRecord);
          }
          state.favoritesLoading = false;
          state.favoritesAction = "Added Favorite";
        },
        // Set favoritesLoading to false if adding a favorite fails
        rejected: (state) => {
          state.favoritesLoading = false;
          state.favoritesAction = "Failed to Add Favorite";
        },
      }
    ),
    // Async thunk to remove a favorite image
    removeFavorites: create.asyncThunk(
      async (payload: UpdateImage) => {
        const result: boolean = await unsetFavorite(
          payload.userId,
          payload.imageRecord.id,
          payload.accessToken
        );
        return { result, imageRecord: payload.imageRecord };
      },
      {
        // Set favoritesLoading to true while removing a favorite
        pending: (state) => {
          state.favoritesLoading = true;
          state.favoritesAction = "Removing Favorite";
        },
        // Set favoritesLoading to false after removing a favorite
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.favorites = state.favorites.filter(
              (imageRecord) => imageRecord.id !== action.payload.imageRecord.id
            );
          }
          state.favoritesLoading = false;
          state.favoritesAction = "Removed Favorite";
        },
        // Set favoritesLoading to false if removing a favorite fails
        rejected: (state) => {
          state.favoritesLoading = false;
          state.favoritesAction = "Failed to Remove Favorite";
        },
      }
    ),
    addRecentImage: create.asyncThunk(
      async (payload: UpdateImage) => {
        const result: boolean = await setRecentImage(
          payload.userId,
          payload.imageRecord,
          payload.accessToken
        );
        return { result, imageRecord: payload.imageRecord };
      },
      {
        // Set to true while adding a recent image
        pending: (state) => {
          state.historyLoading = true;
          state.historyAction = "Adding Recent Image";
        },
        // Set to false after adding a favorite
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.history.push(action.payload.imageRecord);
          }
          state.historyLoading = false;
          state.historyAction = "Added Recent Image";
        },
        // Set to false if adding a image fails
        rejected: (state) => {
          state.historyLoading = false;
          state.historyAction = "Failed to Add Recent Image";
        },
      }
    ),
    removeRecentImage: create.asyncThunk(
      async (payload: UpdateImage) => {
        const result: boolean = await unsetRecentImage(
          payload.userId,
          payload.imageRecord,
          payload.accessToken
        );
        return { result, imageRecord: payload.imageRecord };
      },
      {
        // Set to true while removing a recent image
        pending: (state) => {
          state.historyLoading = true;
          state.historyAction = "Removing Recent Image";
        },
        // Set to false after removing a recent image
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.history = state.history.filter(
              (imageRecord) => imageRecord.id !== action.payload.imageRecord.id
            );
          }
          state.historyLoading = false;
          state.historyAction = "Removed Recent Image";
        },
        // Set to false if removing a image fails
        rejected: (state) => {
          state.historyLoading = false;
          state.historyAction = "Failed to Remove Recent Image";
        },
      }
    ),
    clearRecentImageHistory: create.asyncThunk(
      async (payload: UpdateImage) => {
        const result: boolean = await deleteAllRecentImageHistory(
          payload.userId,
          payload.accessToken
        );
        return { result, imageRecord: payload.imageRecord };
      },
      {
        // Set to true while removing a recent image history
        pending: (state) => {
          state.historyLoading = true;
          state.historyAction = "Clearing Recent Image History";
        },
        // Set to false after removing the recnt image history
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.history = [];
          }
          state.historyLoading = false;
          state.historyAction = "Cleared Recent Image History";
        },
        // Set to false if removing the recent history fails
        rejected: (state) => {
          state.historyLoading = false;
          state.historyAction = "Failed to Clear Recent Image History";
        },
      }
    ),
  }),
  // Selectors to access specific parts of the state
  selectors: {
    selectName: (user) => user.name,
    selectId: (user) => user.userId,
    selectHistory: (user) => user.history,
    selectFavorites: (user) => user.favorites,
    accountLoading: (user) => user.accountLoading,
    favoritesLoading: (user) => user.favoritesLoading,
    historyLoading: (user) => user.historyLoading,
    accountAction: (user) => user.accountAction,
    historyAction: (user) => user.historyAction,
    favoritesAction: (user) => user.favoritesAction,
  },
});

// Action creators are generated for each case reducer function.
export const {
  updateUser,
  addFavorites,
  removeFavorites,
  addRecentImage,
  removeRecentImage,
  clearRecentImageHistory,
} = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectName,
  selectId,
  selectHistory,
  selectFavorites,
  accountLoading,
  favoritesLoading,
  historyLoading,
  accountAction,
  historyAction,
  favoritesAction,
} = userSlice.selectors;
