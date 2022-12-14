import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFileText, FiPower } from 'react-icons/fi';
import { api } from '../../services/api';
import { AnimalModel, UserProps } from '../../globalType';
import './styles.css'

export default function Home() {

  //#region data
  const [data, setData] = useState<AnimalModel[]>([]);
  const [user, setUser] = useState<UserProps[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const log: string[] = [];
  user.forEach(item => {
    log.push(item.username)
  })

  useEffect(() => {
    handleData();
  }, [])

  const handleData = async () => {
    const { data } = await api.get('animal');
    const { data: newData } = await api.get('userLog');
    setData(data);
    setUser(newData);
  }

  //#endregion

  //#region navigation
  const history = useNavigate();

  const adminPage = () => {
    history("/admin")
  }
  //#endregion

  //#region funcitions

  const handleLogout = () => {
    history("/")
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
        <span>Bem vindo!</span>

        <Link className="" to=""></Link>
        {log[0] === 'admin' ? <div>
          <button onClick={adminPage} type="button">
            <FiFileText size={18} color="black" />
          </button>
        </div> : <div></div>}
        <button onClick={handleLogout} type="button">
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
          filter.map(animal => (
            <li key={animal.id}>
              <strong>Informações:</strong>
              <p>{animal.name + ", " + animal.age + " anos, " + animal.sex}</p>
              <br />
              <p>{animal.weight + "cm, " + animal.height + "kg"}</p>
              <br />
              <p>Nº de Identificação: <b>{animal.id}</b></p>

              <strong>Raça:</strong>
              <p>{animal.breed}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}