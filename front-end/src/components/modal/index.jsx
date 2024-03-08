import React, { useEffect, useState } from "react";
import "./index.css";

export const ModalRoutes = ({ onClose }) => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
  
        const response = await fetch("http://localhost:3000/clients/coordenates");  
        if (response.ok) {
          const data = await response.json();
          setFormData(data.coordinatesOnRoute);
     
          console.log(data.coordinatesOnRoute, "data")
        } else {
          console.error(
            "Falha ao obter dados dos clientes:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
  
    fetchClientes();
  }, []);
  return (
    <div className="divContent">


        <ul className="conteinerUl">
        {formData.length > 0 && formData.map((cliente) => (
           <li key={cliente.id} className="conteinerInfoModal">
            <p>{cliente.name}</p>
            <p>{cliente.coordenada_x}</p>
            <p>{cliente.coordenada_y}</p>
          </li>
          ))}
        </ul>
        <span>

          <button className="closeButtonModal" onClick={onClose}>Fechar</button>
        </span>

      

    </div>
  );
};
