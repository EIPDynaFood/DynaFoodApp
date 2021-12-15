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
  const auth = useJwt();

  return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
  );
}

export default function JwtConsumer() {
  return React.useContext(authContext);
}
