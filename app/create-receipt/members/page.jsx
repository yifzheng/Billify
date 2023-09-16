'use client'

import Members from "@components/Members";
import { useRouter } from "next/navigation";
import useReceiptStore from "@context/receiptStore";
import useCaptchaStore from "@context/captchaStore";
import { useEffect } from "react";

const page = () => {
    const { members, setMembers, reset } = useReceiptStore() // state storing all the members entered by the user
    const router = useRouter()

    const { isVerified } = useCaptchaStore()
    // check if verified move back to home for verification and prevent verifications skipping
    useEffect( () => {
        if ( !isVerified ) {
            router.push( "/" )
        }
    }, [ isVerified ] )

    // handle member data changing
    const handleMemberChange = ( e, member, index ) => {
        const name = e.target.value.trim().toLowerCase()
        const updatedMembers = [ ...members ]
        updatedMembers[ index ] = { ...member, name }
        setMembers( updatedMembers )
    }
    // add a new empty user object to state
    const handleAddNewMember = () => {
        setMembers( [ ...members, { name: "" } ] );
    };

    // remove the last member from the array
    const handleRemoveMember = ( item ) => {
        if ( members.length > 1 ) {
            const updatedMembers = members.filter( ( i ) => i !== item ); // shift the array to remove the last item
            setMembers( updatedMembers );
        }
    };

    /* 
        checks if: 
        1. the key entered is enter
        2. the field isn't empty
    */
    const handleEnterKey = ( e, member ) => {
        if ( e.code === "Enter" || e.code === 'NumpadEnter' ) {
            const lastMember = members[ members.length - 1 ];
            if ( lastMember ) {
                const newName = lastMember.name.trim();
                if ( newName !== "" ) {
                    handleAddNewMember();
                }
            }
        }
        if ( e.code === "Backspace" && members[ members.length - 1 ].name.length === 0 ) {
            handleRemoveMember( member )
        }
    };

    const handleContinue = () => {
        const notEmpty = members.every( ( member ) => member.name.trim().length > 1 )
        if ( notEmpty ) {
            router.push( "/create-receipt/receipt" )
        }
    }

    const handleBack = () => {
        reset()
        router.push( "/" )
    }

    return (
        <Members
            members={ members }
            handleMemberChange={ handleMemberChange }
            handleRemoveMember={ handleRemoveMember }
            handleEnterKey={ handleEnterKey }
            handleContinue={ handleContinue }
            handleBack={ handleBack }
        />
    );
};

export default page;
