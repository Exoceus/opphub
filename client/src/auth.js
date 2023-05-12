import React, { useEffect, useState } from "react";
import firebase_app from "./firebase";
import axios from "axios";
import Loading from "./components/loading.component";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("loading");
  const [platformUser, setPlatformUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase_app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      console.log(currentUser);

      axios
        .get("/api/user/UID/" + currentUser.uid)
        .then((response) => {
          setPlatformUser(response.data);
          setLoading(false);

          if (response.data == null) {
            setPlatformUser({ type: "Ambassador" });
          }
        })

        .catch((error) => {
          console.log(error);
          setPlatformUser(null);
          setLoading(false);
        });
    } else if (currentUser != "loading") {
      setPlatformUser(null);
      setLoading(false);
    }
  }, [currentUser]);

  var loading_screen = <Loading />;

  return (
    <AuthContext.Provider value={{ currentUser, platformUser }}>
      {!loading && children}
      {loading && loading_screen}
    </AuthContext.Provider>
  );
};
