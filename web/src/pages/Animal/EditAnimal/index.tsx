import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';

import './styles.css';
import { api } from '../../../services/api';
import { breedOptions } from '../../../utils/options'
import { sexOptions } from '../../../utils/options'
import { AnimalModel, ExamProps, FoodProps, SelectOptions } from '../../../globalType';

export default function EditAnimal() {
  const [name, setName] = useState<any>();
  const [breed, setBreed] = useState<any>();
  const [age, setAge] = useState<any>();
  const [sex, setSex] = useState<any>();
  const [weight, setWeight] = useState<any>();
  const [height, setHeight] = useState<any>();
  const [food, setFood] = useState<any>();
  const [exam, setExam] = useState<any>();
  const [examOptions, setExamOptions] = useState<SelectOptions[]>([]);
  const [foodOptions, setFoodOptions] = useState<SelectOptions[]>([]);

  const { idAnimal } = useParams();

  //region fetch data
  useEffect(() => {
    handleData();
    handleExamData();
    handleFoodData();
  }, [])

  const handleData = async () => {
    const { data } = await api.get(`animal/${idAnimal}`);
    setName(data.name);
    setBreed(data.breed);
    setAge(data.age);
    setSex(data.sex);
    setWeight(data.weight);
    setHeight(data.height);
    setExam(data.exam);
    setFood(data.food)
  }

  const handleExamData = async () => {
    const { data = [] } = await api.get(`exam`);
    const options = data.map((exam: ExamProps) => {
      return {
        value: exam.id,
        label: exam.name,
      };
    })
    setExamOptions(options);
  }

  const handleFoodData = async () => {
    const { data = []} = await api.get(`food`);
    const options = data.map((food: FoodProps) => {
      return {
        value: food.id,
        label: food.name,
      };
    })
    setFoodOptions(options);
  }

  //#endregion

  const handleSubmit = async () => {
    const preparedData: AnimalModel = {
      id: parseInt(idAnimal as string),
      name: name,
      breed: breed.label == undefined ? breed : breed.label,
      sex: sex.label == undefined ? sex : sex.label,
      weight: weight,
      height: height,
      age: age,
      exam: exam,
      food: food
    }
    api.put(`animal/${idAnimal}`, preparedData)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/desenho-de-gato-e-cachorro_24640-47224.jpg?w=740&t=st=1671021557~exp=1671022157~hmac=8e7a8dd8c20a3798d0a9d15e731ebc6502f71735746371d31ca915ab3f48b1f9"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Atualizar animal</h1>
          <p>Altere as informações e mantenha todas as informações do animal atualizadas!</p>

          <Link className="back-link" to="/admin">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>

        </section>
        <form onSubmit={e => e}>
          <ul>
            <li>
              <p>Nome do Animal</p>
              <input
                placeholder="Nome do Animal"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={30}
              />
            </li>
            <li>
              <p>Idade</p>
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
              <p>Peso</p>
              <input
                placeholder="Peso"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                maxLength={10}
              />
            </li>
            <li>
              <p>Altura</p>
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
              <p>Raça</p>
              <Select
                options={breedOptions}
                value={breedOptions.find(b => b.label == breed)}
                onChange={e => setBreed(e)}
                placeholder={"Raça"}
                isClearable
                isSearchable
                className="selectOptions"
              />
            </li>
            <li>
              <p>Sexo</p>
              <Select
                options={sexOptions}
                value={sexOptions.find(s => s.label == sex)}
                onChange={e => setSex(e)}
                placeholder={"Sexo"}
                isClearable
                isSearchable
                className="selectOptions"
              />
            </li>
          </ul>
          <ul>
            <li>
              <p>Refeições</p>
              <Select
                options={foodOptions}
                value={food}
                onChange={e => setFood(e)}
                placeholder={"Refeições"}
                isClearable
                isSearchable
                className="selectOptions"
                isMulti
              />
            </li>
            <li>
              <p>Exames</p>
              <Select
                options={examOptions}
                value={exam}
                onChange={e => setExam(e)}
                placeholder={"Exames"}
                isMulti
                isClearable
                isSearchable
                className="selectOptions"
              />
            </li>
          </ul>
          <button className="button" onClick={handleSubmit}>Atualizar</button>
        </form>
      </div>
    </div>
  )
}