import { ApiRequest } from './ApiRequest';

export const FetchingCharacters = async () => {
  try {
    const response = await ApiRequest('/api/getChar', {
      method: 'GET',
    });
    if (!response.ok) {
      console.error("Unable to fetch the characters");
      return { your_characters: [], main_characters: [] };
    }
    const data = await response.json();
    return {
      your_characters: Array.isArray(data.your_characters) ? data.your_characters : [],
      main_characters: Array.isArray(data.main_characters) ? data.main_characters : []
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { your_characters: [], main_characters: [] };
  }
};
