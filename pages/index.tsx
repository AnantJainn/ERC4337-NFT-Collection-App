import type { NextPage } from "next";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../constant/addresses";
import NFTCard from "../components/NFTCard";

const Home: NextPage = () => {
  const { contract } = useContract(NFT_ADDRESS);

  const { data: nfts, isLoading: loadingNFTs } = useNFTs(contract);

  return (
    <Container maxW={"1100px"}>
      {loadingNFTs ? (
        <Flex
          h={"90vh"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner />
        </Flex>
      ) : (
        <Container maxW={"1100px"}>
          <SimpleGrid
            columns={[1, 2, 3]}
            spacing={50}
            my={10}
            minChildWidth="250px"
            width="100%"
          >
            {nfts && nfts.length > 0 ? (
              nfts.map((nft, index) => (
                <NFTCard key={index} tokenId={nft.metadata.id} />
              ))
            ) : (
              <Box>No NFTs found</Box>
            )}
          </SimpleGrid>
        </Container>
      )}
    </Container>
  );
};

export default Home;