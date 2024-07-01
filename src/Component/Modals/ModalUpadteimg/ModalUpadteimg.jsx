import axios from "axios";
import { useRef, useState } from "react";
import { toast } from 'react-toastify';
import useAxiosCommon from "../../hooks/useAxiosCommon";


export const ModalUpdateImg = ({ openModalu, setOpenModalu, refetch, data }) => {
    const AxiosCommon = useAxiosCommon();
    const [showNameu, setShowNameu] = useState({});
    const [showImagePreview, setShowImagePreview] = useState({});
    const fileInputRef = useRef();
    const handleClearFile = () => {
      setShowNameu('');
      setShowImagePreview('');
      fileInputRef.current.value = '';
    };
    const onSubmit = async (event) => {
        event.preventDefault();

        if (showNameu.name) {
            console.log(setShowNameu);
            const formData = new FormData();
            formData.append('image', showNameu.image); // Corrected to showNameu.image
            

            try {
                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    formData
                );
                console.log('ImgBB Response:', imgbbResponse.data);
            
                const imageUrl = imgbbResponse.data.data.display_url;
                console.log('Image URL:', imageUrl);
            
                try {
                    const response = await AxiosCommon.put(`/updateimg/${data._id}`, { image: imageUrl });
                    console.log('Update Image Response:', response.data);
            
                    if (response.status === 200) {
                        refetch();
                        setOpenModalu(false);
                        toast.success('Image updated successfully');
                        handleClearFile();
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
        <div className="mx-auto flex w-72 items-center justify-center">
            <div onClick={() => setOpenModalu(false)} className={`fixed z-[100] flex items-center justify-center ${openModalu ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 h-full w-full bg-black/20 backdrop-blur-sm duration-100`}>
                <div onClick={(e) => e.stopPropagation()} className={`absolute w-full rounded-lg bg-white dark:bg-gray-900 drop-shadow-2xl sm:w-[500px] ${openModalu ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-150'}`}>
                    <svg onClick={() => setOpenModalu(false)} className="mx-auto mr-0 w-10 cursor-pointer fill-black dark:fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                        </g>
                    </svg>
                    <div className="  my-10 ">
      {showNameu?.name ? (
        <div className=" mx-auto flex max-w-[600px] items-center gap-x-6  rounded-lg border-2 border-dashed border-gray-400 p-5 bg-white">
          <img className="w-full max-w-[150px] rounded-lg object-cover" src={showImagePreview} alt={showNameu?.name} />
          <div className="flex-1 space-y-1.5 overflow-hidden">
            <h5 className="text-xl font-medium tracking-tight truncate">{showNameu?.name}</h5>
            <p className="text-gray-500">{(showNameu.size / 1024).toFixed(1)} KB</p>
          </div>
          <div onClick={handleClearFile}>
            <svg width={30} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="#000000"></path></g>
            </svg>
          </div>
        </div>
      ) : (
        <label className=" mx-auto flex max-w-[600px] flex-col items-center justify-center space-y-3 rounded-lg border-2 border-dashed border-gray-400 p-6 bg-white" htmlFor="file5">
          <svg width={50} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 42 32" enableBackground="new 0 0 42 32" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g> <path fill="black" d="M33.958,12.988C33.531,6.376,28.933,0,20.5,0C12.787,0,6.839,5.733,6.524,13.384 C2.304,14.697,0,19.213,0,22.5C0,27.561,4.206,32,9,32h6.5c0.276,0,0.5-0.224,0.5-0.5S15.776,31,15.5,31H9c-4.262,0-8-3.972-8-8.5 C1,19.449,3.674,14,9,14h1.5c0.276,0,0.5-0.224,0.5-0.5S10.776,13,10.5,13H9c-0.509,0-0.99,0.057-1.459,0.139 C7.933,7.149,12.486,1,20.5,1C29.088,1,33,7.739,33,14v1.5c0,0.276,0.224,0.5,0.5,0.5s0.5-0.224,0.5-0.5V14 c0-0.003,0-0.006,0-0.009c3.019,0.331,7,3.571,7,8.509c0,3.826-3.691,8.5-8,8.5h-7.5c-3.238,0-4.5-1.262-4.5-4.5V12.783l4.078,4.07 C25.176,16.951,25.304,17,25.432,17s0.256-0.049,0.354-0.146c0.195-0.195,0.195-0.513,0-0.707l-4.461-4.452 c-0.594-0.592-1.055-0.592-1.648,0l-4.461,4.452c-0.195,0.194-0.195,0.512,0,0.707s0.512,0.195,0.707,0L20,12.783V26.5 c0,3.804,1.696,5.5,5.5,5.5H33c4.847,0,9-5.224,9-9.5C42,17.333,37.777,13.292,33.958,12.988z" ></path>  </g></g></svg>
          <div className="space-y-1.5 text-center">
            <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">Upload your file</h5>
            <p className="text-sm text-gray-500">File Should be in PNG, JPEG or JPG formate</p>
          </div>
        </label>
      )}

      <input ref={fileInputRef} onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0];
            setShowNameu(imageFile);
            setShowImagePreview(URL.createObjectURL(imageFile));
          }
        }} className="hidden" id="file5" type="file"/>
    </div>
                </div>
               
            </div>
           
        </div>
    );
};
