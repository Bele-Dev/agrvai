import React, { useState } from 'react';
import { supabase } from "../../supabase/supabase.js";

function Esqueci() {
    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    const alterarSenha = async () => {
        try {
            if (!email || !novaSenha) {
                setMensagem('Por favor, preencha todos os campos.');
                return;
            }
            const user = supabase.auth.user();
            if (!user) {
                setMensagem('Usuário não autenticado');
                return;
            }
            const { data, error } = await supabase.auth.update({
                password: novaSenha
            });

            if (error) {
                setMensagem(`Erro: ${error.message}`);
            } else {
                setMensagem('Senha atualizada com sucesso!');
            }
        } catch (error) {
            console.error('Erro inesperado:', error);
            setMensagem('Erro inesperado ao tentar atualizar a senha.');
        }
    };

    return (
        <>
            <br />
            <div className="container">
                <label>Seu Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="Email"
                    id="emaill"
                />
                <label>Nova Senha:</label>
                <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    name="NovaSenha"
                    id="NovaSenha"
                />
                <button onClick={alterarSenha}>Alterar senha</button>

                {/* Exibe a mensagem de sucesso ou erro */}
                {mensagem && <p>{mensagem}</p>}
            </div>
        </>
    );
}

export default Esqueci;
