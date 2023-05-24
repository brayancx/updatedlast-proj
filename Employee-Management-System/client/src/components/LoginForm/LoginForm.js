import { useState } from "react";
import {axiosPost} from "../../axiosServices";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  //   handleChange = (evt) => {
  //     this.setState({
  //       [evt.target.name]: evt.target.value,
  //       error: "",
  //     });
  //   };

  const handleChange = (evt) => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await axiosPost("/users",credentials);
      setUser(user);
    } catch (err) {
      setError("Log in failed - Try Again");
    }
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error.error}</p>
    </div>
  );
}