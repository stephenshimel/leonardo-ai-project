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
import { Header, UserInfo } from "@/src/component/Header";
import Footer from "@/src/component/Footer";
import { ImageDetailsModal } from "@/src/component/modal/ImageDetailsModal";
import LoginModal from "@/src/component/modal/LoginModal";

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
  const {
    isOpen: isImageDetailsModalOpen,
    onOpen: openImageDetailsModal,
    onClose: closeImageDetailsModal,
  } = useDisclosure();

  const {
    isOpen: isLoginModalOpen,
    onOpen: openLoginModal,
    onClose: closeLoginModal,
  } = useDisclosure();

  const [selectedItem, setSelectedItem] = useState<number>();

  const [name, setName] = useState("rick");
  const [page, setPage] = useState(1);

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
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
    openImageDetailsModal();
  };

  const characters = data?.characters.results;
  return (
    <>
      <Header
        userInfo={userInfo}
        onChangeUser={() => {
          openLoginModal();
        }}
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
          <ImageDetailsModal
            isOpen={isImageDetailsModalOpen}
            onClose={closeImageDetailsModal}
            character={characters[selectedItem]}
          />
        )}

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onSubmit={(data) => {
            setUserInfo(data);
            closeLoginModal();
          }}
        />
      </Box>
    </>
  );
};

export default InformationPage;
