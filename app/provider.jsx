"use client";

import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Provider({ children }) {

    const { user } = useUser();

    const [userDetail, setUserDetail] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0)


    useEffect(() => {
        user && CreateNewUser();
    }, [user])


    async function CreateNewUser() {
        const result = await axios.post(`/api/user`, {
            name: user?.fullName,
            email: user?.emailAddresses[0]?.emailAddress,
            profileImage: user?.hasImage ? user.imageUrl : null
        })
        setUserDetail(result.data.data);
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
                {children}
            </SelectedChapterIndexContext.Provider>
        </UserDetailContext.Provider>
    )
}
