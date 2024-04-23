import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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
  const { contract } = useContract(NFT_ADDRESS);
  const { data } = useNFT(contract, tokenId);

  const imageContainerStyle = {
    backgroundColor: "#DDD8FC", // Background color for the image section
    borderRadius: "12px 12px 0 0", // Rounded corners only at the top
    overflow: "hidden", // Hide any overflow
  };

  const contentContainerStyle = {
    backgroundColor: "#202020", // Background color for the content section
    borderRadius: "0 0 12px 12px", // Rounded corners only at the bottom
    padding: "20px", // Added padding for spacing
    textAlign: "center", // Center the text
  };

  const headingStyle = {
    color: "#FFF",
    fontSize: "1.6rem",
    margin: "8px 0", // Added top and bottom margin
  };

  const descriptionStyle = {
    color: "#FFF",
    fontSize: "1.4rem",
    margin: "0 0 16px 0", // Added bottom margin
    height: "4em",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
      border="1px solid #CCCCCC" // Gray border color
      width="300px" // Reduced width
      marginBottom="20px"
      overflow="hidden"
    >
      <Box style={imageContainerStyle}>
        <img
          src={data?.metadata.image}
          alt={data?.metadata.name}
          style={{ width: "100%", height: "300px", objectFit: "cover" }} // Reduced height
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
            action={() => contract.erc1155.claim(tokenId, 1)}
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
