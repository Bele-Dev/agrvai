import { useState, useEffect } from 'react';
import { supabase } from "../../supabase/supabase.js";
import './login.css';
import { Link } from 'react-router-dom';

function Auth() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData) {
            window.location.href = '/pets'; // Redireciona se o usuário já estiver logado
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('senha', senha)
            .single();

        if (error || !data) {
            setErrorMessage('Email ou senha inválidos.');
        } else {
            localStorage.setItem('user_token', data.id);
            localStorage.setItem('user_data', JSON.stringify({ nome: data.nome, email: data.email }));
            window.location.href = '/pets'; // Redireciona para a página desejada
        }
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        
        const { error } = await supabase
            .from('users')
            .insert([{ nome, email, telefone, data_nascimento: dataNascimento, senha }]);

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        alert('Conta criada com sucesso! Você pode fazer login agora.');
        setIsLoginMode(true);
    };

    const toggleAuthMode = () => {
        setIsLoginMode(!isLoginMode);
        setErrorMessage('');
        setEmail('');
        setSenha('');
        setNome('');
        setTelefone('');
        setDataNascimento('');
    };

    

    return (
        <>
            <br />
            <div className="container">
                <h1>{isLoginMode ? 'Login' : 'Criar Conta'}</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={isLoginMode ? handleLogin : handleCadastro}>
                    {!isLoginMode && (
                        <>
                            <label>Nome:</label>
                            <input 
                                type="text" 
                                value={nome} 
                                onChange={(e) => setNome(e.target.value)} 
                                required 
                            />
                        </>
                    )}
                    <label>Email:</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    {!isLoginMode && (
                        <>
                            <label>Telefone:</label>
                            <input 
                                type="text" 
                                value={telefone} 
                                onChange={(e) => setTelefone(e.target.value)} 
                            />
                            <label>Data de Nascimento:</label>
                            <input 
                                type="date" 
                                value={dataNascimento} 
                                onChange={(e) => setDataNascimento(e.target.value)} 
                            />
                        </>
                    )}
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                    />
                    <button type="submit">{isLoginMode ? 'Entrar' : 'Criar Conta'}</button>
                    <br />
                   {/* Possível atualição */}
                   {/* <a href="Esqueci.jxs">Esqueceu senha</a>*/}
                </form>
                <div className="switch-auth" onClick={toggleAuthMode}>
                    {isLoginMode ? 'Criar Conta' : 'Já tem uma conta? Faça login'}
                </div>
            </div>
            <br />
        </>
    );
}

export default Auth;
