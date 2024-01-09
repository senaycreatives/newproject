import {
    useQuery,
 
  } from '@tanstack/react-query'
import axios from "axios";

import {useAuthHeader} from 'react-auth-kit'

// /fetchUsers
export default function Usergetsignleuser(id) {

  const authHeader = useAuthHeader()

    const fetchData = async (id) => {
      console.log(id)
        const res = await axios.get(`https://dark-gold-sea-urchin-slip.cyclic.app/getuser/${id}`, {
          headers: { Authorization: authHeader() },
        });
       
        return res;
      };
    
  return useQuery({
    queryKey: ['singleuser',id],
    queryFn: ()=>fetchData(id),
    enabled:!!id
  } );
}