import { useEffect } from "react";
import { useAudit } from "@poool/react-access";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks";
import Header from "./fragments/Header";

export default () => {
  const { lib: audit, config } = useAudit();
  const { premium } = useAuth();

  useEffect(() => {
    init();
  }, [audit]);

  const init = async () => {
    audit?.config({
      ...config,
      user_is_premium: premium || false,
    });
    await audit?.sendEvent("page-view", "page");
  };

  const onLogin = async () => {
    init();
  };

  return (
    <div className="page home">
      <div className="container">
        <Header onLogin={onLogin} />
        <h1>Home</h1>
        <p>
          This is a normal page, without any paywall, with premium & free posts
        </p>
        <ul>
          <li>
            <Link to="/premium">Premium post</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
