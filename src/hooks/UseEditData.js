import {
   useMutation
 
  } from '@tanstack/react-query'
import axios from "axios";




export default function UseEditData(id) {

  

    const fetchData = async (id) => {
      console.log(id)
        const res = await axios.get(`https://dark-gold-sea-urchin-slip.cyclic.app/getsingledata/${id}`);
       
        return res;
      };
    
  return useMutation({
    queryKey: ['singleTableData',id],
    queryFn: ()=>fetchData(id),
    enabled:!!id
  } );
}