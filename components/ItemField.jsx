import React from "react";

const ItemField = ( { item, index, handleItemChange } ) => {

    return (
        <label>
            <span className="font-satoshi font-semibold text-lg text-gray-700 ">
                Item <i>#{ index }</i>
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
                            name="name"
                            value={ item.name }
                            onChange={ ( e ) => handleItemChange( e, index - 1, { ...item, name: e.target.value } ) }
                            className="form_input"
                        />
                    </label>
                    <label className="w-1/3">
                        <span className="font-satoshi font-medium text-sm text-gray-700">
                            Quantity
                        </span>
                        <input
                            type="number"
                            placeholder="2"
                            name="quantity"
                            className="form_input"
                            value={ item.quantity }
                            onChange={ ( e ) => handleItemChange( e, index - 1, { ...item, quantity: e.target.value } ) }
                        />
                    </label>
                    <label className="w-1/3">
                        <span className="font-satoshi font-medium text-sm text-gray-700">
                            Price
                        </span>
                        <input
                            type="number"
                            placeholder="$12"
                            name="price"
                            className="form_input"
                            step={ 0.01 }
                            value={ item.price }
                            onChange={ ( e ) => handleItemChange( e, index - 1, { ...item, price: e.target.value } ) }
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
                            value={ "" }
                            className="form_input"
                            onChange={ () => { } }
                        />
                    </label>
                </section>
            </section>
        </label>
    );
};

export default ItemField;
