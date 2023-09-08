"use client";

import { useState } from "react";
import MemberField from "./MemberField";

const Members = () => {
    const [members, setMembers] = useState([{ name: "" }]); // state storing all the members entered by the user

    // add a new empty user object to state
    const handleAddNewMember = () => {
        setMembers([...members, { name: "" }]);
    };

    // remove the last member from the array
    const handleRemoveMember = (item) => {
        if (members.length > 1) {
            const updatedMembers = members.filter((i) => i !== item); // shift the array to remove the last item
            setMembers(updatedMembers);
        }
    };

    const handleEnterKey = (e) => {
        if (e.code === "Enter" && members[members.length - 1].name.length > 0) {
            console.log("BIGGER");
            handleAddNewMember();
        }
    };

    return (
        <section className="flex-start flex-col gap-2 w-full max-w-full">
            <h1 className="head_text green_gradient">Members</h1>
            <span className="desc2">
                Who contributed to the receipt? This person ordered something in
                the party.
            </span>
            {members.map((member, index) => (
                <MemberField
                    key={index}
                    member={member}
                    index={index}
                    handleEnterKey={handleEnterKey}
                    handleRemoveMember={handleRemoveMember}
                />
            ))}
        </section>
    );
};

export default Members;
