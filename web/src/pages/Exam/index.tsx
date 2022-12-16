import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';

import './styles.css';
import { api } from '../../services/api';
import { typeExam } from '../../utils/options'
import { ExamProps, UserProps } from '../../globalType';

export default function Exam() {
  const [name, setName] = useState<any>();
  const [type, setType] = useState<any>();
  const [content, setContent] = useState<any>();

  const id = Math.floor(Math.random() * 65536);

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

  const handleSubmit = async () => {
    const preparedData: ExamProps = {
      id: id,
      name: name,
      content: content,
      type: type.label
    }
    api.post('exam', preparedData)
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-premium/personagem-de-desenho-animado-de-cachorro-no-veterinario-com-exame-de-garganta_11460-14159.jpg?w=740"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar novo exame</h1>
          <p>Preencha todas as informações para cadastrar um novo exame!</p>

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
          <input
            placeholder="Exame"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={30}
            required
          />
          <textarea
            placeholder="Descrição do Exame"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
          <Select
            options={typeExam}
            onChange={e => setType(e)}
            placeholder={"Tipo"}
            isClearable
            isSearchable
            className="selectOptions"
            required
          />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}