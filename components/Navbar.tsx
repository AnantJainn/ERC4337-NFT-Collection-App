import { Avatar, Container, Flex, Text, useToast } from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useContract,
  useClaimToken,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { TOKEN_ADDRESS } from "../constant/addresses";

export default function Navbar() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const toast = useToast();

  const { contract: erc20Contract } = useContract(TOKEN_ADDRESS);
  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useTokenBalance(erc20Contract, address);
  const {
    mutate: claimTokens,
    isLoading,
    error,
  } = useClaimToken(erc20Contract);

  const [tokensClaimed, setTokensClaimed] = useState(false);
  useEffect(() => {
    if (address && tokenBalance?.displayValue === "0.0") {
      const claim = async () => {
        try {
          await claimTokens({ to: address, amount: 10 });
          setTokensClaimed(true);
          toast({
            title: "Tokens Claimed!",
            description: "You have successfully claimed ERC-20 tokens.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (err) {
          const errorMessage = (err as Error).message;
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
  }, [address, claimTokens, toast, tokensClaimed, tokenBalance]);

  return (
    <Container maxW={"1200px"} py={5}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }} // Flex direction based on screen size
      >
        <Text fontWeight={"bold"} fontSize={{ base: 20, md: 30 }}>
          {" "}
          {/* Font size based on screen size */}
          Raindrops X
        </Text>
        <Flex alignItems="center">
          {!address ? (
            <ConnectWallet
              className={styles.walletButton}
              btnTitle="Sign In"
              theme="light"
            />
          ) : (
            <>
              <Link href={`/profile/${address}`} passHref>
                <Text
                  mr={{ base: 0, md: 4 }}
                  mb={{ base: 2, md: 0 }}
                  cursor="pointer"
                >
                  {" "}
                  {/* Margin based on screen size */}
                  Profile
                </Text>
              </Link>
              <Text
                mr={{ base: 0, md: 4 }}
                mb={{ base: 2, md: 0 }}
                cursor="pointer"
                onClick={disconnect}
              >
                {" "}
                {/* Margin based on screen size */}
                Sign Out
              </Text>
              <Avatar
                size={"sm"}
                src={`https://avatars.dicebear.com/api/avataaars/${address}.svg`}
              />
            </>
          )}
          <Text fontSize={{ base: 12, md: 20 }} ml={{ base: 2, md: 4 }}>
            {" "}
            {/* Font size and margin based on screen size */}
            Token Balance: {tokenBalance?.displayValue}
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
}
