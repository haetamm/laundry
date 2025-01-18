import React from "react";
import { Helmet } from "react-helmet-async";
import { dataServices } from "../utils/dataServices";

import "../styles/component/services.scss";

const Services = () => {
  const services = dataServices;
  return (
    <>
      <Helmet>
        <title>Service</title>
        <meta name="description" content="Service Page" />
      </Helmet>
      <div className="mt-[70px] mx-auto items-center px-2 text-blue-400 flex-grow ">
        <div className="pt-0 mt-4 px-0">
          <div className="flex justify-center items-center mt-14">
            <div className="text-4xl border-none xs:border-b-4 xs:border-double">
              Services
            </div>
          </div>
          <div className=" w-full flex justify-center px-0 md:px-3 ">
            <div className="container">
              {services.map((service, index) => (
                <div key={index} className="card">
                  <div className="face face1">
                    <div className="content">
                      <span className="stars"></span>
                      <h2 className="content_body text-3xl font-bold">
                        {service.title}
                      </h2>
                      <p className="content_body">{service.value}</p>
                    </div>
                  </div>
                  <div className="face face2">
                    <h5 className="hidden xs:inline-block">{service.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
