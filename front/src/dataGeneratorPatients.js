// dataGeneratorPatients.js
import faker from "faker";

const generatePatients = () => {
  const data = { patients: [] };
  for (let i = 1; i <= 100; i++) {
    data.patients.push({
      id: i,
      identifier: faker.datatype.uuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      telecom: faker.phone.phoneNumber(),
      gender: faker.random.arrayElement(["male", "female", "other"]),
      birthDate: faker.date.past(50).toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
      address: faker.address.streetAddress(),
      maritalStatus: faker.random.arrayElement([
        "single",
        "married",
        "divorced",
        "widowed",
      ]),
      contact: `${faker.name.firstName()} ${faker.name.lastName()}`,
      communication: faker.random.arrayElement([
        "English",
        "Spanish",
        "French",
      ]),
      generalPractitioner: `${faker.name.firstName()} ${faker.name.lastName()}`,
      managingOrganization: faker.company.companyName(),
    });
  }
  return data;
};

export default generatePatients;
