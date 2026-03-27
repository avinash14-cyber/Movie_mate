import { commonAPI } from "./commonAPI"
import { serverURL } from "./serverURL"




// add movies api
export const addMovieAPI=async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/media`,reqBody)
}


// get all movies api
export const getAllMoviesAPI=async(type)=>{
    return await commonAPI("GET",`${serverURL}/media?type=${type}`,"")
}

// update status api


export const updateStatusAPI=async({id,status})=>{
    return await commonAPI("PUT",`${serverURL}/media/${id}/progress`,{status})
}


// update rating api
export const updateRatingAPI=async({id,rating})=>{
    return await commonAPI("PUT",`${serverURL}/media/${id}/rating`,{rating})
}

// delete movie api
export const deleteMovieAPI=async(id)=>{
    return await commonAPI("DELETE",`${serverURL}/media/${id}`,"")
}