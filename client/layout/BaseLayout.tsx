import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Nav from "../components/navigtion/Index";
import { checkCookie } from "../utils/reducers/auth/auth";
function BaseLayout({ children }: any) {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(checkCookie());
  }, []);
  return (
    <div className="base">
      <Nav />
      <div className="wrapper">
        <div className="continer">{children}</div>
      </div>
    </div>
  );
}

export default BaseLayout;
