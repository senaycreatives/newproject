import {
    useQuery,
 
  } from '@tanstack/react-query'
import axios from "axios";




export default function UseFetchindividualData(id) {

  

    const fetchData = async (id) => {
      console.log(id)
        const res = await axios.get(`http://localhost:9000/getsingledata/${id}`);
       
        return res;
      };
    
  return useQuery({
    queryKey: ['singleTableData',id],
    queryFn: ()=>fetchData(id),
    enabled:!!id
  } );
}