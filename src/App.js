import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import './App.css';
import AddAndEditModal from './components/AddItemModal';

const handleOpenModal = () => {
  document.getElementById('add-item-modal').classList.toggle('hidden');
  document.getElementById('add-item-modal').classList.toggle('flex');
}



function App() {
  const shoppingList = useSelector(state => state.shopping.value);
  const [isUnderEdit, setIsUnderEdit] = useState(false);
  console.log(shoppingList)

  return (
    <main className='min-h-full w-full from-gray-900 to-gray-600 bg-gradient-to-r'>
      <header className='container text-center mx-auto py-4 min-w-full shadow-md shadow-bottom shadow-yellow-600'>
        <h1 className="flex justify-center items-center pb-4 text-3xl font-extrabold text-yellow-500 dark:text-white md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-yellow-400">
          <svg class="w-14 h-14 text-slate-400 ml-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
          </svg>
          Shopping List</h1>
      </header>
      <section className='mt-8 flex flex-col md:flex-row md:justify-center md:gap-6 md:items-start items-center'>
        <button
          data-modal-target="add-item-modal" data-modal-toggle="add-item-modal"
          type="button"
          onClick={handleOpenModal}
          className="flex gap-3 items-center justify-center w-fit-content  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-16 py-4 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          <svg className="w-6 h-6 text-yellow-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
          Add New Item
        </button>
        <div>
          <AddAndEditModal isUnderEdit={isUnderEdit} setIsUnderEdit={setIsUnderEdit} />
          <div>
            <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-lg lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">My shopping list items</h2>
            <hr className="h-px my-8 bg-gray-500 border-0 dark:bg-gray-700" />
            <p className="text-lg font-normal text-gray-300 lg:text-xl dark:text-gray-200 hidden">
              {!shoppingList && `It's lonely in here. Add some items to your shopping list!`}
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full whitespace-nowrap border-collapse">
              <tbody>
                {
                  shoppingList && shoppingList.map(item => {
                    return (
                      <>
                        <tr className="h-16 border border-red-500 rounded-lg pr-4 bg-slate-100 ">
                          <td>
                            <div className="ml-5">
                              <div className="bg-yellow-700 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                <input type="checkbox" className="checkbox opacity-50 absolute cursor-pointer w-full h-full" />
                                {/* <div className="check-icon  bg-indigo-700 text-white rounded-sm">
                                                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <path d="M5 12l5 5l10 -10" />
                                                        </svg>
                                                    </div> */}
                              </div>
                            </div>
                          </td>
                          <td className>
                            <div className="flex items-center px-5">
                              <p className="text-base font-medium leading-none text-gray-700 mr-2">{item.name}</p>
                            </div>
                          </td>
                          <td className>
                            <div className="flex items-center px-5">
                              <p className="text-base font-medium leading-none text-gray-700 mr-2">{item.brand}</p>
                            </div>
                          </td>
                          <td className="px-5">
                            <div className="flex items-center">
                              <p className="text-sm leading-none text-gray-600 ml-2">{item.quantity}</p>
                            </div>
                          </td>
                          <td className="px-5">
                            <div className="flex items-center" onClick={() => { setIsUnderEdit(true); handleOpenModal() }}>
                              <svg className="w-[28px] h-[28px] text-sky-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                              </svg>
                            </div>
                          </td>
                          <td className="px-5">
                            <div className="flex items-center">
                              <svg className="w-[28px] h-[28px] text-red-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                              </svg>
                            </div>
                          </td>
                        </tr>
                        <tr className="h-3" />
                      </>
                    )
                  })
                }


              </tbody>
            </table>
          </div>
        </div>

      </section>

    </main>
  );
}

export default App;