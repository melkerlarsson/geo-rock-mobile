import axios, { AxiosResponse } from "axios";
import { Rock } from '../types/Rock';

const URL = "http://192.168.1.112:5000/rocks";


export const fetchRocks = async (): Promise<Rock[] | null> => {
  try {
    const response: AxiosResponse<Rock[]> = await axios.get(URL);
    const rocks = response.data;

    return rocks;
  } catch (error) {
    console.error(error);
    return null;
  }

}