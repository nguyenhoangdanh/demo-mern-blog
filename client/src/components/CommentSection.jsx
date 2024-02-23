import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { set } from 'mongoose';
export const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                    <p>Sign in as :</p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser?.profilePicture
                    } />
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-500'>
                        @{currentUser?.email}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    You must be signed in to comment.
                    <Link to={'/sign-in'} className='text-blue-500 hover:underline '>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment ...'
                        rows={3}
                        maxLength={200}
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-xs'>
                            {!comment ? 200 : 200 - comment?.length} characters remaining
                        </p>
                        <Button
                            outline
                            gradientDuoTone='purpleToBlue'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>

                </form>
            )}
        </div>
    )
}