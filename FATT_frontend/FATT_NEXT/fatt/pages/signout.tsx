import { useRouter } from "next/router";

export default function signout() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }

  if (process.browser) {
    router.push("/login");
  }
  return (
    <>
      Sign out<h1></h1>
    </>
  );
}
