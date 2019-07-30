
export const makeErrorTooltip = error =>{
  const errorResponse = error.response.data;
  console.log(errorResponse);
  if(errorResponse.message == "The given data was invalid.") {
    console.error(errorResponse.message);
    throw new Error(errorResponse.message);
  } else{
    console.error(errorResponse);
    throw new Error(errorResponse.message);
  }
     
}