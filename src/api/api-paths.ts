// src/api/apiPaths.ts

const BASE_URL = "https://swapi.dev/api";

export const apiPaths = {
  people: (page?: number) =>
    `${BASE_URL}/people/${page ? `?page=${page}` : ""}`,
  personById: (id: number) => `${BASE_URL}/people/${id}/`,

  planets: (page?: number) =>
    `${BASE_URL}/planets/${page ? `?page=${page}` : ""}`,
  planetById: (id: number) => `${BASE_URL}/planets/${id}/`,

  starships: (page?: number) =>
    `${BASE_URL}/starships/${page ? `?page=${page}` : ""}`,
  starshipById: (id: number) => `${BASE_URL}/starships/${id}/`,
};
