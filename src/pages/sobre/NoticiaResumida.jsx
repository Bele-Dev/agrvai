import React from "react";
import { Link } from "react-router-dom";
import './resumida.css';

const NoticiaResumida = ({ noticia }) => {
  return (
    <div className="noticia-resumida">
      <h3>{noticia.titulo}</h3>
      <img src={noticia.imagem} alt={noticia.titulo} />
      <Link to={`/noticias/`}>
        <button>Ver Notícia Completa</button>
      </Link>
    </div>
  );
};

export default NoticiaResumida;
