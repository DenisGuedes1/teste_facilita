import express, { Application, json } from "express";
import { startDataBase } from "./dataBase";
import {createClients, deleteClientById, getClientsAll} from "./logic";
import { getCoordinates } from "./algoritmo";

import cors from'cors';



const app: Application = express();
app.use(json());
app.use(cors());
app.get("/clients", getClientsAll);
app.get('/ping', (req, res) => {
  res.send('pong');
});
app.post('/clients/', createClients);
app.get('/clients/coordenates',getCoordinates)
app.delete('/clients/:id', deleteClientById)
app.listen(3000, async () => {
  await startDataBase();
  console.log("app, is running!");
});