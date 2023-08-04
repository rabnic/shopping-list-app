import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
} from "firebase/firestore";

const initialState = {
  value: {},
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addList: async (state, action) => {
      //   state.value = { ...state.value, [action.payload.id]: action.payload };
      const list = action.payload;
      //   db.collection("shoppingLists").doc(list.id).set(list); // Save the list to Firestore
      try {
        console.log(list);
        const docRef = await addDoc(collection(db, "shoppingLists"), list);
        console.log("Doc written with ID:", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    },
    addItem: (state, action) => {
      const [listKey, item] = action.payload;
      state.value = {
        ...state.value,
        [listKey]: {
          ...state.value[listKey],
          items: [...state.value[listKey].items, item],
        },
      };
    },
    deleteItem: (state, action) => {
      const [listId, itemId] = action.payload;
      state.value = {
        ...state.value,
        [listId]: {
          ...state.value[listId],
          items: state.value[listId].items.filter((item) => item.id !== itemId),
        },
      };
    },
    editItem: (state) => {},
  },
});

export const { addList, addItem, deleteItem, editItem } = shoppingSlice.actions;

export const selectShopping = (state) => state.shopping.value;

export default shoppingSlice.reducer;
