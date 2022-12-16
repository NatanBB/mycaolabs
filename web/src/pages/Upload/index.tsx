import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import { api } from '../../services/api';
import { AnimalModel, UploadProps } from '../../globalType';
import Select from 'react-select';
import Dropzone from '../../components/Dropzone';

export default function Upload() {
  const [animal, setAnimal] = useState<any>();
  const [img, setImg] = useState<any>();
  const [listAnimal, setListAnimal] = useState<any>();

  const id = Math.floor(Math.random() * 65536);

  useEffect(() => {
    handleAnimalData();
  }, [])

  const handleAnimalData = async () => {
    const { data = [] } = await api.get(`animal`);
    const options = data.map((animal: AnimalModel) => {
      return {
        value: animal.id,
        label: animal.name,
      };
    })
    setListAnimal(options);
  }

  const handleSubmit = async () => {
    const preparedData: UploadProps = {
      id: id,
      animal: animal?.label,
      idAnimal: animal?.value,
      img: img,
    }
    api.post('upload', preparedData)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/pessoas-desenhadas-a-mao-tirando-fotos-com-o-telefone_23-2149021061.jpg?w=826&t=st=1671148575~exp=1671149175~hmac=d74910db0005819f947cd2096a5620564f2c5141be89a31e9ed5e5e38bf8704b"} alt="library" onClick={e => e} className={"registerIconUpload"} />

          <h1>Enviei uma foto do animalzinho!</h1>
          <p>Selecione o animal que deseja publicar a foto e vizualise no feed de imagens!</p>

          <Link className="back-link" to="/home">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>

        </section>
        <form onSubmit={e => e}>
          <Select
            options={listAnimal}
            onChange={e => setAnimal(e)}
            placeholder={"Animal"}
            isClearable
            isSearchable
            className="selectOptions"
            required
          />

          <Dropzone onFileUploaded={setImg} />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}