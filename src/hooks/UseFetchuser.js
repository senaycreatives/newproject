import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useAuthHeader } from "react-auth-kit";

// /fetchUsers
export default function UseFetchuser() {
  const authHeader = useAuthHeader();

  const fetchuser = async () => {
    const res = await axios.get(
      "https://server.industrialclearance.co.uk/fetchUsers",
      {
        headers: { Authorization: authHeader() },
      }
    );

    return res;
  };

  return useQuery({
    queryKey: ["userdata"],
    queryFn: fetchuser,
  });
}
