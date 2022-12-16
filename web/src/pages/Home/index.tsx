import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFileText, FiPower, FiUpload } from 'react-icons/fi';
import { api } from '../../services/api';
import { AnimalModel, UserProps } from '../../globalType';
import './styles.css'

import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpg";
import img8 from "../../assets/8.jpg";

export default function Home() {

  //#region data
  const [data, setData] = useState<AnimalModel[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [user, setUser] = useState<UserProps[]>([]);

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

  const uploadImagePage = () => {
    history("/upload")
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
        <div>
          <button onClick={uploadImagePage} type="button">
            <FiUpload size={18} color="black" />
          </button>
        </div>
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
        <li>
          <p>Jorge - Paranaguamirim</p>
          <br />
          <img src={img1} alt="" />
        </li>
        <li>
          <p>Roberto - Costa e Silva</p>
          <br />
          <img src={img2} alt="" />
        </li>
        <li>
          <p>Carlos - São Francisco do Sul</p>
          <br />
          <img src={img3} alt="" />
        </li>
        <li>
          <p>Ronaldo - Mercado Municipal</p>
          <br />
          <img src={img4} alt="" />
        </li>
        <li>
          <p>Pedro - Petropolis</p>
          <br />
          <img src={img5} alt="" />
        </li>
        <li>
          <p>Willian - Balneário Barra do Sul</p>
          <br />
          <img src={img6} alt="" />
        </li>
        <li>
          <p>John - Araquari</p>
          <br />
          <img src={img7} alt="" />
        </li>
        <li>
          <p>Maycão - IFC Araquari</p>
          <br />
          <img src={img8} alt="" />
        </li>
      </ul>
    </div>
  )
}