import { createAppSlice } from "../../app/createAppSlice"
import type { User, UpdateUser, UpdateFavorites } from "../../types"
import { getUserProfile } from "../../api/user"
import { setFavorite } from "../../api/favs"

const initialState: User = {
  name: "",
  _id: "",
  history: [],
  favorites: [],
  accountLoading: false,
  historyLoading: false,
  favoritesLoading: false,
}

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    updateUser: create.asyncThunk(
      async (payload: UpdateUser) => {
        const user: User = await getUserProfile(
          payload.userId,
          payload.accessToken,
        )
        return user
      },
      {
        pending: state => {
          state.accountLoading = true
        },
        fulfilled: (state, action) => {
          state.name = action.payload.name
          state._id = action.payload._id
          state.history = action.payload.history
          state.favorites = action.payload.favorites
          state.accountLoading = false
        },
        rejected: state => {
          state.accountLoading = false
        },
      },
    ),
    updateFavorites: create.asyncThunk(
      async (payload: UpdateFavorites) => {
        const result: boolean = await setFavorite(
          payload.userId,
          payload.imageRecord,
          payload.accessToken,
        )
        return { result, imageRecord: payload.imageRecord }
      },
      {
        pending: state => {
          state.favoritesLoading = true
        },
        fulfilled: (state, action) => {
          if (action.payload.result) {
            state.favorites = [...state.favorites, action.payload.imageRecord]
            state.favoritesLoading = false
          }
        },
        rejected: state => {
          state.favoritesLoading = false
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectName: user => user.name,
    selectId: user => user._id,
    selectHistory: user => user.history,
    selectFavorites: user => user.favorites,
  },
})

// Action creators are generated for each case reducer function.
export const { updateUser, updateFavorites } = userSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectName, selectId, selectHistory, selectFavorites } =
  userSlice.selectors
