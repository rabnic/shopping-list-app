import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// Add a list to firestore
export const addList = createAsyncThunk("shopping/addList", async (list) => {
  console.log(list);
  const docRef = await addDoc(collection(db, "shoppingLists"), list);
  return { id: docRef.id, ...list };
});

// Delete a list from firestore
export const deleteList = createAsyncThunk(
  "shopping/deleteList",
  async (docId) => {
    const docRef = await deleteDoc(doc(db, "shoppingLists", docId));
    console.log(docRef, "delete");
    return docId;
  }
);

// Add item to selected list
export const addItem = createAsyncThunk(
  "shopping/addItem",
  async (listKeyAnditem) => {
    const [listKey, item] = listKeyAnditem;
    console.log(listKey, item);
    try {
      const docRef = doc(db, "shoppingLists", listKey);
      updateDoc(docRef, { items: arrayUnion(item) });
    } catch (e) {
      console.log(e.message);
    }
    return [listKey, item];
  }
);

// Delete item from selected list
export const deleteItem = createAsyncThunk(
  "shopping/deleteItem",
  async (listIdAndItem) => {
    const [listId, item] = listIdAndItem;
    try {
      const docRef = doc(db, "shoppingLists", listId);
      updateDoc(docRef, { items: arrayRemove(item) });
    } catch (e) {
      console.log(e.message);
    }
    return [listId, item];
  }
);

// Fetch data from firestore
export const fetchDataAsync = createAsyncThunk(
  "shopping/fetchDataAsync",
  async () => {
    const shoppingListData = {};
    try {
      const querySnapshot = await getDocs(collection(db, "shoppingLists"));
      querySnapshot.docs.forEach((snapDoc) => {
        shoppingListData[snapDoc.id] = { id: snapDoc.id, ...snapDoc.data() };
      });
      // console.log(shoppingListData);
    } catch (error) {
      console.log(error.message);
    }
    return shoppingListData;
  }
);

const initialState = {
  value: {},
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    // addList: async (state, action) => {

    //     const list = action.payload;

    //     try {
    //         console.log(list);
    //         const docRef = await addDoc(collection(db, "shoppingLists"), list);
    //         console.log("Doc written with ID:", docRef.id);
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // },

    // deleteList: async (state, action) => {
    //   const docId = action.payload;
    //   const docRef = await deleteDoc(doc(db, "shoppingLists", docId));
    //   console.log(docRef, "delete");
    // },

    // addItem: async (state, action) => {
    //   const [listKey, item] = action.payload;
    //   try {
    //     const docRef = doc(db, "shoppingLists", listKey);
    //     updateDoc(docRef, { items: arrayUnion(item) });
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // },

    // deleteItem: (state, action) => {
    //   const [listId, item] = action.payload;
    //   try {
    //     const docRef = doc(db, "shoppingLists", listId);
    //     updateDoc(docRef, { items: arrayRemove(item) });
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    // },
    editItem: (state) => {},
    // fetchData: (state) => {
    //   // state.isLoading = true;
    //   // state.isError = false;
    // },
    // fetchDataSuccess: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = false;
    //   state.value = action.payload;
    // },
    // fetchDataFailure: (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addList.fulfilled, (state, action) => {
        const list = action.payload;
        state.value = { ...state.value, [list.id]: list };
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        const tempData = { ...state.value };
        delete tempData[action.payload];
        state.value = tempData;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        const [listKey, item] = action.payload;
        const tempData = { ...state.value };
        console.log(tempData[listKey]);
        tempData[listKey].items.push(item);
        console.log(item);
        state.value = tempData;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const [listId, item] = action.payload;
        const tempData = { ...state.value };
        tempData[listId].items = tempData[listId].items.filter((currItem) => {
          return currItem.name !== item.name && currItem.brand !== item.brand;
        });
        state.value = tempData;
      });
  },
});

export const { editItem } = shoppingSlice.actions;

export const selectShopping = (state) => state.shopping.value;

export default shoppingSlice.reducer;
