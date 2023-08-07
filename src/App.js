import React, { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteItem,
  fetchDataAsync,
  deleteList,
} from "./reducers/shoppingListSlice";

import "./App.css";
import AddAndEditModal from "./components/AddItemModal";
import AddListModal from "./components/AddListModal";

import catBoxImage from "./assets/images/cat_in_the_box.png";

function App() {
  const dispatch = useDispatch();

  const shoppingList = useSelector((state) => state.shopping.value);
  const [isUnderEdit, setIsUnderEdit] = useState(false);
  const [itemUnderEdit, setItemUnderEdit] = useState(null)
  const [isAddList, setIsAddList] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const selectedDivRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDataAsync());
  }, [dispatch]);

  const toggleListModal = () => {
    document.getElementById("add-list-modal").classList.toggle("hidden");
    document.getElementById("add-list-modal").classList.toggle("flex");
  };

  const toggleItemModal = () => {
    document.getElementById("add-item-modal").classList.toggle("hidden");
    document.getElementById("add-item-modal").classList.toggle("flex");
  };

  const handleSetCurrentList = (e) => {
    const key = e.target.dataset.value;
    setCurrentList(shoppingList[key]);
    // Remove background from previously selected div (if any)
    if (selectedDivRef.current) {
      selectedDivRef.current.classList.remove("bg-gray-700");
    }
    // Update the background of the newly selected div
    selectedDivRef.current = e.target;
    selectedDivRef.current.classList.add("bg-gray-700");
  };

  const handleItemDelete = (listId, itemId) => {
    const isDeleteConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isDeleteConfirmed) {
      // console.log(listId, itemId, "Deleted");
      dispatch(deleteItem([listId, itemId]));
    }
  };

  const handleDeleteList = () => {
    const isDeleteConfirmed = window.confirm(
      "Are you sure you want to delete this list?"
    );
    if (isDeleteConfirmed) {
      setCurrentList(null);

      dispatch(deleteList(currentList.id));
    }
  };

  return (
    <main className="min-h-full w-full from-gray-900 to-gray-600 bg-gradient-to-r">
      <header className="container text-center mx-auto py-3 px-4 min-w-full shadow-md shadow-bottom shadow-yellow-600 flex justify-between text-yellow-500">
        <h1 className="flex justify-center items-center text-2xl font-extrabold   md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-yellow-400">
          <svg
            className="w-8 h-8 text-yellow-600 mr-3"
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
          Shopping List
        </h1>
        {/* <p className="rounded-full w-16 h-16 font-semibold flex justify-center items-center bg-gray-500">
          ND
        </p> */}
      </header>
      <AddListModal isAddList={isAddList} setIsAddList={setIsAddList} />
      {currentList && (
        <AddAndEditModal
          isUnderEdit={isUnderEdit}
          setIsUnderEdit={setIsUnderEdit}
          listKey={currentList.id}
          dispatch={dispatch}
          itemUnderEdit={itemUnderEdit}
          setItemUnderEdit={setItemUnderEdit}
        />
      )}

      <section className="mt-8 flex flex-wrap justify-start gap-8">
        <div className="border-b pb-2 border-gray-600 h-fit">
          <button
            data-modal-target="add-item-modal"
            data-modal-toggle="add-item-modal"
            type="button"
            onClick={toggleListModal}
            className="flex m-2 gap-3 items-center justify-center w-fit-content  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-16 py-4 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            New List
          </button>
          {console.log(shoppingList)}
          {shoppingList &&
            Object.keys(shoppingList).length > 0 &&
            Object.keys(shoppingList).map((key) => {
              return (
                <div
                  href="#"
                  className="p-2 rounded-r-full hover:bg-gray-700"
                  key={key}
                  data-value={key}
                  onClick={handleSetCurrentList}
                  ref={selectedDivRef}
                >
                  <h5
                    className="text-lg font-bold w-fit tracking-tight text-gray-400 "
                    data-value={key}
                    onClick={handleSetCurrentList}
                  >
                    {shoppingList[key].name}
                  </h5>
                  <p
                    className="pl-3 font-normal w-fit text-gray-500"
                    data-value={key}
                    onClick={handleSetCurrentList}
                  >
                    {shoppingList[key].items.length} Items
                  </p>
                </div>
              );
            })}
        </div>

        {currentList && (
          <div className="flex-1 shadow-left shadow-yellow-600 px-3">
            <div className="flex items-center">
              <h2 className="mb-4 mr-auto text-2xl font-extrabold text-gray-900 dark:text-white md:text-lg lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                {currentList.name} list items
              </h2>
              {currentList.items.length > 0 && (
                <button
                  data-modal-target="add-item-modal"
                  data-modal-toggle="add-item-modal"
                  type="button"
                  onClick={toggleItemModal}
                  className="ml-auto flex gap-3 items-center justify-center w-fit-content  text-white bg-sky-600 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-8 py-4 text-center"
                >
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.855 11.273 2.105-7a.952.952 0 0 0-.173-.876 1.042 1.042 0 0 0-.37-.293 1.098 1.098 0 0 0-.47-.104H5.021L4.395.745a.998.998 0 0 0-.376-.537A1.089 1.089 0 0 0 3.377 0H1.053C.773 0 .506.105.308.293A.975.975 0 0 0 0 1c0 .265.11.52.308.707.198.187.465.293.745.293h1.513l.632 2.254v.02l2.105 6.999.785 2.985a3.13 3.13 0 0 0-1.296 1.008 2.87 2.87 0 0 0-.257 3.06c.251.484.636.895 1.112 1.19a3.295 3.295 0 0 0 3.228.12c.5-.258.918-.639 1.208-1.103.29-.465.444-.995.443-1.535a2.834 2.834 0 0 0-.194-1h2.493a2.84 2.84 0 0 0-.194 1c0 .593.186 1.173.533 1.666.347.494.84.878 1.417 1.105a3.314 3.314 0 0 0 1.824.17 3.213 3.213 0 0 0 1.617-.82 2.95 2.95 0 0 0 .864-1.536 2.86 2.86 0 0 0-.18-1.733 3.038 3.038 0 0 0-1.162-1.346 3.278 3.278 0 0 0-1.755-.506h-7.6l-.526-2h9.179c.229 0 .452-.07.634-.201a1 1 0 0 0 .379-.524Zm-2.066 4.725a1.1 1.1 0 0 1 .585.168c.173.11.308.267.388.45.08.182.1.383.06.577a.985.985 0 0 1-.288.512 1.07 1.07 0 0 1-.54.274 1.104 1.104 0 0 1-.608-.057 1.043 1.043 0 0 1-.472-.369.965.965 0 0 1-.177-.555c0-.265.11-.52.308-.707.197-.188.465-.293.744-.293Zm-7.368 1a.965.965 0 0 1-.177.555c-.116.165-.28.293-.473.369a1.104 1.104 0 0 1-.608.056 1.07 1.07 0 0 1-.539-.273.985.985 0 0 1-.288-.512.953.953 0 0 1 .06-.578c.08-.182.214-.339.388-.448a1.092 1.092 0 0 1 1.329.124.975.975 0 0 1 .308.707Zm5.263-8.999h-1.053v1c0 .265-.11.52-.308.707a1.081 1.081 0 0 1-.744.293c-.28 0-.547-.106-.745-.293a.975.975 0 0 1-.308-.707v-1H9.474a1.08 1.08 0 0 1-.745-.293A.975.975 0 0 1 8.421 7c0-.265.11-.52.308-.707.198-.187.465-.293.745-.293h1.052V5c0-.265.111-.52.309-.707.197-.187.465-.292.744-.292.279 0 .547.105.744.292a.975.975 0 0 1 .308.707v1h1.053c.28 0 .547.106.744.293a.975.975 0 0 1 .309.707c0 .265-.111.52-.309.707a1.081 1.081 0 0 1-.744.293Z" />
                  </svg>
                  New Item
                </button>
              )}
              <button
                data-modal-target="add-item-modal"
                data-modal-toggle="add-item-modal"
                type="button"
                onClick={handleDeleteList}
                className="flex gap-3 items-center justify-center w-fit-content text-white bg-red-400 hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-8 py-4 ml-2 text-center"
              >
                <svg
                  className="w-[28px] h-[28px] text-gray-700 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                </svg>
                Delete List
              </button>
            </div>
            <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-700" />

            {currentList.items.length > 0 ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full whitespace-nowrap border-collapse">
                  <tbody>
                    {currentList &&
                      shoppingList[currentList.id].items.map((item) => {
                        return (

                          <tr
                            key={item.id}
                            className="h-16 mb-3 border border-red-500 rounded-lg pr-4 text-gray-100"
                          >
                            <td>
                              <div className="ml-5">
                                <div className="bg-yellow-700 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                  <input
                                    type="checkbox"
                                    className="checkbox opacity-50 absolute cursor-pointer w-full h-full"
                                  />
                                  {/* <div className="check-icon  bg-indigo-700 text-white rounded-sm">
                                                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <path d="M5 12l5 5l10 -10" />
                                                        </svg>
                                                    </div> */}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center px-5">
                                <p className="text-base font-medium leading-none mr-2">
                                  {item.name}
                                </p>
                              </div>
                            </td>
                            <td>
                              <div className="flex items-center px-5">
                                <p className="text-base font-medium leading-none mr-2">
                                  {item.brand}
                                </p>
                              </div>
                            </td>
                            <td className="px-5">
                              <div className="flex items-center">
                                <p className="text-sm leading-none ml-2">
                                  {item.quantity}
                                </p>
                              </div>
                            </td>
                            <td className="px-5">
                              <button
                                className="flex items-center"
                                onClick={() => {
                              setIsUnderEdit(true);
                              toggleItemModal();
                              setItemUnderEdit(item);
                                }}
                              >
                                <svg
                                  className="w-[28px] h-[28px] text-sky-400 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 18"
                                >
                                  <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                  <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                </svg>
                              </button>
                            </td>
                            <td className="px-5">
                              <button
                                onClick={() =>
                                  handleItemDelete(currentList?.id, item)
                                }
                                className="flex items-center"
                              >
                                <svg
                                  className="w-[28px] h-[28px] text-red-400 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 18 20"
                                >
                                  <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                </svg>
                              </button>
                            </td>
                          </tr>


                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full w-full flex flex-col justify-center items-center gap-3">
                <img
                  src={catBoxImage}
                  alt="cat in a box"
                  className="w-40"
                  loading="lazy"
                />
                <p className="text-lg font-sm text-gray-300 lg:text-xl">
                  It's lonely in here. Add some items to your shopping list!
                </p>
                <button
                  data-modal-target="add-item-modal"
                  data-modal-toggle="add-item-modal"
                  type="button"
                  onClick={toggleItemModal}
                  className="flex m-2 gap-3 items-center justify-center w-fit-content  text-white bg-sky-600 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-16 py-4 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.855 11.273 2.105-7a.952.952 0 0 0-.173-.876 1.042 1.042 0 0 0-.37-.293 1.098 1.098 0 0 0-.47-.104H5.021L4.395.745a.998.998 0 0 0-.376-.537A1.089 1.089 0 0 0 3.377 0H1.053C.773 0 .506.105.308.293A.975.975 0 0 0 0 1c0 .265.11.52.308.707.198.187.465.293.745.293h1.513l.632 2.254v.02l2.105 6.999.785 2.985a3.13 3.13 0 0 0-1.296 1.008 2.87 2.87 0 0 0-.257 3.06c.251.484.636.895 1.112 1.19a3.295 3.295 0 0 0 3.228.12c.5-.258.918-.639 1.208-1.103.29-.465.444-.995.443-1.535a2.834 2.834 0 0 0-.194-1h2.493a2.84 2.84 0 0 0-.194 1c0 .593.186 1.173.533 1.666.347.494.84.878 1.417 1.105a3.314 3.314 0 0 0 1.824.17 3.213 3.213 0 0 0 1.617-.82 2.95 2.95 0 0 0 .864-1.536 2.86 2.86 0 0 0-.18-1.733 3.038 3.038 0 0 0-1.162-1.346 3.278 3.278 0 0 0-1.755-.506h-7.6l-.526-2h9.179c.229 0 .452-.07.634-.201a1 1 0 0 0 .379-.524Zm-2.066 4.725a1.1 1.1 0 0 1 .585.168c.173.11.308.267.388.45.08.182.1.383.06.577a.985.985 0 0 1-.288.512 1.07 1.07 0 0 1-.54.274 1.104 1.104 0 0 1-.608-.057 1.043 1.043 0 0 1-.472-.369.965.965 0 0 1-.177-.555c0-.265.11-.52.308-.707.197-.188.465-.293.744-.293Zm-7.368 1a.965.965 0 0 1-.177.555c-.116.165-.28.293-.473.369a1.104 1.104 0 0 1-.608.056 1.07 1.07 0 0 1-.539-.273.985.985 0 0 1-.288-.512.953.953 0 0 1 .06-.578c.08-.182.214-.339.388-.448a1.092 1.092 0 0 1 1.329.124.975.975 0 0 1 .308.707Zm5.263-8.999h-1.053v1c0 .265-.11.52-.308.707a1.081 1.081 0 0 1-.744.293c-.28 0-.547-.106-.745-.293a.975.975 0 0 1-.308-.707v-1H9.474a1.08 1.08 0 0 1-.745-.293A.975.975 0 0 1 8.421 7c0-.265.11-.52.308-.707.198-.187.465-.293.745-.293h1.052V5c0-.265.111-.52.309-.707.197-.187.465-.292.744-.292.279 0 .547.105.744.292a.975.975 0 0 1 .308.707v1h1.053c.28 0 .547.106.744.293a.975.975 0 0 1 .309.707c0 .265-.111.52-.309.707a1.081 1.081 0 0 1-.744.293Z" />
                  </svg>
                  New Item
                </button>
              </div>
            )}

            <></>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
