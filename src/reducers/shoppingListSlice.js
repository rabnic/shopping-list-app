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
    arrayUnion,
    arrayRemove,
    
} from "firebase/firestore";

const initialState = {
    value: {},
};



export const shoppingSlice = createSlice({
    name: "shopping",
    initialState,
    reducers: {
        addList: async (state, action) => {
            
            const list = action.payload;
            
            try {
                console.log(list);
                const docRef = await addDoc(collection(db, "shoppingLists"), list);
                console.log("Doc written with ID:", docRef.id);
            } catch (e) {
                console.log(e.message);
            }
        },

        deleteList: async (state, action) => {
            const docId = action.payload;
            const docRef = await deleteDoc(doc(db, "shoppingLists", docId));
            console.log(docRef, 'delete');
        },

        addItem: async (state, action) => {
            const [listKey, item] = action.payload;
            try {
                const docRef = doc(db, "shoppingLists", listKey);
                updateDoc(docRef, { items: arrayUnion(item) });
            } catch (e) {
                console.log(e.message);
            }
        },

        deleteItem: (state, action) => {
            const [listId, item] = action.payload;
            try {
                const docRef = doc(db, "shoppingLists", listId);
                updateDoc(docRef, { items: arrayRemove(item) });
            } catch (e) {
                console.log(e.message);
            }
        },
        editItem: (state) => {

        },
        fetchData: (state) => {
            // state.isLoading = true;
            // state.isError = false;
        },
        fetchDataSuccess: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.value = action.payload;
        },
        fetchDataFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
    },
});

// Thunk to fetch data from Firestore
export const fetchDataAsync = () => async (dispatch) => {
    try {
        dispatch(fetchData());
        const shoppingListData = {};
        const querySnapshot = await getDocs(collection(db, "shoppingLists"));
        querySnapshot.docs.forEach(snapDoc => {
            shoppingListData[snapDoc.id] = { id: snapDoc.id, ...snapDoc.data() }
        }); 
        console.log(shoppingListData);

        dispatch(fetchDataSuccess(shoppingListData));
        console.log('after data sucess');
    } catch (error) {
        dispatch(fetchDataFailure());
    }
};


export const { addList, addItem, deleteItem, editItem, fetchData, fetchDataSuccess, fetchDataFailure, deleteList } = shoppingSlice.actions;

export const selectShopping = (state) => state.shopping.value;

export default shoppingSlice.reducer;
