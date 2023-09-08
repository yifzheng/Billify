"use client";

import { useState } from "react";

const MemberField = ({ member, index, handleEnterKey, handleRemoveMember }) => {
    const [name, setName] = useState(member.name);
    return (
        <section className="">
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Name?"
                onKeyDown={handleEnterKey}
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={1}
                autoFocus
                required
            />
            <button onClick={() => handleRemoveMember(member)}>Remove</button>
        </section>
    );
};

export default MemberField;
