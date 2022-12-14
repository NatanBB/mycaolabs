import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import { useState } from 'react';
import { api } from '../../services/api';
import { useEffect } from 'react';
// import { toastr } from 'react-redux-toastr'

export default function Admin() {

  //#region data
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const { data } = await api.get('books');
    setData(data);
  }

  //#endregion

  //#region navigation
  const history = useNavigate();

  const handleLogout = () => {
    history("/")
  }
  //#endregion

  //#region funcitions
  const handleDelete = async (id: number) => {
    await api.delete(`books/${id}`)
    handleData();
  }

  const handleChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSearchValue(value);
  }

  // const filter = !!searchValue ?
  //   data.filter(book => {
  //     return book.category.toLowerCase().includes(
  //       searchValue.toLowerCase()
  //     );
  //   })
  //   : data;
  //#endregion

  return (
    <div className="profile-container">
      <header>
        <img src={"https://i.imgur.com/0lIghGx.png"} alt="livrary" className="icon" />
        <span>Bem vindo, Admin!</span>

        <Link className="button" to="/animal" style={{ marginLeft: "80px" }}>Cadastrar Animal</Link>
        <Link className="button" to="/food" style={{ marginLeft: "10px" }}>Cadastrar Refeição</Link>
        <Link className="button" to="/exame" style={{ marginLeft: "10px" }}>Cadastrar Exame</Link>
        <button onClick={handleLogout} type="button" id='cartButton' className='cartButton'>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Animais Cadastrados</h1>

      <div className="search-container">
        <input
          className="text-input"
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder="Buscar"
        />
      </div>

      <ul>
        {/* {filter.length > 0 && (
          filter.map(book => (
            <li key={book}>
              <strong>LIVRO:</strong>
              <p>{book}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{book}</p>

              <strong>CATEGORIA:</strong>
              <p>{book.category}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(book.price)}</p>

              <button onClick={e => handleDelete(book.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))
        )} */}
      </ul>
    </div>
  );
}