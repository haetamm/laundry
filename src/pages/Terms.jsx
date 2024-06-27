import React from 'react';
import { dataTerms } from '../utils/dataTerms';
import { Helmet } from 'react-helmet-async';

import '../styles/component/terms.scss'

const Terms = () => {
  const terms = dataTerms
  return (
    <>
      <Helmet>
        <title>Terms And Condition</title>
        <meta name="description" content=" Terms and condition" />
      </Helmet>
      <div className="mt-[70px] mx-auto items-center px-2 text-blue-400 flex-grow">
        <div className="pt-0 mt-4 px-2">
          <div className=" w-full md:max-w-3xl flex justify-center px-0 xs:px-3">
            <div className="paper pb-8 w-full px-3">
              <div className="flex justify-center items-center mt-14">
                <div className="text-4xl border-none xs:border-b-4 xs:border-double">Terms And Conditions</div>
              </div>
              <table className="w-full font-normal lg:text-lg mt-3">
                <tbody>
                  {terms.map((term, index) => (
                    <tr key={index} className="py-4 border-b">
                      <td className="pr-1 py-2 align-top">{index + 1}.</td>
                      <td className=" py-2 text-justify">{term.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
