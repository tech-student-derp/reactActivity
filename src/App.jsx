import { useState } from 'react';
import './App.css'
import axios from "axios";

function App() {

  const [search, setSearch] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const typeColors = {
    normal:  "#bcbcbc",
    dragon:  "#5d35b0",
    ice:     "#64fed9",
    grass:   "#65bb69",
    bug:     "#b2fe59",
    rock:    "#b85000",
    water:   "#1d88e4",
    fighting:"#9e381a",
    ground:  "#e5cd71",
    fire:    "#fe9100",
    steel:   "#9e9e9e",
    flying:  "#b2dfdb",
    psychic: "#c1175a",
    electric:"#feea3b",
    dark:    "#424141",
    ghost:   "#4527a0",
    fairy:   "#fe7faa",
    poison:  "#8e24aa"
  };

  const typeBorderColors = {
    normal:   "#888888",
    dragon:   "#3d2375",
    ice:      "#3da893",
    grass:    "#3d8045",
    bug:      "#70a33a",
    rock:     "#753800",
    water:    "#145fa0",
    fighting: "#702a12",
    ground:   "#9a8746",
    fire:     "#a85f00",
    steel:    "#666666",
    flying:   "#829f9d",
    psychic:  "#7f0e3b",
    electric: "#b5a500",
    dark:     "#2a2929",
    ghost:    "#2e1a70",
    fairy:    "#b55877",
    poison:   "#5d176e"
  };

  const searchPokemon = async () =>
  {
    try
    {
      const res = await axios.get
      (
        `https://pokeapi.co/api/v2/pokemon/${search}`
      );

      setPokemonData(res.data);
      setErrorMessage("");
    }
    catch (error)
    {
      setPokemonData(null);
      setErrorMessage("Pokemon not found. Try using random button lol");
    }
  }

  const randomPokemon = async () =>
  {
    try
    {
      const randomID = Math.floor(Math.random() * 1025) + 1;

      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomID}`
      );

      setPokemonData(res.data);
      setSearch(res.data.name);
      setErrorMessage("");
    }
    catch (error)
    {
      console.error(error);
    }
  }

  return (
    <>
      <header>
        <h2>PokeDex</h2>

        <button>INFO</button>     
        <button disabled>AREA</button>
        <button disabled>FORMS</button>
      </header>

      <main>
        <div>
          <div>  
            <div>
              <label htmlFor="">Search Pokemon</label>
              <div>
                <input 
                  type="text" 
                  name="" 
                  id="" 
                  placeholder='pikachu'
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button onClick={searchPokemon}>Search</button>
                <button onClick={randomPokemon}>Random</button>
              </div>
            </div>
          </div>
        </div>
      </main>



      <section>
        <div>
          <div>
            <div>
              {errorMessage && (
                <p className="error-message">
                  {errorMessage}
                </p>
              )}

              {pokemonData && (
                <article>
                  <div>
                    <div>
                      <h3 className='pokemonname'>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                      <p className='pokemonid'>#{pokemonData.id}</p>
                    </div>

                    <div>
                      <p className='pokemonhp'>{pokemonData.stats[0].base_stat} HP</p>
                      {pokemonData.types.map((typeInfo) => (
                        <p className='pokemontype'
                           key={typeInfo.type.name}
                           style={{ backgroundColor: typeColors[typeInfo.type.name],
                                    border: `2px solid ${typeBorderColors[typeInfo.type.name]}`
                           }}
                        > 
                          {typeInfo.type.name.toUpperCase()}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        border: `4px solid ${typeBorderColors[pokemonData.types[0].type.name]}`
                      }}
                    >
                      <img
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                      />
                    </div>
                  </div>

                  <div className="pokemon-abilities">
                    {pokemonData.abilities.map((abilityInfo) => (
                      <div className="ability" key={abilityInfo.ability.name}>
                        <div>
                        <p>ABILITY</p>

                        <p>
                          {abilityInfo.ability.name.charAt(0).toUpperCase() +
                            abilityInfo.ability.name.slice(1)}
                        </p>

                        {abilityInfo.is_hidden === true && (
                          <p hidden>HIDDEN</p>
                        )}
                      </div>

                        <p>
                          {abilityInfo.ability.name.charAt(0).toUpperCase() +
                            abilityInfo.ability.name.slice(1)}{" "}
                          ability.
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
