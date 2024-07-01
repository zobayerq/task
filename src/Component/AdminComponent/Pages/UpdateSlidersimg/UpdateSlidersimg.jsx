import { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import axios from "axios";

const UpdateSlidersimg = () => {
    const { id } = useParams();
    const AxiosCommon = useAxiosCommon();
    const [showNameu, setShowNameu] = useState(null);
    const [showImagePreview, setShowImagePreview] = useState(null);
    const fileInputRef = useRef();
    const navigate = useNavigate();

    // Function to handle clearing file input
    const handleClearFile = () => {
        setShowNameu(null);
        setShowImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // UseEffect to handle cleanup when component unmounts
    useEffect(() => {
        return () => {
            handleClearFile(); // Ensure file input is cleared when component unmounts
        };
    }, []);

    const { data = {}, isLoading, refetch } = useQuery({
        queryKey: ['slidersimgSingledata'],
        queryFn: async () => {
            const { data } = await AxiosCommon(`/slidersimg/singledata/${id}`);
            return data;
        },
    });

    const onSubmit = async () => {
        if (showNameu) {
            const formData = new FormData();
            formData.append('image', showNameu);

            try {
                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    formData
                );
                console.log('ImgBB Response:', imgbbResponse.data);

                const imageUrl = imgbbResponse.data.data.display_url;
                console.log('Image URL:', imageUrl);

                try {
                    const response = await AxiosCommon.put(`/updateimg/slider/${data._id}`, { image: imageUrl });
                    console.log('Update Image Response:', response.data);

                    if (response.status === 200) {
                        refetch();
                        toast.success('Image updated successfully');
                        handleClearFile();
                        navigate('/dashboard/Slidersimg');
                    } else {
                        toast.error('Error updating image');
                    }
                } catch (error) {
                    console.error('Update Image Error:', error);
                    toast.error('Error updating image');
                }
            } catch (error) {
                console.error('ImgBB Upload Error:', error);
                toast.error('Error uploading image');
            }
        } else {
            toast.error('Please upload an image');
        }
    };
    return (
        <div>
            <Link className="text-7xl hover:text-green-700" to={'/dashboard/Slidersimg'}>
                <MdOutlineKeyboardBackspace />
            </Link>
            <div className="my-10">
                {showNameu ? (
                    <div className="mx-auto flex max-w-[600px] items-center gap-x-6 rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
                        <img className="w-full max-w-[150px] rounded-lg object-cover" src={showImagePreview} alt={showNameu.name} />
                        <div className="flex-1 space-y-1.5 overflow-hidden">
                            <h5 className="text-xl font-medium tracking-tight truncate">{showNameu.name}</h5>
                            <p className="text-gray-500">{(showNameu.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <div onClick={handleClearFile}>
                            <svg width={30} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303Z" fill="#000000"></path>
                            </svg>
                        </div>
                    </div>
                ) : (
                    <label className="mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white" htmlFor="file5">
                        <svg width={50} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 42 32" enableBackground="new 0 0 42 32" xmlSpace="preserve" fill="#000000">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g>
                                    <path fill="black" d="M33.958,12.988C33.531,6.376,28.933,0,20.5,0C12.787,0,6.839,5.733,6.524,13.384 C2.304,14.697,0,19.213,0,22.5C0,27.561,4.206,32,9,32h6.5c0.276,0,0.5-0.224,0.5-0.5V20.5c0-0.276,0.224-0.5,0.5-0.5h8 c0.276,0,0.5,0.224,0.5,0.5v11c0,0.276,0.224,0.5,0.5,0.5H33c4.794,0,9-4.439,9-9C42,17.623,38.729,13.601,33.958,12.988z M20.979,4.154c0.205-0.205,0.537-0.205,0.742,0l5.124,5.125c0.205,0.205,0.205,0.537,0,0.742c-0.205,0.205-0.537,0.205-0.742,0 L21.5,5.996V17.5c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5V5.996l-4.603,4.025c-0.205,0.205-0.537,0.205-0.742,0 c-0.205-0.205-0.205-0.537,0-0.742L20.979,4.154z"></path>
                                </g>
                            </g>
                        </svg>
                        <h4 className="text-xl font-semibold">Drop your files here or Browse</h4>
                        <input
                            onChange={e => {
                                setShowNameu(e.target.files[0]);
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                    setShowImagePreview(event.target.result);
                                };
                                reader.readAsDataURL(e.target.files[0]);
                            }}
                            ref={fileInputRef}
                            type="file"
                            id="file5"
                            className="hidden"
                        />
                    </label>
                )}
            </div>
            <div className="text-center">
                <button onClick={onSubmit} className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UpdateSlidersimg;
