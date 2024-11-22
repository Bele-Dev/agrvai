import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "../../supabase/supabase.js";
// import './vacinas.css';

function Vacinas() {
    const { petId } = useParams();
    const [vacinas, setVacinas] = useState([]);

    useEffect(() => {
        const fetchVacinas = async () => {
            const { data, error } = await supabase
                .from('vacinas')
                .select('*')
                .eq('pet_id', petId);

            if (error) {
                console.error('Erro ao buscar vacinas:', error);
            } else {
                setVacinas(data);
            }
        };

        fetchVacinas();
    }, [petId]);

    const marcarVacinado = async (vacinaId) => {
        const { error } = await supabase
            .from('vacinas')
            .update({ vacinado: true })
            .eq('id', vacinaId);

        if (error) {
            console.error('Erro ao marcar vacina como vacinada:', error);
        } else {
            alert('Vacina marcada como vacinada!');
            fetchVacinas(); // Atualiza a lista de vacinas
        }
    };

    return (
        <div className="vacinas-container">
            <h1 id='title'>Vacinas do Pet</h1>
            <br/>
            {vacinas.length === 0 ? (
                <p>Não há vacinas cadastradas para este pet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome da Vacina</th>
                            <th>Data</th>
                            <th>Observações</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacinas.map(vacina => (
                            <tr key={vacina.id}>
                                <td>{vacina.nome_vacina}</td>
                                <td>{vacina.data_vacina}</td>
                                <td>{vacina.observacoes}</td>
                                <td>
                                    <button onClick={() => marcarVacinado(vacina.id)}>Marcar como Vacinado</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Vacinas;
