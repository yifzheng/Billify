import { create } from "zustand";

const useCaptchaStore = create( ( set ) => ( {
    isVerified: false,
    setIsVerified: ( isVerified ) => set( { isVerified } )
} ) )

export default useCaptchaStore