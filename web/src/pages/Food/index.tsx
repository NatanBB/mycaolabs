import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';

import './styles.css';
import { api } from '../../services/api';
import { typeFood } from '../../utils/options'
import { FoodProps } from '../../globalType';

export default function Food() {
  const [name, setName] = useState<any>();
  const [type, setType] = useState<any>();
  const [content, setContent] = useState<any>();

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData: FoodProps = {
      id: id,
      name: name,
      content: content,
      type: type.label
    }
    api.post('food', preparedData)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-premium/icone-de-frango-frito-comida-saborosa-de-carne-grelhada_81894-8897.jpg?w=740"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar nova refeição</h1>
          <p>Preencha todas as informações para cadastrar uma nova refeição!</p>

          <Link className="back-link" to="/admin">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>

        </section>
        <form onSubmit={e => e}>
          <input
            placeholder="Nome da refeição"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={30}
          />
          <textarea
            placeholder="Conteúdo da refeição"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <Select
            options={typeFood}
            onChange={e => setType(e)}
            placeholder={"Tipo"}
            isClearable
            isSearchable
            className="selectOptions"
          />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}