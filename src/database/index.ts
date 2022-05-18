import { createConnection } from "typeorm";

console.log("Conectando com o banco");

try {
  createConnection()
    .then(() => {
      console.log("Conectado com sucesso");
    })
    .catch((err) => {
      console.log("Erro ao conectar com o banco", err);
    });
} catch (err) {
  console.log("Erro ao conectar com o banco", err);
}
