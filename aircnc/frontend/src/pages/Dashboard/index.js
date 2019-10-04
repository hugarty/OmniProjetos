import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css'

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    //Executa apenas uma vez quando o segundo argumento tem length 0
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data);
        }
        loadSpots();
    }, [])
    return (
        <>
            <ul className='spot-list'>
                {spots.map(spot => (
                    <li key={spot.id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}} > </header>  
                        <strong>{spot.company} </strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn"> Cadastrar novo spot</button>
            </Link>
        </>
    )
}