"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MemberField from "./MemberField";
import useReceiptStore from "@context/receiptStore";

const Members = () => {
    const { members, setMembers } = useReceiptStore() // state storing all the members entered by the user
    const router = useRouter()

    // handle member data changing
    const handleMemberChange = ( e, member, index ) => {
        const name = e.target.value
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

    return (
        <section className="flex-start flex-col gap-4 w-full max-w-full">
            <h1 className="head_text green_gradient">Step 1: Members</h1>
            <span className="desc2 mb-10">
                Who participated in the payment for the receipt? This individual placed an order during the outing.
            </span>
            <div className="glassmorphism sm:w-1/2 w-full">
                { members.map( ( member, index ) => (
                    <MemberField
                        key={ index }
                        member={ member }
                        index={ index }
                        handleEnterKey={ handleEnterKey }
                        handleRemoveMember={ handleRemoveMember }
                        onChange={ handleMemberChange }
                    />
                ) ) }
            </div>

            <button className="black_btn mt-10" onClick={ handleContinue }>Continue</button>
        </section>
    );
};

export default Members;
