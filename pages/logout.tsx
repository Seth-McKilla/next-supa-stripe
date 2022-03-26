import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

export default function Logout() {
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await supabase.auth.signOut();
        return push("/");
      } catch (error: any) {
        console.error(error);
      }
    })();
  }, [push]);

  return <div>Logging out...</div>;
}
