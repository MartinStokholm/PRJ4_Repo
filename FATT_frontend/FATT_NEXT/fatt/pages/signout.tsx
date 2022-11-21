import { useRouter } from "next/router";

// const push = () => {

//   return Promise.resolve(router.push("/login"));
// };

export default function signout() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  //   push();
  if (process.browser) {
    router.push("/");
  }
  return (
    <>
      Sign out<h1></h1>
    </>
  );
}
