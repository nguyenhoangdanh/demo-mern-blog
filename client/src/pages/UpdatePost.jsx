import React, { useEffect, useState } from 'react'
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDispatch, useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdatePost = () => {
  const navigate = useNavigate();
  const {postId} = useParams();
  const [file, setFile] = useState(null);
  const { currentUser} = useSelector((state)=> state.user)
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        return
      }

      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0))
        },
        (error) => {
          setImageFileUploadError('Image upload failed');
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setImageFileUploadError(null);
            setFormData({ ...formData, image: downloadURL })
          })
        }
      )

    } catch (error) {
      setImageFileUploadError('Image upload failed');
      setImageFileUploadProgress(null);
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/update-post/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
 const fetchData = async() => {
    const res = await fetch(`/api/post/getposts?postId=${postId}`); 
    const data = await res.json();
    if(!res.ok){
        console.log(data.message);
        return
    }else{
        setPublishError(null)
        setFormData(data.posts[0])
    }


 }

  useEffect(() => {
    try {
        fetchData();
    } catch (error) {
     console.log(error)   
    }
  },[postId])

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type='text'
            value={formData?.title}
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          <Select value={formData?.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">ReactJs</option>
            <option value="nextjs">NextIs</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm' outline
            onClick={handleUploadImage}
            disabled={imageFileUploadProgress}>
            {imageFileUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        {formData.image && (
          <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />
        )}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          value={formData?.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }} />
        <Button
          type='submit'
          gradientDuoTone='purpleToPink'>
          Update
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  )
}
