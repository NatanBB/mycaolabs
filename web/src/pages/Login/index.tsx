import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import './styles.css';

function initialState() {
  return {user: '', password: ''};
}

export default function Login() {
  const [values, setValues] = useState(initialState);
  const history = useNavigate();

  function onChange(event: any) {
  const {value, name} = event.target;

    setValues({
      ...values,
      [name]: value,
    })

  }

  const handleLogin = () => {
    values.user === 'admin' ? history('/admin') : history('home');

    const preparedData = {
      username: values.user,
    }
    api.patch(`userLog/${1}`, preparedData)
  }
  

  return (
    <div className="logon-container">
      <section className="form">
        <img src="https://i.imgur.com/0lIghGx.png" alt="icon" className="iconLogin" />
        <form onSubmit={e => e}>
          <h1>Faça seu login</h1>

          <input
            placeholder="Login"
            id="user"
            type="text"
            name="user"
            onChange={onChange}
            value={values.user}
          />
          <input
            placeholder="Senha"
            id="password"
            type="password"
            name="password"
            onChange={onChange}
            value={values.password}
          />
            <button 
              className="button" 
              type="submit"
              onClick={handleLogin}
            >
              Entrar
            </button>
        </form>
      </section>
      <img src={"https://i.imgur.com/89daQSM.png"} alt="Library" />
    </div>
  )
}