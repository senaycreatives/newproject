import {
    useQuery,
 
  } from '@tanstack/react-query'
import axios from "axios";

import {useAuthHeader} from 'react-auth-kit'


export default function UseFetchindividualData(id) {

  const authHeader = useAuthHeader()

    const fetchData = async (id) => {
      console.log(id)
        const res = await axios.get(`https://gentle-puce-angler.cyclic.app/getsingledata/${id}`, {
          headers: { Authorization: authHeader() },
        });
       
        return res;
      };
    
  return useQuery({
    queryKey: ['singleTableData',id],
    queryFn: ()=>fetchData(id),
    enabled:!!id
  } );
}