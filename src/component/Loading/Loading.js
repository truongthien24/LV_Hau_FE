import { LoadingContext } from "fuse/LoadingProvider";
import React, { useContext } from "react";

export const Loading = () => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <>
      {isLoading && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-[#ffffffd9] z-[1299] flex items-center justify-center">
          <div className="boxes">
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="box">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
