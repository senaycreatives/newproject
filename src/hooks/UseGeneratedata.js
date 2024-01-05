import {
    useQuery,
 
  } from '@tanstack/react-query'
import axios from "axios";




export default function UseGeneratedata(id) {

  

    const fetchData = async (id) => {
      console.log(id)
        const res = await axios.get(`https://gentle-puce-angler.cyclic.app/getsingledata/${id}`);
       
        return res;
      };
    
  return useQuery({
    queryKey: ['generate Data',id],
    queryFn: ()=>fetchData(id),
    enabled:!!id
  } );
}