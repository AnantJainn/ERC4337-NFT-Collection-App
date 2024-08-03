import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../../constant/addresses";
import React from "react";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const address = useAddress();
  const { contract } = useContract(NFT_ADDRESS);

  const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs(
    contract,
    address
  );

  const [transferAddress, setTransferAddress] = React.useState("");

  const toast = useToast();
  return (
    <Container maxW={"1200px"} mt={10}>
      <Button onClick={() => router.push("/")}>Back</Button>
      <Heading mt={10}>Profile</Heading>
      <Box mt={10}>
        <Text fontWeight={"bold"}>My Elements:</Text>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={6} my={4}>
          {!loadingOwnedNFTs &&
            ownedNFTs?.map((nft, index) => (
              <Card
                key={index}
                overflow={"hidden"}
                p={4}
                bg="#DDD8FC"
                borderRadius="lg"
              >
                <MediaRenderer
                  src={nft.metadata.image}
                  height="200px"
                  width="100%"
                  // borderRadius="md"
                />
                <Flex
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mt={3}
                >
                  <Text fontWeight={"bold"}>{nft.metadata.name}</Text>
                  <Text>Qty: {nft.quantityOwned}</Text>
                </Flex>
              </Card>
            ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
