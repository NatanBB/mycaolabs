import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import { useState } from 'react';
import { api } from '../../services/api';
import { useEffect } from 'react';
import { AnimalModel, SelectOptions } from '../../globalType';
// import { toastr } from 'react-redux-toastr'

export default function Admin() {

  //#region data
  const [data, setData] = useState<AnimalModel[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const { data } = await api.get('animal');
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
  const handleEdit = (id: number) => {
    history(`/animal/editanimal/${id}`)
  }

  const handleDelete = async (id: number) => {
    await api.delete(`animal/${id}`)
    handleData();
  }

  const handleChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSearchValue(value);
  }

  const filter = !!searchValue ?
    data.filter(animal => {
      return animal.name.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : data;
  //#endregion

  return (
    <div className="profile-container">
      <header>
        <img src={"https://i.imgur.com/0lIghGx.png"} alt="livrary" className="icon" />
        <span>Bem vindo, Admin!</span>

        <Link className="button" to="/animal" style={{ marginLeft: "80px" }}>Cadastrar Animal</Link>
        <Link className="button" to="/food" style={{ marginLeft: "10px" }}>Cadastrar Refeição</Link>
        <Link className="button" to="/exam" style={{ marginLeft: "10px" }}>Cadastrar Exame</Link>
        <Link className="button" to="/vet" style={{ marginLeft: "10px" }}>Cadastrar Vet</Link>
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
        {filter.length > 0 && (
          filter.map(animal => {
            return (
              <li key={animal.id}>
                <strong>Informações:</strong>
                <p>{animal.name + ", " + animal.age + " anos, " + animal.sex}</p>
                <br />
                <p>{animal.weight + "cm, " + animal.height + "kg"}</p>
                <br />
                <p>Nº de Identificação: <b>{animal.id}</b></p>

                <strong>Raça:</strong>
                <p>{animal.breed}</p>

                {
                  animal.exam != "" && <>
                    <strong>Informações de Exames:</strong>
                    <p>Exames: + </p>
                  </>
                }
                 {
                  animal.food != "" && <>
                    <strong>Informações de Refeições:</strong>
                    <p>Refeições: + </p>
                  </>
                }

                <button onClick={e => handleEdit(animal.id)} className="editButton">
                  <FiEdit size={20} color="#a8a8b3" />
                </button>
                <button onClick={e => handleDelete(animal.id)}>
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            )
          }
          ))
        }
      </ul>
    </div>
  );
}