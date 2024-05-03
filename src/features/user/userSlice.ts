import { createAppSlice } from "../../app/createAppSlice";
import type {
  User,
  UpdateUser,
  UpdateFavorites,
  ImageRecord,
} from "../../types";
import { getUserProfile } from "../../api/user";
import { setFavorite, unsetFavorite } from "../../api/favs";

// Initial state for the user slice
const initialState: User = {
  name: "",
  userId: "",
  history: [],
  favorites: [],
  accountLoading: false,
  historyLoading: false,
  favoritesLoading: false,
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
        },
        // Set accountLoading to false if fetching user data fails
        rejected: (state) => {
          state.accountLoading = false;
        },
      }
    ),
    // Async thunk to add a favorite image
    addFavorites: create.asyncThunk(
      async (payload: UpdateFavorites) => {
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
        },
        // Set favoritesLoading to false after adding a favorite
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.favorites.push(action.payload.imageRecord);
          }
          state.favoritesLoading = false;
        },
        // Set favoritesLoading to false if adding a favorite fails
        rejected: (state) => {
          state.favoritesLoading = false;
        },
      }
    ),
    // Async thunk to remove a favorite image
    removeFavorites: create.asyncThunk(
      async (payload: UpdateFavorites) => {
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
        },
        // Set favoritesLoading to false after removing a favorite
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.favorites = state.favorites.filter(
              (imageRecord) => imageRecord.id !== action.payload.imageRecord.id
            );
          }
          state.favoritesLoading = false;
        },
        // Set favoritesLoading to false if removing a favorite fails
        rejected: (state) => {
          state.favoritesLoading = false;
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
  },
});

// Action creators are generated for each case reducer function.
export const { updateUser, addFavorites, removeFavorites } = userSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectName,
  selectId,
  selectHistory,
  selectFavorites,
  accountLoading,
} = userSlice.selectors;
