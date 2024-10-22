import { apiSlice } from "../ApiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       login:builder.mutation({
        query:({email,password})=>({
            url:'/api/auth/login',
            method:"POST",
            body:{
                email,
                password
            },
            credentials:"include",
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch})
        {
            try{
                const result = await queryFulfilled;
                console.log("reslut", result)
                dispatch(userLoggedIn({
                    accessToken:result.data.accessToken,
                    user:result.data.user
                }))
            }
            catch(error){
                console.log(error)
            }
        }
       }),
       logOut:builder.query({
        query:()=>({
            url:"logout",
            method:"GET",
            credentials:"include"
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch})
        {
            try{
                const result = await queryFulfilled;
                dispatch(userLoggedOut())
            }
            catch(error){
                console.log(error)
            }
        }
       })
    })
})

export const {useLoginMutation,useLogOutQuery} = authApi;
