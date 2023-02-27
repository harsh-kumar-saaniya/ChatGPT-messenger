'use client';
import { collection } from 'firebase/firestore';
import { useSession, signOut } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
import NewChat from './NewChat'

const SideBar = () => {
    const { data: session } = useSession()
    const [chats, loading, error] = useCollection(
        session && collection(db, 'users', session.user?.email!, 'chats')
    );

    console.log(chats)

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className='flex-1'>
                {/* newchat  */}
                <NewChat />
                <div>
                    {/* Model selection */}
                </div>
                {/* Maps through the chats rows */}
                {chats?.docs.map(chat => (
                    <ChatRow key={chat.id} id={chat.id} />
                ))}
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