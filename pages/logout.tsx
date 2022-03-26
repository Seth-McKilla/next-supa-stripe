import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabase";

export default function Logout() {
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      await supabase.auth.signOut();
      return push("/");
    })();
  }, [push]);

  return <div>Logging out...</div>;
}
