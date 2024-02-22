import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Modal, Table, TableBody} from 'flowbite-react';
import {Link} from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
export default function DashUsers() {
  const {currentUser} = useSelector(state => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState('');
  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/user/get-users`);

      const data = await res.json();
      console.log('data', data);
      if (res.ok) {
        setUserPost(data.users);
        if (data.users?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPost.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`,
      );
      const data = await res.json();

      if (res.ok) {
        setUserPost(prev => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/delete-post/${postId}/${currentUser._id}`,
        {
          method: 'DELETE',
        },
      );

      const data = res.json();

      if (!res.ok) {
        console.log(data?.message);
      } else {
        setUserPost(prev => prev.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div
      className="
    table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.isAdmin && userPost?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {userPost?.map(post => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.profilePicture}
                        // alt={post.title}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">
                    <Link to={`/post/${post.slug}`}>{post.username}</Link>
                  </Table.Cell>
                  <Table.Cell>{post.email}</Table.Cell>
                  <Table.Cell>
              {post?.isAdmin ? <FaCheck /> : <FaTimes />}
              </Table.Cell>
                  <Table.Cell className=" font-medium text-red-500 hover:underline">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostId(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
