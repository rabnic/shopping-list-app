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
  //console.log(list);
  const docRef = await addDoc(collection(db, "shoppingLists"), list);
  return { id: docRef.id, ...list };
});

// Delete a list from firestore
export const deleteList = createAsyncThunk(
  "shopping/deleteList",
  async (docId) => {
    const docRef = await deleteDoc(doc(db, "shoppingLists", docId));
    //console.log(docRef, "delete");
    return docId;
  }
);

// Add item to selected list
export const addItem = createAsyncThunk(
  "shopping/addItem",
  async (listKeyAnditem) => {
    const [listKey, item] = listKeyAnditem;
    //console.log(listKey, item);
    try {
      const docRef = doc(db, "shoppingLists", listKey);
      updateDoc(docRef, { items: arrayUnion(item) });
    } catch (e) {
      //console.log(e.message);
    }
    return [listKey, item];
  }
);

// Edit item in selected list
export const editItem = createAsyncThunk(
  "shopping/editItem",
  async (listKeyAnditem) => {
    const [listKey, item] = listKeyAnditem;
    //console.log(listKey, item);
    try {
      const docRef = doc(db, "shoppingLists", listKey);

      const docSNap = await getDoc(docRef);
      //console.log(docSNap.data());
      if (docSNap.exists()) {
        const itemsArray = docSNap.data().items;
        const updatedIndex = itemsArray.findIndex((currItem) => {
          //console.log(currItem.id, item.id, currItem.id === item.id);
          return currItem.id === item.id;
        });
        if (updatedIndex !== -1) {
          itemsArray[updatedIndex] = item;
          await updateDoc(docRef, { items: itemsArray });
          //console.log("Update succeeful");
        }
      }
    } catch (e) {
      //console.log(e.message);
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
      //console.log(e.message);
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
      // //console.log(shoppingListData);
    } catch (error) {
      //console.log(error.message);
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
  reducers: {},
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
        tempData[listKey].items.push(item);
        state.value = tempData;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        const [listId, item] = action.payload;
        const tempData = { ...state.value };
        tempData[listId].items = tempData[listId].items.filter((currItem) => {
          return currItem.name !== item.name && currItem.brand !== item.brand;
        });
        state.value = tempData;
      })
      .addCase(editItem.fulfilled, (state, action) => {
        const [listKey, item] = action.payload;
        const tempData = { ...state.value };

        tempData[listKey].items = tempData[listKey].items.map((currItem) => {
          return currItem.id === item.id ? item : currItem;
        });

        state.value = tempData;
      });
  },
});

// export const { editItem } = shoppingSlice.actions;

export const selectShopping = (state) => state.shopping.value;

export default shoppingSlice.reducer;
