import React, { createContext, useState, useContext, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const SnackbarContext = createContext();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarProvider = ({ children }) => {
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (snackbarQueue.length > 0 && !snackbarOpen) {
      setSnackbarMessage(snackbarQueue[0]);
      setSnackbarOpen(true);
    }
  }, [snackbarQueue, snackbarOpen]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarQueue((prevQueue) => prevQueue.slice(1));
  };

  const addSnackbarMessage = (message) => {
    setSnackbarQueue((prevQueue) => [...prevQueue, message]);
  };

  return (
    <SnackbarContext.Provider value={{ addSnackbarMessage }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
