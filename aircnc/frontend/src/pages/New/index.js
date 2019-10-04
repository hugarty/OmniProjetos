import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'

export default function New( { history } ) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null
        },
        [thumbnail]
    );

    async function handleSubmit(e){
        e.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input 
                id="company"
                placeholder="O nome da sua empresa linda"
                value={company}
                onChange={e => setCompany(e.target.value)}/>
            
            <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
            <input 
                id="techs"
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={e => setTechs(e.target.value)}/>

            <label htmlFor="price">Valor da Diária</label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={e => setPrice(e.target.value)}/>
            
            <button type="submit" className="btn">Cadastrar</button>
        </form>
    )
}