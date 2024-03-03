import { useState } from 'react'
import './App.css'
import {getMovieList, searchMovie} from "./api"
import { useEffect } from 'react'

const App = () => {
  const[popularmovies, setpopularmovies] = useState([]) 

  useEffect(() => {
    getMovieList().then((result) => {
      setpopularmovies(result)
    })
  }, [])

  console.log({popularmovies: popularmovies})

  const PopularMovieList = () => {
    return popularmovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
              <div className="Movie-title">{movie.title}</div>
              <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
              <div className="Movie-date">release : {movie.release_date}</div>
              <div className="Movie-rate">{movie.vote_average}</div>
          </div>
      )
    })
  }

  const search  = async(q) => {
    if(q.length > 3 ){
      const query = await searchMovie(q)
      setpopularmovies(query.results)
    }
  }

  return (
      <div className='App'>
        <header className='App-header'>
          <h1>FlickFinder</h1>
          <p>Discover Every Movie Ever Made</p>
          <input 
          placeholder='cari film kesayangan anda'
          className='Movie-search'
          onChange={({target}) => search(target.value)}
          />
          <div className="Movie-container">
            <PopularMovieList />
          </div>
        </header>
        <footer>
          build with ❤️ by <a href='https://www.instagram.com/_jeiverl/'>jayyy</a>
          </footer>
      </div>
  )
}


export default App
