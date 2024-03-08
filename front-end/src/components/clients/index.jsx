import React, { useState, useEffect } from "react";
import "../../App.css";
import { RegisterClient } from "../registerClient";
import { ModalRoutes } from "../modal";

export const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [openModal, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("http://localhost:3000/clients");

        if (response.ok) {
          const data = await response.json();

          setClientes(data);
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
  },[clientes]);
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.name.toLowerCase().includes(filtro.toLowerCase())
  );
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <>
      
    
      <div className="conteinerInfo">
        <div className="divForm">
          <RegisterClient/>

        </div>
        <label htmlFor="filtro">Filtrar por nome:</label>
        <input
          className="inputSearch"
          type="text"
          id="filtro"
          value={filtro}
          onChange={handleFiltroChange}
        />
        <button onClick={handleOpenModal}>visualizar rota</button>
        <h2>Clientes Cadastrados No Sistema</h2>
        <ul className="ulConteiner">
          {clientesFiltrados.map((cliente) => (
            <li key={cliente.id} className="liConteinerInfo">
              <p>{cliente.name}</p>
              <p>{cliente.phone}</p>
              <p>{cliente.email}</p>
            </li>
          ))}
        </ul>
      </div>
      {openModal && (
        <ModalRoutes onClose={handleCloseModal} />
      )}
    </>
  );
};
