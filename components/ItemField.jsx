import React from "react";

const ItemField = ({ item, index }) => {
    return (
        <label>
            <span className="font-satoshi font-semibold text-lg text-gray-700 ">
                Item <i>#{index}</i>
            </span>
            <section className="item-field flex-col ">
                <section className="flex-start gap-2">
                    <label className="w-full">
                        <span className="font-satoshi font-medium text-sm text-gray-700">
                            Name
                        </span>
                        <input
                            type="text"
                            placeholder="Omurice"
                            name="description"
                            value={item.description}
                            onChange={() => {}}
                            className="form_input"
                        />
                    </label>
                    <label className="w-1/4">
                        <span className="font-satoshi font-medium text-sm text-gray-700">
                            Quantity
                        </span>
                        <input
                            type="number"
                            placeholder="2"
                            name="quantity"
                            className="form_input"
                            value={item.quantity}
                            onChange={() => {}}
                        />
                    </label>
                    <label className="w-1/4">
                        <span className="font-satoshi font-medium text-sm text-gray-700">
                            Price
                        </span>
                        <input
                            type="number"
                            placeholder="$12"
                            name="price"
                            className="form_input"
                            value={item.price}
                            onChange={() => {}}
                        />
                    </label>
                </section>
                <section>
                    <label className="w-full">
                        <span className="font-satoshi font-medium text-sm text-gray-700">
                            Owners
                        </span>
                        <input
                            type="text"
                            placeholder="John Doe, Jane Doe, ..."
                            name="owners"
                            value={""}
                            className="form_input"
                            onChange={() => {}}
                        />
                    </label>
                </section>
            </section>
        </label>
    );
};

export default ItemField;
