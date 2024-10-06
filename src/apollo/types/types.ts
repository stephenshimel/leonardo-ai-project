export type Location = {
  id: string;
  name: string;
};

export type Character = {
  id: string;
  name: string;
  image: string;
  location: Location;
};

export type GetCharacters = {
  characters: {
    info: {
      count: number;
    };
    results: Array<Character>;
  };
};

export type GetCharactersQueryVariables = {
  page: number;
  name: string;
};
