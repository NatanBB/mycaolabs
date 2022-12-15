import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';

import './styles.css';
import { api } from '../../services/api';
import { breedOptions } from '../../utils/options'
import { sexOptions } from '../../utils/options'
import { AnimalModel, UserProps } from '../../globalType';


export default function Animal() {
  const [name, setName] = useState<any>();
  const [breed, setBreed] = useState<any>();
  const [age, setAge] = useState<any>();
  const [sex, setSex] = useState<any>();
  const [weight, setWeight] = useState<any>();
  const [height, setHeight] = useState<any>();

  const [user, setUser] = useState<UserProps[]>([]);

  const log: string[] = [];
  user.forEach(item => {
    log.push(item.username)
  })

  const handleUserData = async () => {
    const { data: newData } = await api.get('userLog');
    setUser(newData);
  }

  useEffect(() => {
    handleUserData()
  }, [])


  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData: AnimalModel = {
      id: id,
      name: name,
      breed: breed.label,
      sex: sex.label,
      weight: weight,
      height: height,
      age: age,
      exam: "",
      food: "",
      vaccine: ""

    }
    api.post('animal', preparedData)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/desenho-de-gato-e-cachorro_24640-47224.jpg?w=740&t=st=1671021557~exp=1671022157~hmac=8e7a8dd8c20a3798d0a9d15e731ebc6502f71735746371d31ca915ab3f48b1f9"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar novo animal</h1>
          <p>Preencha todas as informações para cadastrar um novo animal!</p>

          {log[0] === 'admin' ? <div>
            <Link className="back-link" to="/admin">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar
            </Link>
          </div> : <div>
            <Link className="back-link" to="/vethome">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar
            </Link>
          </div>}

        </section>
        <form onSubmit={e => e}>
          <ul>
            <li>
              <input
                placeholder="Nome do Animal"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={30}
              />
            </li>
            <li>
              <input
                placeholder="Idade"
                value={age}
                onChange={e => setAge(e.target.value)}
                maxLength={2}
              />
            </li>

          </ul>
          <ul>
            <li>
              <input
                placeholder="Peso"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                maxLength={10}
              />
            </li>
            <li>
              <input
                placeholder="Altura"
                value={height}
                onChange={e => setHeight(e.target.value)}
                maxLength={10}
              />
            </li>
          </ul>
          <ul>
            <li>
              <Select
                options={breedOptions}
                onChange={e => setBreed(e)}
                placeholder={"Raça"}
                isClearable
                isSearchable
                className="selectOptions"
              />
            </li>
            <li>
              <Select
                options={sexOptions}
                onChange={e => setSex(e)}
                placeholder={"Sexo"}
                isClearable
                isSearchable
                className="selectOptions"
              />
            </li>
          </ul>
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}