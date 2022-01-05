import axios, { AxiosResponse } from "axios";
import { Rock } from '../types/Rock';

const URL = "http://localhost:5000/rocks";


export const fetchRocks = async (): Promise<Rock[] | null> => {
  try {
    const response: AxiosResponse<Rock[]> = await axios.get(URL);
    const rocks = response.data;

    return rocks;
  } catch (error) {
    return null;
  }

}