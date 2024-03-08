import React, { useState } from "react";
import "./index.css";
import { toast } from "react-toastify";

export const RegisterClient = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    phone: "",
    coordenadas_x: 0,
    coordenadas_y: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Cliente cadastrado com sucesso!");
        toast.success("Cliente cadastrado com sucesso!")
      } else {
        console.error("Erro ao cadastrar cliente");
      }
    } catch (error) {
      toast.error('Algo deu errado!')
      console.error("Erro ao realizar a requisição:", error);
    }
  };

  return (
      <form className="form" onSubmit={handleSubmit}>
        
        <label htmlFor="nome">Nome</label>        
          <input
            className="inputForm"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        
        <label htmlFor="email" className="label"> Email </label>
          <input
            className="inputForm"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
       
        <label htmlFor="phone" className="label">Telefone </label>
          <input
            className="inputForm"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
      
        <label htmlFor="coordenadas_x" className="label"> Coord X  </label>
          <input
            className="inputForm"
            type="number"
            name="coordenadas_x"
            value={formData.coordenadas_x}
            onChange={handleChange}
            required
          />
       
        <label htmlFor="coordenadas_y" className="label">Coorde Y </label>
          
          <input
            className="inputForm"
            type="number"
            name="coordenadas_y"
            value={formData.coordenadas_y}
            onChange={handleChange}
            required
          />

        <button type="submit">Cadastrar</button>
      </form>
  );
};