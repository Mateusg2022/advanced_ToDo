// import { Meteor } from "meteor/meteor";
// import React, { useState } from "react";

// import Alert from "@mui/material/Alert";

// export const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const submit = (e) => {
//     e.preventDefault();

//     Meteor.loginWithPassword(username, password, (error) => {
//       if (error) {
//         if (error instanceof Meteor.Error) {
//           console.error("Erro ao fazer login:", error.reason);
//         } else {
//           console.error("Erro ao fazer login:", error.message);
//         }
//       } else {
//         console.log("Login bem-sucedido!");
//         setLoginSuccess(true);
//         setTimeout(() => {
//           window.location.replace("/TasksPage");
//         }, 2000);
//       }
//     });
//   };

//   return (
//     <div>
//       {loginSuccess && <Alert severity="success">Login bem-sucedido!</Alert>}
//       <form onSubmit={submit} className="login-form">
//         <div>
//           <label htmlFor="username">Username</label>

//           <input
//             type="text"
//             placeholder="Username"
//             name="username"
//             required
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div>
//           <label htmlFor="password">Password</label>

//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div>
//           <button type="submit">Log In</button>
//         </div>
//       </form>
//     </div>
//   );
// };
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        if (error instanceof Meteor.Error) {
          console.error("Erro ao fazer login:", error.reason);
        } else {
          console.error("Erro ao fazer login:", error.message);
        }
      } else {
        console.log("Login bem-sucedido!");
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/tasks");
        }, 1000);
      }
    });
  };

  const handleSubscribe = () => {
    setTimeout(() => {
      navigate("/signup");
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 300, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="User"
              type="text"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign In
            </Button>
            <div>
              <Typography variant="body2">
                Don't have an account?
                <Button variant="text" onClick={handleSubscribe}>
                  Sign up
                </Button>
              </Typography>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
