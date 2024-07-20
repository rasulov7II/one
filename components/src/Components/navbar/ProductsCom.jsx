import { Button, Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImageUpload from "../imgUpload";
import EditCrud from "../main/edit";


const ProductsCom = () => {
    const [state, setState] = useState([]);
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');

    let token = localStorage.getItem("token");
    useEffect(() => {
        axios("https://omofood.pythonanywhere.com/api/v1/products/", {
            headers: {
                Authorization: ` Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setState(res?.data);
                } else {
                    throw new Error("Failed to fetch data");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                toast.error("mahsulod qushildi");
            });
    }, []);
    const [inputValue, setInputValue] = useState({
        title: "",
        description: "",
        price: "",
        amount: "",
        amount_measure: "",
        category: "",
        image: "",
    });

    useEffect(() => {
        if (isModalOpen) {
            axios
                .get("https://omofood.pythonanywhere.com/api/v1/categories/")
                .then((res) => {
                    setData(res.data);
                });
        }
    }, [isModalOpen]);
    const showModal = () => {
        setIsModalOpen(false);
    };
    const handleOk = async () => {
        const formData = new FormData();
        formData.append("title", inputValue.title);
        formData.append("image", inputValue.image);
        formData.append("description", inputValue.description);
        formData.append("price", inputValue.price);
        formData.append("amount", inputValue.amount);
        formData.append("amount_measure", inputValue.amount_measure);
        formData.append("category", inputValue?.category);

        if (inputValue?.subcategory) {
            formData.append("subcategory", inputValue?.subcategory);
        }

        try {
            await fetch("https://omofood.pythonanywhere.com/api/v1/products/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }).unwrap();
            toast.success(`Category ${inputValue?.title} added successfully`);
            setInputValue({
                title: "",
                img: "",
            });
        }
        catch (error) {
            toast.error(` ${inputValue?.title} Malumoti qo'shildi!`);
            window.location.reload()
        }

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const Delete = (id) => {
        axios.delete(`https:omofood.pythonanywhere.com/api/v1/products/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
            .then((res) => {
                if (res.status == 204) {
                    toast.success('malumot uchirildi')
                    axios("https://omofood.pythonanywhere.com/api/v1/products/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((res) => {
                        if (res.status === 200) {
                            setData(res?.data);
                            setState(false);
                             window.location.reload()
                        }
                    });
                }
            })


    }

    
      const filteredData = state
    ? state?.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    : [];


    return (
        <div>
            <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <div class="mx-auto h-[95.3vh] max-w-screen-2xl px-4 lg:px-12">
                    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div class="flex-1 flex items-center space-x-2">
                                <h5>
                                    <span class="text-gray-500">All Products:</span>
                                    <span class="dark:text-white">123456</span>
                                </h5>
                                <h5 class="text-gray-500 dark:text-gray-400 ml-1">
                                    1-100 (436)
                                </h5>
                                <button
                                    type="button"
                                    class="group"
                                    data-tooltip-target="results-tooltip"
                                >
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        viewbox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <span class="sr-only">More info</span>
                                </button>
                                <div
                                    id="results-tooltip"
                                    role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                >
                                    Showing 1-100 of 436 results
                                    <div class="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                            </div>
                            <div class="flex-shrink-0 flex flex-col items-start md:flex-row md:items-center lg:justify-end space-y-3 md:space-y-0 md:space-x-3">
                                <button
                                    type="button"
                                    class="flex-shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewbox="0 0 24 24"
                                        fill="currentColor"
                                        class="mr-2 w-4 h-4"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                        />
                                    </svg>
                                    Table settings
                                </button>
                            </div>

                            {isModalOpen && (
                                <div>
                                    <Button type="primary" onClick={showModal}>
                                        Open Modal
                                    </Button>
                                    <Modal
                                        title="Basic Modal"
                                        isModalOpen={setIsModalOpen}
                                        onOk={handleOk}
                                        open={isModalOpen}
                                        onCancel={handleCancel}
                                    >

                                        <form>
                                            <div class="grid gap-6 mb-6 md:grid-cols-2">
                                                <div>
                                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot Nomi:</label>
                                                    <input onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot nomini kiriting..." required />
                                                </div>
                                                <div>
                                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot miqdori:</label>
                                                    <input onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })} type="number" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot miqdorini kiriting..." required />
                                                </div>
                                                <div>
                                                    <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot narxi:</label>
                                                    <input onChange={(e) => setInputValue({ ...inputValue, price: e.target.value })} type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot narxini kiriting..." required />
                                                </div>
                                                <div>
                                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot soni(mavjudligi)</label>
                                                    <input onChange={(e) => setInputValue({ ...inputValue, amount: e.target.value })} type="number" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot sonini kiriting..." pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />

                                                </div>
                                                <div>
                                                    <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot o'lchami:</label>
                                                    <input onChange={(e) => setInputValue({ ...inputValue, amount_measure: e.target.value })} type="url" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot o'lchamini kiriting..." required />
                                                </div>
                                                <div>
                                                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot haqida:</label>
                                                    <input onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })} type="text" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot haqidagi ma'lumot..." required />
                                                </div>
                                                <div>
                                                    <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot haqida:</label>
                                                    <select onChange={(e) => setInputValue({ ...inputValue, category: e.target.value })} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                                                        {state?.map((value) => {
                                                            return (<option >{value?.category}</option>)
                                                        })}
                                                    </select>
                                                </div>
                                                <div>
                                                    <ImageUpload
                                                        title={'Image'}
                                                        iconTitle={'Upload Image'}
                                                        fileType={'PNG, JPG, JPEG up to 5MB'}
                                                        LabelFor={'image'}
                                                        setInputValue={setInputValue}
                                                        inputValue={inputValue}
                                                    />

                                                </div>
                                            </div>


                                        </form>
                                    </Modal>
                                </div>
                            )}
                        </div>
                        <div class="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                            <div class="w-full md:w-1/2">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">
                                        Search
                                    </label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                fill="currentColor"
                                                viewbox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                />
                                            </svg>
                                        </div>
                                        <input onChange={(e) => setSearch(e.target.value)}


                                            type="text"
                                            id="simple-search"
                                            placeholder="Search for products"
                                            required=""
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    onClick={() => setIsModalOpen(!isModalOpen)}
                                    type="button"
                                    id="createProductButton"
                                    data-modal-toggle="createProductModal"
                                    class="flex items-center justify-center  dark:bg-blue-900 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    <svg
                                        class="h-3.5 w-3.5 mr-1.5 -ml-1"
                                        fill="currentColor"
                                        viewbox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            clip-rule="evenodd"
                                            fill-rule="evenodd"
                                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                        />
                                    </svg>
                                    Add product
                                </button>
                                <div class="flex items-center space-x-3 w-full md:w-auto">
                                    <button
                                        id="actionsDropdownButton"
                                        data-dropdown-toggle="actionsDropdown"
                                        class="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        type="button"
                                    >
                                        Actions
                                        <svg
                                            class="-mr-1 ml-1.5 w-5 h-5"
                                            fill="currentColor"
                                            viewbox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            />
                                        </svg>
                                    </button>
                                    <div
                                        id="actionsDropdown"
                                        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                    >
                                        <ul
                                            class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="actionsDropdownButton"
                                        >
                                            <li>
                                                <a
                                                    href="#"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Mass Edit
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="py-1">
                                            <a
                                                href="#"
                                                class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                Delete all
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="overflow-x-auto h-[80vh]">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="p-4">
                                            Mahsulot
                                        </th>
                                        <th scope="col" class="">Mahsulot narxi</th>
                                        <th scope="col" class="p-4 ">
                                            Mahsulot turi
                                        </th>
                                        <th scope="col" class="p-4">
                                            Mahsulot o'lchami
                                        </th>
                                        <th scope="col" class=" w-[30px] p-4">
                                            Mahsulot haqida
                                        </th>
                                        <th scope="col" class=" w-[30px] p-4">
                                            Mahsulot qoldig'i
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData?.map((value) => {
                                        return (
                                            <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <th
                                                    scope="row"
                                                    class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    <div class="flex items-center mr-3">
                                                        {/* <div>{value.thumbnail}</div> */}
                                                        <img
                                                            className="w-[75px]"
                                                            src={value?.image}
                                                            alt=""
                                                        />
                                                        <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                            {value.title}
                                                        </span>
                                                    </div>
                                                </th>
                                                <td>
                                                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                        {value.price}
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                        {value.category}
                                                    </span>
                                                </td>

                                                <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex items-center">
                                                        {/* <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
<svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg> */}
                                                        <span class="text-gray-500 flex justify-center items-center dark:text-gray-400 ml-1">
                                                            {value.amount_measure}
                                                        </span>

                                                        
                                                    </div>
                                                  
                                                </td>
                                                <div class="overflow-scroll  h-[100px] w-[200px]">
                                                          <span class="text-gray-500 dark:text-gray-400 ml-1">
                                                            {value.description}
                                                        </span>
                                                    </div>
                                                    <div>
                                                    <span class="text-gray-500 dark:text-gray-400 ml-1">
                                                            {value.amount}
                                                        </span>
                                                    </div>
                                                <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div class="flex items-center space-x-4">
                                                       
                                                        <button
                                                        
                                                            type="button"
                                                            data-drawer-target="drawer-update-product"
                                                            data-drawer-show="drawer-update-product"
                                                            aria-controls="drawer-update-product"
                                                            class="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4 mr-2 -ml-0.5"
                                                                viewbox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                            <EditCrud object={value}/>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            data-drawer-target="drawer-read-product-advanced"
                                                            data-drawer-show="drawer-read-product-advanced"
                                                            aria-controls="drawer-read-product-advanced"
                                                            class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewbox="0 0 24 24"
                                                                fill="currentColor"
                                                                class="w-4 h-4 mr-2 -ml-0.5"
                                                            >
                                                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                                                />
                                                            </svg>
                                                            Preview
                                                        </button>
                                                        <button
                                                           onClick={() => Delete(value.id)}
                                                            type="button"
                                                            data-modal-target="delete-modal"
                                                            data-modal-toggle="delete-modal"
                                                            class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="h-4 w-4 mr-2 -ml-0.5"
                                                                viewbox="0 0 20 20"
                                                                fill="currentColor"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clip-rule="evenodd"
                                                                />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <div
                id="delete-modal"
                tabindex="-1"
                class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div class="relative w-full h-auto max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            data-modal-toggle="delete-modal"
                        >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-6 text-center">
                            <svg
                                aria-hidden="true"
                                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                                fill="none"
                                stroke="currentColor"
                                viewbox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this product?
                            </h3>
                            <button
                                data-modal-toggle="delete-modal"
                                type="button"
                                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                data-modal-toggle="delete-modal"
                                type="button"
                                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsCom;
