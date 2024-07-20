import { Button, Modal } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { MdOutlineInsertPhoto } from 'react-icons/md'
import ImageUpload       from '../imgUpload'

const EditCrud = ({ object }) => {
    const [dataCat, setDataCat] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(object, 'object');

    const [inputValue, setInputValue] = useState(object)
    let token = localStorage.getItem("token");

    const showModal = () => {
        setIsModalOpen(true);

        axios('https://omofood.pythonanywhere.com/api/v1/categories/').then((res) => setDataCat(res?.data))
    };
    const handleOk = () => {
        const formData = new FormData();
        formData.append('title', inputValue.title);
        formData.append('image', inputValue.img);
        formData.append('description', inputValue.description);
        formData.append('price', inputValue.price);
        formData.append('amount', inputValue.amount);
        formData.append('amount_measure', inputValue.amount_measure);
        formData.append('category', inputValue?.category);

        axios.put(  `https://omofood.pythonanywhere.com/api/v1/products/${object.id}/`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    toast.success('mahsulod uzgartirildi')
                    window.location.reload()
                }
            })
            .catch(error => {
                console.error(error);
            });

        setIsModalOpen(false);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (

        <div>
            <Button type="red" onClick={showModal}>
                Edit
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
                            <input value={inputValue.title} onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot nomini kiriting..." required />
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot miqdori:</label>
                            <input value={inputValue.description} onChange={(e) => setInputValue({ ...inputValue, description: e.target.value })} type="number" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot miqdorini kiriting..." required />
                        </div>
                        <div>
                            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot narxi:</label>
                            <input value={inputValue.price} onChange={(e) => setInputValue({ ...inputValue, price: e.target.value })} type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot narxini kiriting..." required />
                        </div>
                        <div>
                            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot soni(mavjudligi)</label>
                            <input value={inputValue.amount} onChange={(e) => setInputValue({ ...inputValue, amount: e.target.value })} type="number" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot sonini kiriting..." pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                        </div>
                        <div>
                            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot o'lchami:</label>
                            <input value={inputValue.amount_measure} onChange={(e) => setInputValue({ ...inputValue, amount_measure: e.target.value })} type="url" id="website" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahsulot o'lchamini kiriting..." required />
                        </div>
<div>
                            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mahsulot haqida:</label>
                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setInputValue({ ...inputValue, category: e.target.value })}>
                                {dataCat.map((value) => {
                                    return (<option value={value.id}>{value?.title}</option>)
                                })}
                            </select>
                        </div>
                        <div>

                            <ImageUpload
                                title={'Image'}
                                iconName={<MdOutlineInsertPhoto className="text-5xl" />}
                                iconTitle={'Upload Image'}
                                fileType={'PNG, JPG, JPEG up to 5MB'}
                                LabelFor={'img'}
                                setInputValue={setInputValue}
                                inputValue={inputValue}
                            />

                        </div>
                    </div>


                </form>

            </Modal>
        </div>
    )
}

export default EditCrud