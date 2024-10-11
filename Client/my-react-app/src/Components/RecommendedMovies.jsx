import React from 'react';
import './MovieCard.css'
const MovieCard = () => {
    const movies = [
        {
          id: 1,
          title: "The Batman",
          image: "https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "A gritty crime thriller",
          releaseDate: "2022-03-04"
        },
        {
          id: 2,
          title: "Spider-Man: No Way Home",
          image: "https://images.unsplash.com/photo-1500156006176-b65d84d15b87?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "A multiverse adventure",
          releaseDate: "2021-12-17"
        },
        {
          id: 3,
          title: "The Batman",
          image: "https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "A gritty crime thriller",
          releaseDate: "2022-03-04"
        }
        // Add more movie objects here...
      ];
      
  return (
    <div  id='card'>
  {
    movies.map((data)=>{

        return(<>
         <div className="movie-card"> 
        <img  src={data.image}/>
        <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>Release Date: {data.releaseDate}</p>
      </div>

        </>)
    })
    }

  
    </div>
  );
};

export default MovieCard;
