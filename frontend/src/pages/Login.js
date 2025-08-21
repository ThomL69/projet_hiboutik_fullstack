import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) throw new Error("Incorrect login");

      const data = await response.json();
      // Stock token
      localStorage.setItem("token", data.access_token);

      // Redirection to searching customers
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="formlogin">
      <h4>Connexion, please write your id ...</h4>
      <form onSubmit={handleLogin}>
        <input className="MyLoginN"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className="MyLoginP"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="MyBtnLog" type="submit">Connect</button>
        {/* <button className="MyBtnDis" type="submit">Disconnect</button> */}
      </form>
      {error && <p className="messerror">{error}</p>}
    </div>
  );
};

export default Login;