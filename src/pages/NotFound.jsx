import React from "react";
import { Helmet } from "react-helmet-async";

import "../styles/pages/NotFound.scss";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Not found page 404" />
      </Helmet>
      <div id="not-found" className="bg-white font-gabarito">
        <div>404</div>
        <div className="txt">
          Not Found<span className="blink">_</span>
        </div>
      </div>
    </>
  );
};

export default NotFound;
