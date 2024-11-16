import { actGetGategories } from "@store/Category/categorySlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"

const useGetCategories = (refreshCategory?:boolean) => {
    const dispatch =useAppDispatch()
    const {records:allCategories,loading,error}= useAppSelector(state=>state.categories)

    useEffect(()=> {
        const promise = dispatch(actGetGategories())
        
        return ()=> {
            promise.abort()
        }
    },[dispatch,refreshCategory])

    return {allCategories,loading,error}
}


export default useGetCategories