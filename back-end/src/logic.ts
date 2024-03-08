import { client } from "./dataBase";
import {Request, Response} from 'express';
import { IcreateClients, TClientsResult } from "./interfaces/interfaces";
import { QueryConfig } from "pg";
const getClientsAll = async (request:Request, response:Response) => {
  const queryString = `
        SELECT
            *
            FROM
              clients;
    `;

  const queryResult = await client.query(queryString);
  return response.status(200).json(queryResult.rows);
};
const createClients = async (
  request: Request,
  response: Response
)=> { 

  
    try {
      const newClients: IcreateClients = request.body;
      const queryString: string = `
      INSERT INTO
        clients(name,email,phone,coordenada_x,coordenada_y)
      VALUES
          ($1, $2, $3, $4, $5)
          RETURNING *;
      `;
      const queryConfig: QueryConfig = {
        text: queryString,
        values: Object.values(newClients),
      };
      const queryResult: TClientsResult = await client.query(queryConfig);
      return response.status(201).json(queryResult.rows[0]);
    } catch (error: any) {
      console.log(error,"erro")
      if (
        error.message.includes("unique_email")
      ) {
        return response.status(409).json({
          message: "email already registered",
        });
      }
      return response.status(500).json({
        message: "Status server error",
      });
    }
};
const deleteClientById = async (request: Request, response: Response) => {
  const { id } = request.params;

 
  if (!id) {
    return response.status(400).json({ error: 'ID inválido' });
  }

  const deleteQueryString = `
    DELETE FROM clients
    WHERE id = $1;
  `;

  try {
  
    await client.query(deleteQueryString, [id]);

    return response.status(200).json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    return response.status(500).json({ error: 'Erro interno ao excluir cliente' });
  }
};




export {getClientsAll,createClients,deleteClientById}