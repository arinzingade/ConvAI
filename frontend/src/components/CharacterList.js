import React, { useEffect, useState } from 'react';
import { FetchingCharacters } from '../services/CharacterServices';

const CharacterList = () => {
  const [yourCharacters, setYourCharacters] = useState([]);
  const [mainCharacters, setMainCharacters] = useState([]);

  useEffect(() => {
    async function fetchList() {
      const { your_characters, main_characters } = await FetchingCharacters();
      console.log('Your Characters:', your_characters);
      console.log('Main Characters:', main_characters);
      setYourCharacters(your_characters);
      setMainCharacters(main_characters);
    }

    fetchList();
  }, []);

  return (
    <div>
      <h2>Your Characters</h2>
      {yourCharacters.map((element, index) => (
        <div key={index}>
          {element.character_name}
        </div>
      ))}
      <h2>Main Characters</h2>
      {mainCharacters.map((element, index) => (
        <div key={index}>
          {element.character_name}
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
