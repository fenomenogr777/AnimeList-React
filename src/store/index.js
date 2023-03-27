// REDUX
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
   animeReducer,
   addAnimeToList,
   removeAnimeToList,
   loadAnimesLocalStorage,
} from './slices/animeSlice'
import { formReducer, getQuery, getSearchName } from './slices/formSlice'

// REDUX QUERY
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { animesApi } from './apis/animesApi'

// REDUX PERSISTENT
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
   key: 'anime',
   version: 1,
   storage,
}

const reducer = combineReducers({
   storeAnimes: animeReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
   reducer: {
      persistedReducer,
      storeForm: formReducer,
      [animesApi.reducerPath]: animesApi.reducer,
   },
   middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(animesApi.middleware)
   },
})
setupListeners(store.dispatch)

export {
   store,
   addAnimeToList,
   removeAnimeToList,
   getQuery,
   getSearchName,
   loadAnimesLocalStorage,
}
