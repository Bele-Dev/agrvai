import React, { useState, useEffect } from 'react';
import './Adm.css'; 

function Adm() {


  return (
    <div className="admin-container">
      <h2>Área Administrativa</h2>
      <br />
      <div className="form-container">
        <form onSubmit={handleSubmitNoticia}>
          <h3>Inserir Nova Notícia</h3>
          <br />
          <input
            type="text"
            placeholder="Título"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Resumo"
            value={novoResumo}
            onChange={(e) => setNovoResumo(e.target.value)}
            required
          />
          <br />
          <textarea
            placeholder="Texto Completo"
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
            required
          />
          <br />
          <input
            type="url"
            placeholder="URL da Imagem"
            value={novoImagem}
            onChange={(e) => setNovoImagem(e.target.value)}
            required
          />
          <br />
          <select
            value={novoEstilo}
            onChange={(e) => setNovoEstilo(e.target.value)}
            required
          >
            <option value="Esporte">Esporte</option>
            <option value="Variedades">Variedades</option>
            <option value="Noticia">Notícia</option>
          </select>
          <br />
          <br />
          <button type="submit">Enviar Notícia</button>
        </form>
      </div>

      <h3>Notícias Cadastradas</h3>
      <br />
      <ul className="news-list">
        {noticias.map((noticia) => (
          <li key={noticia.id}>
            {noticia.titulo}{' '}
            <button onClick={() => handleExcluirNoticia(noticia.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      
      <div className="form-container">
        <form onSubmit={handleSubmitColaborador}>
          <h3>Adicionar Colaborador</h3>
          <br />
          <input
            type="text"
            placeholder="Nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
            required
          />
          <br />
          <input
            type="url"
            placeholder="URL do Avatar"
            value={novoAvatar}
            onChange={(e) => setNovoAvatar(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Adicionar Colaborador</button>
        </form>
      </div>

      <h3>Colaboradores Cadastrados</h3>
      <br />
      <ul className="colaboradores-list">
        {colaboradores.map((colaborador) => (
          <li key={colaborador.id}>
            <img src={colaborador.avatar} alt={colaborador.nome} className="colaborador-avatar" />
            {colaborador.nome}{' '}
            <button onClick={() => handleExcluirColaborador(colaborador.id)} id='ex'>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Adm;
