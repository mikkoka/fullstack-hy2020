const PageMainComponent = ({shownCountries, handleClick}) => {
  
    if (shownCountries.length === 1) {
        return ( 
        <ShowCountry country={shownCountries[0]}/>
        ) 
      } 
    return (
      <ul>
        {shownCountries.length <= 10 ? shownCountries.map((c,i) => 
        <li 
          key={c.name}>{c.name} <button value={i}onClick={handleClick}>show                        
                                </button>
        </li>) : 
        <li>too many matches, specify another filter
        </li>} 
      </ul>
    )
  
  }
  
  const ShowCountry = ({country}) => {
  
    return (
      <div>
        <h2>{country.name}</h2>
        <p>
          Capital: {country.capital}<br></br>
          Population: {country.population}
        </p>
        <h3>languages</h3>
         <ul>      
          {country.languages.map (l => <li key={l.name}>{l.name} </li>) }
        </ul>
        <img src={country.flag} alt="flag" width="300" height="200"></img>
      </div>
    )
  }

    export default PageMainComponent
