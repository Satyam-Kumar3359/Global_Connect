import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
const AddModal = (props) => {

    const [imageUrl, setImageUrl] = useState(null)
    const [desc, setDesc] = useState("");

    // cloudname = mashhuudanny
    // presetName = linkedInClone

    const handlePost = async () => {
        if (desc.trim().length === 0 & !imageUrl) return toast.error("Please enter any field");

        await axios.post('http://localhost:4000/api/post',{desc:desc,imageLink:imageUrl},{withCredentials:true}).then((res=>{
            window.location.reload();
        })).catch(err => {
            console.log(err)

        })

    }

    const handleUploadImage = async(e)=>{
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        
        data.append('upload_preset', 'linkedInClone');
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/mashhuudanny/image/upload", data)

            const imageUrl = response.data.url;
            setImageUrl(imageUrl)
        } catch (err) {
            console.log(err)
        }
    } 
    return (
        <div className=''>
            <div className="flex gap-4 items-center">
  <div className="relative">
    <img className='w-15 h-15 rounded-full' alt="Img" src="http://res.cloudinary.com/dbraoytbj/image/upload/v1747213557/xwyq1qwjsythq3dmroo.png" />
  </div>
  <div className="text-2xl">DUSHYANT KUMAR</div>
</div>

<div>
  <textarea cols={50} rows={5} placeholder="What do you want to talk about?" className="my-3 outline-0 text-xl p-2"></textarea>
</div>

<div>
  <img className="w-20 h-20 rounded-xl" src="https://www.goodfreephotos.com/albums/bolivia/other-bolivia/mountains-and-lake-landscape-scenic.jpg" />
</div>

            <div className='flex justify-between items-center'>
                <div className="my-6">
                    <label className="cursor-pointer" htmlFor="inputFile"><ImageIcon /></label>
                    <input onChange={handleUploadImage} type="file" className="hidden" id="inputFile" />
                </div>
                <div className="bg-blue-950 text-white py-1 px-3 cursor-pointer rounded-2xl h-fit" onClick={handlePost}> Post</div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddModal