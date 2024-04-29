import { Avatar, Container, Flex, Text, useToast } from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useContract,
  useClaimToken,
} from "@thirdweb-dev/react";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { TOKEN_ADDRESS } from "../constant/addresses";
export default function Navbar() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const toast = useToast();

  // Fetch ERC-20 contract
  const { contract: erc20Contract } = useContract(TOKEN_ADDRESS);

  // Claim ERC-20 tokens
  const {
    mutate: claimTokens,
    isLoading,
    error,
  } = useClaimToken(erc20Contract);

  useEffect(() => {
    if (address) {
      const claim = async () => {
        try {
          await claimTokens({ to: address, amount: 20 });
          toast({
            title: "Tokens Claimed!",
            description: "You have successfully claimed ERC-20 tokens.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (err) {
          const errorMessage = (err as Error).message; // Type assertion
          toast({
            title: "Error",
            description: "Failed to claim tokens: " + errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };

      claim();
    }
  }, [address, claimTokens, toast]);
  return (
    <Container maxW={"1200px"} py={5}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={30}>
          Raindrops X
        </Text>
        {!address ? (
          <ConnectWallet
            className={styles.walletButton}
            btnTitle="Sign In"
            theme="light"
          />
        ) : (
          <Flex alignItems="center">
            <Link href={`/profile/${address}`} passHref>
              <Text mr={4} cursor="pointer">
                Profile
              </Text>
            </Link>
            <Text mr={4} cursor="pointer" onClick={disconnect}>
              Sign Out
            </Text>
            <Avatar
              size={"sm"}
              src={`https://avatars.dicebear.com/api/avataaars/${address}.svg`}
            />
          </Flex>
        )}
      </Flex>
    </Container>
  );
}
