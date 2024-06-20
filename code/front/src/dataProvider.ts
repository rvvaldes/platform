// dataProvider.ts
import jsonServerProvider from "ra-data-json-server";
import fakeRestProvider from "ra-data-fakerest";
import dataGeneratorRetail from "data-generator-retail";
import { fetchUtils, DataProvider } from "react-admin";

// Genera la URL de tu servidor de pacientes
const patientApiUrl = "http://localhost:8787/api";

// Define un fetch personalizado para pacientes
const myHttpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("token");
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const jsonDataProvider: DataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL
);
const retailDataProvider: DataProvider = fakeRestProvider(
  dataGeneratorRetail(),
  true
);
const patientDataProvider: DataProvider = jsonServerProvider(
  patientApiUrl,
  myHttpClient
);

const chooseDataProvider = (resource: string): DataProvider => {
  const resourceType = resource.split("/")[0]; // Esto debería dar "contactNotes" para "contactNotes/1"
  switch (resourceType) {
    case "products":
      return retailDataProvider;
    case "patients": // Utiliza el proveedor de pacientes personalizado
      return patientDataProvider;
    case "contactNotes": // Utiliza el proveedor de pacientes personalizado
      return patientDataProvider;
    default:
      return jsonDataProvider;
  }
};

export const dataProvider: DataProvider = {
  create: (resource, params) =>
    chooseDataProvider(resource).create(resource, params),
  getList: (resource, params) =>
    chooseDataProvider(resource).getList(resource, params),
  getOne: (resource, params) =>
    chooseDataProvider(resource).getOne(resource, params),
  getMany: (resource, params) =>
    chooseDataProvider(resource).getMany(resource, params),
  getManyReference: (resource, params) =>
    chooseDataProvider(resource).getManyReference(resource, params),
  update: (resource, params) =>
    chooseDataProvider(resource).update(resource, params),
  updateMany: (resource, params) =>
    chooseDataProvider(resource).updateMany(resource, params),
  delete: (resource, params) =>
    chooseDataProvider(resource).delete(resource, params),
  deleteMany: (resource, params) =>
    chooseDataProvider(resource).deleteMany(resource, params),
};
