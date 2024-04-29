import React from 'react';
import './ActorCard.css';

const ActorCard = ({ actor, defaultImage }) => {
  const actorImage = actor.profile_path
    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
    : defaultImage;

  return (
    <div className="actor-card">
      <img src={actorImage} alt={actor.name} className="actor-image" />
      <p className="actor-name">{actor.name}</p>
    </div>
  );
};

export default ActorCard;
