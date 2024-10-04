export type GetCharacters = {
  characters: {
    info: {
      count: number;
    };
    results: Array<{
      name: string;
      image: string;
    }>;
  };
};

export type GetCharactersQueryVariables = {
  page: number;
  name: string;
};
