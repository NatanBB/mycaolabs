import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';

import './styles.css';
import { api } from '../../services/api';

export default function Animal() {
  const [title, setTitle] = useState<any>();
  const [description, setDescription] = useState<any>();
  const [value, setValue] = useState<any>();
  const [category, setCategory] = useState<any>();
  const [data, setData] = useState<[]>([]);

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData = {
      id: id,
      name: title,
      breed: description,
      sex: value,
      weight: category.label,
      height: category.label,
      age: category.label // change future
    }
    api.post('animal', preparedData)
  }

  const handleData = async () => {
    const { data } = await api.get('category');
    setData(data);
  }

  useEffect(() => {
    handleData();
  }, [])

  const options: any = [];
  // data.forEach(category => {
  //   options.push({
  //     value: category.id, 
  //     label: category.name
  //   })
  // })

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/desenho-de-gato-e-cachorro_24640-47224.jpg?w=740&t=st=1671021557~exp=1671022157~hmac=8e7a8dd8c20a3798d0a9d15e731ebc6502f71735746371d31ca915ab3f48b1f9"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar novo animal</h1>
          <p>Preencha todas as informações para cadastrar um novo animal!</p>

          <Link className="back-link" to="/admin">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>

        </section>
        <form onSubmit={e => e}>
          <input
            placeholder="Nome do Animal"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={30}
          />
          <input
            placeholder="Raça"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <ul>
            <li>
              <input
                placeholder="Idade"
                value={value}
                onChange={e => setValue(e.target.value)}
                maxLength={2}
              />
            </li>
            <li>
              <input
                placeholder="Sexo"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </li>
          </ul>
          <ul>
            <li>
              <input
                placeholder="Peso"
                value={value}
                onChange={e => setValue(e.target.value)}
                maxLength={10}
              />
            </li>
            <li>
              <input
                placeholder="Altura"
                value={value}
                onChange={e => setValue(e.target.value)}
                maxLength={10}
              />
            </li>
          </ul>

          {/* <div style={{paddingTop: "8px"}}>
            <Select options={options} onChange={e => setCategory(e)} placeholder={"Categoria"} isClearable={true}/>
          </div> */}

          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}