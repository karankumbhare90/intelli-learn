"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Provider({ children }) {

    const { user } = useUser();

    const [userDetail, setUserDetail] = useState();


    useEffect(() => {
        user && CreateNewUser();
    }, [user])


    async function CreateNewUser() {
        const result = await axios.post(`/api/user`, {
            name: user?.fullName,
            email: user?.emailAddresses[0]?.emailAddress,
            profileImage: user?.hasImage ? user.imageUrl : null
        })
        console.log(result.data);
        setUserDetail(result.data.data);
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            {children}
        </UserDetailContext.Provider>
    )
}
