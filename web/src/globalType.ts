export type SelectOptions = {
  value: number;
  label: string;
}

export type AnimalModel = {
  id: number;
  name: string,
  breed: string,
  sex: string,
  weight: string | number,
  height: string | number,
  age: string | number,
  food?: string | number | any,
  exam?: string | number | any,
  vaccine?: string | number | any
}

export type UserProps = {
  id: number;
  username: string;
}

export type FoodProps = {
  id: number;
  name: string;
  content: string;
  type: string;
}

export type ExamProps = {
  id: number;
  name: string;
  content: string;
  type: string;
}

export type VaccineProps = {
  id: number;
  name: string;
}

export type VetProps = {
  id: number;
  name: string;
  cpf: string | number;
  crmvNumber: number;
  address: string;
  email: string;
  telephone: number;
}

export type UserModelProps = {
  id: number;
  name: string;
  cpf: string | number;
  address: string;
  email: string;
  telephone: number;
}

export type UploadProps = {
  id: number;
  idAnimal: number;
  animal: string;
  locale: string;
  img: any;
}