import {
    useQuery,
 
  } from '@tanstack/react-query'
import axios from "axios";




export default function UseFetchData() {

  

    const fetchData = async () => {
        const res = await axios.get('http://localhost:9000/getdata');
       
        return res;
      };
    
  return useQuery({
    queryKey: ['TableData'],
    queryFn: fetchData,
  } );
}