import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  async function handleDeleteIncident(id) {
    await api.delete(`incidents/${id}`, { headers: { Authorization: ongId } });

    setIncidents(incidents.filter(incident => incident.id !== id));
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  useEffect(() => {
    api
      .get("profile", { headers: { Authorization: ongId } })
      .then(response => {
        setIncidents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [ongId]);

  return (
    <div>
      <div className="profile-container">
        <header>
          <img src={logoImg} alt="Be The Hero" />
          <span>Bem vinda, {ongName}</span>

          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>

          <button type="button">
            <FiPower size={18} color="#E02041" onClick={handleLogout} />
          </button>
        </header>

        <h1>Casos Cadastrados</h1>

        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(incident.value)}
              </p>

              <button type="button">
                <FiTrash2
                  size={20}
                  color="#A8A8B3"
                  onClick={() => handleDeleteIncident(incident.id)}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
