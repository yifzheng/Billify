import create from 'zustand';

const useReceiptStore = create( ( set ) => ( {
    members: [ { name: '' } ],
    resturantName: "",
    items: [ {
        name: '', price: 0, quantity: 1, owners: []
    } ],
    tax: undefined,
    tip: undefined,
    total: undefined,
    setMembers: ( members ) => set( { members } ),
    setResturantName: ( resturantName ) => set( { resturantName } ),
    setItems: ( items ) => set( { items } ),
    setTax: ( tax ) => setTax( { tax } ),
    setTip: ( tip ) => set( { tip } ),
    setTotal: ( total ) => set( { total } )
} ) );

export default useReceiptStore;