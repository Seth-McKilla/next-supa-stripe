import { useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function Login() {
  useEffect(() => {
    (async () => {
      try {
        return await supabase.auth.signIn({
          provider: "github",
        });
      } catch (error: any) {
        console.error(error);
      }
    })();
  }, []);

  return <div>Logging in...</div>;
}
