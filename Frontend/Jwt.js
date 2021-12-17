import * as React from "react";

const authContext = React.createContext(undefined);

function useJwt() {
  const [jwt, setJwt] = React.useState(null)

  return {
    jwt,
    login(token) {
      return new Promise((res) => {
        setJwt(token)
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setJwt(null)
        res();
      });
    }
  };
}

export function JwtProvider({ children }) {
  const jwt = useJwt();

  return (
      <authContext.Provider value={jwt}>
        {children}
      </authContext.Provider>
  );
}

export default function JwtConsumer() {
  return React.useContext(authContext);
}
