import { DataProvider } from 'react-admin';

const dataProviderRouter = (dataProvider1: DataProvider, dataProvider2: DataProvider): DataProvider => ({
  getList: (resource, params) => {
    if (resource === "posts" || resource === "comments") {
      return dataProvider1.getList(resource, params);
    } else {
      return dataProvider2.getList(resource, params);
    }
  },
  getOne: (resource, params) => {
    if (resource === "posts" || resource === "comments") {
      return dataProvider1.getOne(resource, params);
    } else {
      return dataProvider2.getOne(resource, params);
    }
  },
  // Implementa el resto de los métodos (create, update, delete, etc.) de forma similar
  // Asegúrate de implementar todos los métodos requeridos por tu aplicación
});

export default dataProviderRouter;
