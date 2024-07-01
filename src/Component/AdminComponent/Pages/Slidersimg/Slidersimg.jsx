import { useState } from 'react';
import { Modaladdimg } from '../../../Modals/Modaladdimg/Modaladdimg';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import { ModalUpdateImg } from '../../../Modals/ModalUpadteimg/ModalUpadteimg';
import { Link } from 'react-router-dom';

const Slidersimg = () => {
    const [openModalu, setOpenModalu, ] = useState(false);
    const [dd, setdd, ] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const AxiosCommon = useAxiosCommon();
  
    const { data: images = [], isLoading, refetch } = useQuery({
      queryKey: ['slidersimg'],
      queryFn: async () => {
        const { data } = await AxiosCommon(`/slidersimg`);
        return data;
      },
    });

    // Handle user deletion
    const handleDelete = () => {
        AxiosCommon.delete(`/slidersimg/${itemToDelete}`)
            .then((res) => {
                refetch();
                toast.success("Sliders image deleted successfully!", { position: "top-center" });
                closeModal();
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to delete sliders image", { position: "top-center" });
            });
    };



       // Open modal for update
       const openModalAndUpdate = (data) => {
        setdd(data); // Setting the data before opening the modal
        setOpenModalu(true); // Opening the modal
    };
  
    // Open modal for delete confirmation
    const openModall = (id) => {
        setItemToDelete(id);
        document.getElementById('delete_modal').showModal();
    };

    // Close modal
    const closeModal = () => {
        setItemToDelete(null);
        document.getElementById('delete_modal').close();
    };

    console.log(images);

    return (
        <div>
            {images.map((data, idx) => (
                <div key={idx} className="flex gap-7 mt-6">
                    <div className="text-2xl font-bold flex justify-center items-center">{idx + 1}</div>
                    <div>
                        <img src={data.image} alt="" className="h-24 w-48 rounded-xl object-cover" />
                    </div>
                    <div className="flex gap-5 items-center">
                       <Link to={`slidersimg/singledata/update/${data._id}`}> <button
                       
                       className="flex h-12 w-12 justify-center items-center bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white"
                   >
                       <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="h-6 w-6"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                           strokeWidth="2"
                       >
                           <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                           />
                       </svg>
                   </button></Link>
                        <button
                            className="flex h-12 w-12 justify-center items-center bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-700 transition-all duration-300 text-white"
                            onClick={() => openModall(data._id)}
                        >
                            <img
                                className="h-7 w-7"
                                src="https://i.ibb.co/mt2k0Sr/delete.png"
                                alt=""
                            />
                        </button>
                    </div>
                    
                </div>

                
            ))}

            {/* add new slidersimg */}
            <div className="mt-5">
                <button onClick={() => setOpenModal(true)} className="rounded-md bg-custom-bg py-2 px-5 text-white">
                    Add New slide
                </button>
            </div>

            <Modaladdimg openModal={openModal} setOpenModal={setOpenModal} refetch={refetch} />
            <ModalUpdateImg openModalu={openModalu} setOpenModalu={setOpenModalu} refetch={refetch} data={dd} ></ModalUpdateImg>

            <dialog id="delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Confirmation</h3>
                    <p className="py-4">Are you sure you want to delete this sliders image?</p>
                    <div className="modal-action">
                        <button className="btn btn-success" onClick={handleDelete}>
                            Yes
                        </button>
                        <button className="btn btn-error" onClick={closeModal}>
                            No
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Slidersimg;
