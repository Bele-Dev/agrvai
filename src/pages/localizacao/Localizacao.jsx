import React, { useRef } from 'react';
import './Localizacao.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Mapa from './mapa2.png';

// Ícone personalizado para o marcador
const customIcon = new L.Icon({
    iconUrl: Mapa,
    iconSize: [38, 38]
});

function Loc() {
    const firstMapRef = useRef(null);

    const scrollToFirstMap = () => {
        if (firstMapRef.current) {
            firstMapRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="pai">
                <div className="filho1">
                    <br />
                    <h1 className='bisneto1'>CLÍNICAS RECOMENDADAS!</h1>
                    <div className="map-container">
                        <img src={Mapa} className='pulsing' alt="" />
                        <p onClick={scrollToFirstMap}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                            </svg>
                        </p>
                    </div>
                    <br />

                    <h2 id='title_map'>Clínica Veterinária Santa Rita!</h2>
                    <div className="map-container" ref={firstMapRef}>
                        <MapContainer center={[-21.7106, -47.4813]} zoom={15} style={{ height: '300px', width: '300px' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[-21.7106, -47.4813]} icon={customIcon}>
                                <Popup>R. Inácio Ribeiro, 213 - Centro, Santa Rita do Passa Quatro - SP, 13670-000</Popup>
                            </Marker>
                        </MapContainer>
                        <p>Telefone: (19) 3582-1038</p>
                    </div>

                    <h2 id='title_map'>Clínica Veterinária Centro</h2>
                    <div className="map-container">
                        <MapContainer center={[-21.7095, -47.4820]} zoom={15} style={{ height: '300px', width: '300px' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[-21.7095, -47.4820]} icon={customIcon}>
                                <Popup>R. Vítor Meireles, 466 - Centro, Santa Rita do Passa Quatro - SP, 13670-000</Popup>
                            </Marker>
                        </MapContainer>
                        <p>Telefone: (19) 97148-6513</p>
                    </div>

                    <h2 id='title_map'>Clínica Veterinária São Joaquim</h2>
                    <div className="map-container">
                        <MapContainer center={[-21.7098, -47.4832]} zoom={15} style={{ height: '300px', width: '300px' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[-21.7098, -47.4832]} icon={customIcon}>
                                <Popup>R. Cel. Joaquim Vítor de Souza Meireles, 434 - Centro, Santa Rita do Passa Quatro - SP, 13670-000</Popup>
                            </Marker>
                        </MapContainer>
                        <p>Telefone: (19) 99574-3829</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loc;
