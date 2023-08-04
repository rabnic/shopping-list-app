import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  addList,
  editItem,
  selectShopping,
} from "../reducers/shoppingListSlice";

function AddListModal({ isUnderEdit: isAddList, setIsAddList }) {
  // const shoppingList = useSelector(selectShopping);
  const dispatch = useDispatch();
  const [listName, setListName] = useState("");
  const [isAddMore, setIsAddMore] = useState(false);

  const shoppingList = {
    id: listName,
    name: listName,
    items: [],
  };

  const toggleModal = () => {
    document.getElementById("add-list-modal").classList.toggle("hidden");
    document.getElementById("add-list-modal").classList.toggle("flex");
  };

  const AddNewList = (e) => {
    e.preventDefault();
    dispatch(addList(shoppingList));
    if (!isAddMore) {
      toggleModal();
    }
  };

  const handleEditItem = () => {};

  return (
    <div
      id="add-list-modal"
      tabIndex="-1"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-100
        "
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            onClick={() => {
              setIsAddList(false);
              toggleModal();
            }}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Add New List
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  List name:
                </label>
                <input
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Groceries"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value={isAddMore}
                      onChange={(e) => setIsAddMore(e.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Don't close modal after adding list?
                  </label>
                </div>
              </div>

              <button
                disabled={!listName.length}
                type="submit"
                onClick={AddNewList}
                className={`flex items-center justify-center gap-4 tracking-wider uppercase w-full text-white bg-gray-900 hover:bg-gray-900 ${
                  !listName && "opacity-50"
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              >
                <svg
                  className="w-6 h-6 text-yellow-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 21 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                  />
                </svg>
                Add List
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddListModal;
