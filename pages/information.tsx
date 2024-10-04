import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Button,
  Grid,
  Image,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Header } from "@/src/component/Header";
import Footer from "@/src/component/Footer";
import { CustomizedModal } from "@/src/component/modal/CustomizedModal";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        name
        image
      }
    }
  }
`;

const InformationPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<number>();

  const [name, setName] = useState("rick");
  const [page, setPage] = useState(1);

  const [userInfo, setUserInfo] = useState<{
    username: string;
    jobTitle: string;
  } | null>(null);
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { name, page },
    onError: (error) => {
      console.error(error);
    },
  });

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text>Error fetching data...</Text>;

  const handleClickItem = (item: number) => {
    setSelectedItem(item);
    onOpen();
  };

  const characters = data?.characters.results;
  return (
    <>
      <Header
        username="username"
        jobTitle="jobTitle"
        onChangeUser={() => {}}
      ></Header>
      <Box p={8}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {characters.map((character, index: number) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              onClick={() => handleClickItem(index)}
              cursor="pointer"
            >
              <Image src={character.image} alt={character.name} />
              <Box p={4}>
                <Text fontWeight="bold">{character.name}</Text>
              </Box>
            </Box>
          ))}
        </Grid>

        <Footer page={page} setPage={setPage} />

        {selectedItem && (
          <CustomizedModal
            isOpen={isOpen}
            onClose={onClose}
            character={characters[selectedItem]}
          />
        )}
      </Box>
    </>
  );
};

export default InformationPage;
