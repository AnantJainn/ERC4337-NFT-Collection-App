import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useNFT,
} from "@thirdweb-dev/react";
import { NFT_ADDRESS } from "../constant/addresses";

type Props = {
  tokenId: string;
};

const NFTCard: React.FC<Props> = ({ tokenId }) => {
  const address = useAddress();
  const { contract: nftContract } = useContract(NFT_ADDRESS);
  const { data } = useNFT(nftContract, tokenId);

  const imageContainerStyle = {
    backgroundColor: "#DDD8FC",
    borderRadius: "12px 12px 0 0",
    overflow: "hidden",
  };

  const contentContainerStyle: React.CSSProperties = {
    backgroundColor: "#202020",
    borderRadius: "0 0 12px 12px",
    padding: "20px",
    textAlign: "center",
    height: "200px", // Fixed height for uniformity
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const headingStyle = {
    color: "#FFF",
    fontSize: "1.6rem",
    margin: "8px 0",
  };

  const descriptionStyle = {
    color: "#FFF",
    fontSize: "1.4rem",
    margin: "0 0 16px 0",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3, // Limit to 3 lines
    // WebkitBoxOrient: "vertical",
  };

  const buttonStyle = {
    backgroundColor: "#6C5DD3",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  };

  return (
    <Box
      borderRadius="12px"
      border="1px solid #CCCCCC"
      width="100%"
      maxWidth="300px"
      margin="0 auto"
      overflow="hidden"
    >
      <Box style={imageContainerStyle}>
        <img
          src={data?.metadata?.image || ""}
          alt={data?.metadata?.name?.toString() || ""}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
      </Box>
      <Box style={contentContainerStyle}>
        <Heading as="h1" style={headingStyle}>
          {data?.metadata.name}
        </Heading>
        <Text style={descriptionStyle}>{data?.metadata.description}</Text>
        {!address ? (
          <Text color="#FFF">Connect to claim</Text>
        ) : (
          <Web3Button
            contractAddress={NFT_ADDRESS}
            action={() => nftContract?.erc1155?.claim(tokenId, 1)}
            style={buttonStyle}
          >
            Claim NFT
          </Web3Button>
        )}
      </Box>
    </Box>
  );
};

export default NFTCard;
