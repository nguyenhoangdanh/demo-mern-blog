import { useEffect, useState } from "react"


export const Comment = ({ comment }) => {
    const [user, setUser] = useState(null)
    const getUser = async () => {
        try {
            const res = await fetch(`/api/user/${comment?.userId}`);

            const data = await res.json();

            res.ok
                ? setUser(data)
                : null
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getUser();
    }, [comment])

    console.log('data', comment)
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>

        </div>
    )
}