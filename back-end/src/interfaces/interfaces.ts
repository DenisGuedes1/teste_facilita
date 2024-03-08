import { QueryResult } from "pg";

interface IcreateClients {
  name: string ;
  email: string;
  telefone: string | undefined;
  coordenada_x: number; 
  coordenada_y: number;
  
}
type TClientCoordinates = {
  id:number;
  coordenada_x: number; 
  coordenada_y: number;
  name:string;
};

interface IcreateClientsID extends IcreateClients {
  id: number;
}
type TClientsResult = QueryResult<IcreateClients>;
export { IcreateClients, IcreateClientsID,TClientsResult,TClientCoordinates};