import React, { useState, useEffect } from 'react';
import { supabase } from "../../supabase/supabase.js";

function Editar() {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState('');
    const [sexo, setSexo] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [restricao, setRestricao] = useState('');
    const [imagem, setImagem] = useState('');
    const [user, setUser] = useState(null);
    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Buscar o usuário autenticado
    const getUser = async () => {
        const user = supabase.auth.user();
        setUser(user);
    };

    // Buscar os dados do pet
    const fetchPet = async (userId) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('meu_pet')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (error) {
                setErrorMessage('Erro ao buscar o pet: ' + error.message);
            } else {
                setPet(data);
                setNome(data.nome);
                setTipo(data.tipo);
                setRaca(data.raca);
                setSexo(data.sexo);
                setDataNascimento(data.data_nascimento);
                setRestricao(data.restricao);
                setImagem(data.imagem);
            }
        } catch (error) {
            setErrorMessage('Erro inesperado ao buscar dados do pet: ' + error.message);
        }
        setIsLoading(false);
    };

    // Carregar os dados do pet após o login
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            fetchPet(user.id);
        }
    }, [user]);

    // Função para lidar com o upload de imagem
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const { data, error } = await supabase.storage
                .from('pets')
                .upload(`images/${file.name}`, file);

            if (error) {
                setErrorMessage('Erro ao fazer upload da imagem: ' + error.message);
            } else {
                const imageUrl = supabase.storage.from('pets').getPublicUrl(data.path).publicURL;
                setImagem(imageUrl);
            }
        }
    };

    // Função para editar os dados do pet
    const editar = async (id, nome, tipo, raca, sexo, restricao, imagem) => {
        if (!nome || !tipo || !raca || !sexo) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('meu_pet')
                .update({
                    nome,
                    tipo,
                    raca,
                    sexo,
                    data_nascimento: dataNascimento,
                    restricao,
                    imagem
                })
                .eq('id', id);

            if (error) {
                setErrorMessage('Erro ao atualizar o perfil do animal: ' + error.message);
            } else {
                fetchPet(user.id);
            }
        } catch (error) {
            setErrorMessage('Erro inesperado ao editar o perfil do pet: ' + error.message);
        }
        setIsLoading(false);
    };

    // Função chamada ao clicar no botão salvar
    const handleSave = () => {
        if (pet) {
            editar(pet.id, nome, tipo, raca, sexo, restricao, imagem);
        }
    };

    return (
        <div className="pets-container">
            <div className="centro">
                {imagem && <img className="pet-image" src={imagem} alt={nome} width="200" height="200" />}
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} id="nome" />

            <label>Tipo:</label>
            <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} id="tipo" />

            <label>Raça:</label>
            <input type="text" value={raca} onChange={(e) => setRaca(e.target.value)} id="raca" />

            <label>Sexo:</label>
            <select value={sexo} onChange={(e) => setSexo(e.target.value)} id="sexo">
                <option value="">Selecione</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
            </select>

            <label>Data de Nascimento:</label>
            <input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                id="dataNascimento"
            />

            <label>Restrição:</label>
            <input type="text" value={restricao} onChange={(e) => setRestricao(e.target.value)} id="restricao" />

            <label>Imagem:</label>
            <input type="file" onChange={handleImageChange} />

            <button className="marcar" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Salvando...' : 'Salvar'}
            </button>
        </div>
    );
}

export default Editar;
