import React, { ReactNode, createContext, useState } from "react";

const LoadingContext = createContext(null);

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const setIsLoadingWrapper = (value) => {
    if (isLoading && value === false) {
      setIsLoading(value);
    } else {
      setIsLoading(value);
    }
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading: setIsLoadingWrapper }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingProvider };
