// ProductList.tsx
import { List, Datagrid, TextField, NumberField, ImageField } from 'react-admin';

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <NumberField source="category_id" />
      <TextField source="reference" />
    </Datagrid>
  </List>
);
