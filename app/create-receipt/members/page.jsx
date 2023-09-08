'use client'

import Members from "@components/Members";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
    const { data: session } = useSession()
    const router = useRouter()

    if ( !session ) {
        router.push( "/" )
        return false
    }
    return <Members />;
};

export default page;
