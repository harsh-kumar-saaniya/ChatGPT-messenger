'use client';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession, signOut } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import NewChat from './NewChat'

const SideBar = () => {
    const { data: session } = useSession()

    // ***************************************
    // NEED TO WORK HERE

    const [chats, loading, error] = useCollection(
        session && collection(db, "users", session.user?.email!, "chats"),
    );

    // const [chats, loading, error] = useCollection(
    //     session && query(collection(db, "users", session.user?.email!, "chats"),
    //         orderBy("createdAt", 'asc'))
    // );

    // ENDS
    // ***************************************

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className='flex-1'>
                
                {/* newchat  */}
                <NewChat />
                
                <div className='hidden sm:inline'>
                    <ModelSelection />
                </div>

                <div className='flex flex-col space-y-2 my-2'>
                    {/* Maps through the chats rows */}
                    {loading && (
                        <div className='animate-pulse text-center text-white'>
                            <p>Loading Chats...</p>
                        </div>
                    )}

                    {chats?.docs.map(chat => (
                        <ChatRow key={chat.id} id={chat.id} />
                    ))}
                </div>


            </div>
            {session && (
                <img
                    onClick={() => signOut()}
                    src={session.user?.image!}
                    alt='Profile picture'
                    className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
                />
            )}
        </div>
    )
}

export default SideBar