const searchFilter = (name,searchString) => {
   if(name.toLowerCase().includes(searchString.toLowerCase())){
       return true;
   }

   return false;
}

export { searchFilter }