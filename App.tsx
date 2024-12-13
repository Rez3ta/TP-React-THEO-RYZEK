import React, { useState, useEffect } from 'react';
import { SuperHero } from './SuperHero'; // Classe SuperHero
import SuperHerosData from './SuperHeros.json'; // Données JSON

const App = () => {

   
    const [heroes, setHeroes] = useState<SuperHero[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<'name' | 'id'>('name');
    const [selectedHero, setSelectedHero] = useState<SuperHero | null>(null); 
    const [showBootstrapView, setShowBootstrapView] = useState(false);
    useEffect(() => {
        const heroesFromData = SuperHerosData.map((heroData: any) =>
            new SuperHero(heroData.id, heroData.name,heroData.slug, heroData.powerstats)
        );
        setHeroes(heroesFromData);
    }, []);

    
    const filteredHeroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    const sortedHeroes = filteredHeroes.sort((a: SuperHero, b: SuperHero) => {
        if (sortKey === 'name') {
            return a.name.localeCompare(b.name);
        } else {
            return a.id - b.id;
        }
    });

    return (
        <div className="container mt-4">
            <h1>Super Heroes App</h1>
            <p>Nombre de super-héros trouvés : {sortedHeroes.length}</p>
          
            
            <input
                type="text"
                placeholder="Rechercher un super-héros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    margin: '10px 0',
                    padding: '5px',
                    width: '100%',
                    maxWidth: '300px',
                }}
            />

           
            <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as 'name' | 'id')}
                style={{ margin: '10px 0', padding: '5px' }}
            >
                <option value="name">Trier par nom</option>
                <option value="id">Trier par ID</option>
            </select>

             
              
            <button
                className="btn btn-primary mb-4"
                onClick={() => setShowBootstrapView(!showBootstrapView)} 
            >
                {"boutton bootstrap"}
            </button>

           
            {showBootstrapView ? (
                <div className="row">
                    {filteredHeroes.length > 0 ? (
                        filteredHeroes.map((hero) => (
                            <div key={hero.id} className="col-md-4 mb-3">
                                <div
                                    className="card text-center p-3"
                                    style={{ cursor: 'pointer'}}
                                    
                                >
                                     <img
                        src={`https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/images/sm/${hero.slug}.jpg`}
                        alt={hero.name}
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                                  <p>ID API:{hero.id}</p>
                                  <p>Nom:{hero.name}</p>
                                  <p>slug:{hero.slug}</p>
                                  <p>Intelligence:{hero.powerstats.intelligence}</p>
                                  <p>Force:{hero.powerstats.strength}</p>
                                  <p>Vitesse:{hero.powerstats.speed}</p>
                                  <p>Endurance:{hero.powerstats.durability}</p>
                                  <p>Pouvoir:{hero.powerstats.power}</p>
                                  <p>Combat:{hero.powerstats.combat}</p>
                   
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Aucun super-héros trouvé.</p>
                    )}
                </div>
            ) : (
                <ul>
                    {filteredHeroes.length > 0 ? (
                        filteredHeroes.map((hero) => (
                            <li
                                key={hero.id}
                                onClick={() => setSelectedHero(hero)} 
                                style={{
                                    cursor: 'pointer',
                                    padding: '5px',
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                {hero.name}
                            </li>
                        ))
                    ) : (
                        <p className="text-center">Aucun super-héros trouvé.</p>
                    )}
                </ul>
            )}

                {selectedHero && (
                <div style={{ marginTop: '20px', padding: '10px', border: 'px solid #ddd' }}>
                    <h2>Détails du Super-Héros</h2>
                    <p>Nom : {selectedHero.name}</p>
                    <p>ID : {selectedHero.id}</p>
                    <p>Slug : {selectedHero.slug}</p>
                    <p>Intelligence : {selectedHero.powerstats.intelligence}</p>
                    <p>Force : {selectedHero.powerstats.strength}</p>
                    <p>Vitesse: {selectedHero.powerstats.speed}</p>
                    <p>Endurance : {selectedHero.powerstats.durability}</p>
                    <p>Pouvoir: {selectedHero.powerstats.power}</p>
                    <p>combat: {selectedHero.powerstats.combat}</p>
                    <img
                        src={`https://cdn.jsdelivr.net/gh/rtomczak/superhero-api@0.3.0/api/images/sm/${selectedHero.slug}.jpg`}
                        alt={selectedHero.name}
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                </div>
            )}
        </div>
        
    );
    
};

export default App;
