import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.email]: e.target.email,
      [e.target.password1]: e.target.password,
    }));
  };
  return (
    <>
      <section>
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please Login to create goals lol</p>
      </section>

      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Sign In</button>
          </div>
        </form>
      </section>
    </>
  );
}
