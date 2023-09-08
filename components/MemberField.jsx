"use client";

import { useState } from "react";
import X from "../public/icons/x.png"
import Image from "next/image";

const MemberField = ( { member, index, handleEnterKey, handleRemoveMember, onChange } ) => {

    return (
        <section className="flex justify-between gap-4 w-full">
            <div className="relative w-full">
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="form_input_member pr-28 text-ellipsis overflow-hidden"
                    placeholder="Name?"
                    onKeyDown={ (e) => handleEnterKey( e, member ) }
                    value={ member.name }
                    onChange={ ( e ) => onChange( e, member, index ) }
                    minLength={ 1 }
                    autoFocus
                    required
                />
                <Image
                    src={ X }
                    width={ 20 }
                    height={ 20 }
                    alt="remove"
                    className="items-center absolute top-[53%] transform -translate-y-1/2 right-4 cursor-pointer"
                    onClick={ () => handleRemoveMember( member ) }
                />
            </div>
        </section >
    );
};

export default MemberField;
