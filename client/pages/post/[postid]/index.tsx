import { useRouter } from "next/router";
import React from "react";

function Index() {
  const router = useRouter();
  const a = router.query;
  console.log(a);
  return <div>Index</div>;
}

export default Index;
