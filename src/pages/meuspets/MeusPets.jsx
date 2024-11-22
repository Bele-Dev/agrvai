import { useState, useEffect, useRef } from 'react'; 
import { supabase } from "../../supabase/supabase.js";
import { Link } from 'react-router-dom';
import './meusPets.css';
import Editar from '../editar/Editar.jsx';

function MeusPets() {
    const [pets, setPets] = useState([]);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [numeroUsuario, setNumeroUsuario] = useState(null);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);
    const [vacinaNome, setVacinaNome] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [dataVacina, setDataVacina] = useState('');
    
    const [vacinasSelecionadas, setVacinasSelecionadas] = useState([]);
    const [tabelaVisivel, setTabelaVisivel] = useState(false);

    // Referência para a tabela de vacinas
    const tabelaRef = useRef(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData) {
            setUsuarioLogado(userData.nome);
            fetchUserNumber(userData.email);
        }
    }, []);

    const fetchUserNumber = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('numero')
            .eq('email', email)
            .single();

        if (error) {
            console.error('Erro ao buscar número do usuário:', error);
        } else {
            setNumeroUsuario(data.numero);
            fetchPets(data.numero);
        }
    };

    const fetchPets = async (numeroUsuario) => {
        const { data, error } = await supabase
            .from('meu_pet')
            .select('*')
            .eq('nmr_user', numeroUsuario);

        if (error) {
            console.error('Erro ao buscar pets:', error);
        } else {
            setPets(data);
        }
    };

    const fetchVacinas = async (petId) => {
        const { data, error } = await supabase
            .from('vacinas')
            .select('*')
            .eq('pet_id', petId);

        if (error) {
            console.error('Erro ao buscar vacinas:', error);
        } else {
            setVacinasSelecionadas(data);
            setTabelaVisivel(true); // Mostrar a tabela quando as vacinas forem buscadas
        }
    };

    const abrirModal = (pet) => {
        setSelectedPet(pet);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setVacinaNome('');
        setObservacoes('');
        setDataVacina(''); 
        setSelectedPet(null);
    };

    const marcarVacina = async () => {
        const { error } = await supabase
            .from('vacinas')
            .insert([{ 
                pet_id: selectedPet.id, 
                data_vacina: dataVacina,
                nome_vacina: vacinaNome,
                observacoes: observacoes,
                status_vacina: false // Define como pendente ao marcar
            }]);
    
        if (error) {
            console.error('Erro ao marcar vacina:', error);
        } else {
            alert('Vacina marcada com sucesso!');
            fetchPets(numeroUsuario);
            fecharModal();
        }
    };
    
    

    const mostrarVacinas = (pet) => {
        fetchVacinas(pet.id);
    };

    const alternarTabela = (pet) => {
        if (selectedPet && selectedPet.id === pet.id && tabelaVisivel) {
            setTabelaVisivel(false); // Esconde a tabela se já está visível
        } else {
            setSelectedPet(pet);
            fetchVacinas(pet.id); // Mostra a tabela para o pet selecionado
        }
    };
    
    const atualizarStatusVacina = async (vacinaId, statusAtual) => {
        const novoStatus = !statusAtual; // Inverte o status atual
    
        try {
        
            const { data, error } = await supabase
                .from('vacinas') 
                .update({ status_vacina: novoStatus })
                .eq('id', vacinaId);
    
            if (error) throw error; 
    
           
            setVacinasSelecionadas(vacinasSelecionadas.map(vacina => 
                vacina.id === vacinaId ? { ...vacina, status_vacina: novoStatus } : vacina
            ));
        } catch (error) {
            console.error('Erro ao atualizar o status da vacina:', error);
        }
    };
    const excluirPet = async (petId) => {
        try {
            const { error } = await supabase
                .from('meu_pet')
                .delete()
                .eq('id', petId);
    
            if (error) {
                console.error('Erro ao excluir o pet:', error);
            } else {
                alert('Pet excluído com sucesso!');
                setPets(pets.filter(pet => pet.id !== petId)); // Atualiza a lista de pets
            }
        } catch (error) {
            console.error('Erro ao tentar excluir o pet:', error);
        }
    };

    const ir = async()=> {
        window.location = "Filmes.html"
    }
    
    
    return (
        <div className="meus-pets-container">
            <h1 id='title'>Meus Pets</h1>

            <br/>
            <div className="pets-container">
                {pets.length === 0 ? (
                    <p>Você ainda não tem pets cadastrados.</p>
                ) : (
                    <ul className="pets-list">
                        {pets.map(pet => (
                            <li className="pet-item" key={pet.id}>
                                <div className="header">
                                    <h3 className="pet-name">{pet.nome}</h3>
                                    <button id='table' onClick={() => mostrarVacinas(pet)}>
    {tabelaVisivel ?'ㅤ' : 
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-calendar-month" viewBox="0 0 16 16">
        <path d="M2.56 11.332 3.1 9.73h1.984l.54 1.602h.718L4.444 6h-.696L1.85 11.332zm1.544-4.527L4.9 9.18H3.284l.8-2.375zm5.746.422h-.676V9.77c0 .652-.414 1.023-1.004 1.023-.539 0-.98-.246-.98-1.012V7.227h-.676v2.746c0 .941.606 1.425 1.453 1.425.656 0 1.043-.28 1.188-.605h.027v.539h.668zm2.258 5.046c-.563 0-.91-.304-.985-.636h-.687c.094.683.625 1.199 1.668 1.199.93 0 1.746-.527 1.746-1.578V7.227h-.649v.578h-.019c-.191-.348-.637-.64-1.195-.64-.965 0-1.64.679-1.64 1.886v.34c0 1.23.683 1.902 1.64 1.902.558 0 1.008-.293 1.172-.648h.02v.605c0 .645-.423 1.023-1.071 1.023m.008-4.53c.648 0 1.062.527 1.062 1.359v.253c0 .848-.39 1.364-1.062 1.364-.692 0-1.098-.512-1.098-1.364v-.253c0-.868.406-1.36 1.098-1.36z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
    </svg>}
</button>

                                </div>
                                <div className="centro">
                                    {pet.imagem && <img className="pet-image" src={pet.imagem} alt={pet.nome} />}
                                </div>
                                <div className="pet-details">
                                    <p>Raça: {pet.raca}</p>
                                    <p>Tipo: {pet.tipo}</p>
                                    <p>Sexo: {pet.sexo}</p>
                                    <p>Restrições: {pet.restricoes}</p>
                                    <br/>
                                    <div className="centro">
                                        <button id='marcar' onClick={() => abrirModal(pet)}>Marcar Vacina <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-pulse" viewBox="0 0 16 16">
                                            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                                            <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
                                            <path d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128z"/>
                                        </svg></button>
                                        <button id="excluir" onClick={() => excluirPet(pet.id)}>
    Excluir
</button>
                                    {/* Possível alteração */}{/*  <a href="editar.jsx">
                                        <button id="editar">
                                            Editar
                                        </button>
                                        </a> */ }
                                    </div>
                                </div>
                            </li>
                        ))}  
                    </ul>
                )}
            </div>

            {vacinasSelecionadas.length > 0 && (
                <div className="vacinas-card">
                   
                    {tabelaVisivel && (
                        <div ref={tabelaRef}>
                            {/* <h2>Vacinas do Pet</h2> */}
                            {tabelaVisivel && (
            <button id='fechar' onClick={() => setTabelaVisivel(false)}>
                Fechar Tabela
            </button>
        )}
<table className="tabela-vacinas">
    <thead>
        <tr>
            <th>Nome da Vacina</th>
            <th>Data da Vacina</th>
            <th>Observações</th>
            <th>Status</th> {/* Coluna para Status */}
        </tr>
    </thead>
    <tbody>
        {vacinasSelecionadas.map(vacina => (
            <tr key={vacina.id}>
                <td>{vacina.nome_vacina}</td>
                <td>{vacina.data_vacina}</td>
                <td>{vacina.observacoes}</td>
                <td>
                    {/* Botão para alterar o status */}
                    <button 
                        onClick={() => atualizarStatusVacina(vacina.id, vacina.status_vacina)}
                        className={vacina.status_vacina ? 'botao-feito' : 'botao-pendente'}
                    >
                        {vacina.status_vacina ? 'Feito' : 'Pendente'}
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

                        </div>
                    )}
                </div>
            )}

            {/* Modal vacina */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={fecharModal}>&times;</span>
                        <h2>Marcar Vacina para {selectedPet.nome}</h2>
                        <label>
                            Nome da Vacina:
                            <input 
                                type="text" 
                                value={vacinaNome} 
                                onChange={(e) => setVacinaNome(e.target.value)} 
                            />
                        </label>
                        <label>
                            Data da Vacina:
                            <input 
                                type="date" 
                                value={dataVacina} 
                                onChange={(e) => setDataVacina(e.target.value)} 
                            />
                        </label>
                        <label>
                            Observações:
                            <textarea 
                                value={observacoes} 
                                onChange={(e) => setObservacoes(e.target.value)} 
                            />
                        </label>
                        <button onClick={marcarVacina}>Salvar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MeusPets;