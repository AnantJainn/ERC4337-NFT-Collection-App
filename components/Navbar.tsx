import { Avatar, Container, Flex, Text, useToast } from "@chakra-ui/react";
import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useContract,
  useClaimToken,
  useTokenBalance,
  // useReadContract,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { TOKEN_ADDRESS } from "../constant/addresses";
// import { resolveMethod } from "thirdweb";
export default function Navbar() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const toast = useToast();

  const { contract: erc20Contract } = useContract(TOKEN_ADDRESS);
  const { data: tokenBalance, isLoading: isTokenBalanceLoading } =
    useTokenBalance(erc20Contract, address);
  // Claim ERC-20 tokens
  const {
    mutate: claimTokens,
    isLoading,
    error,
  } = useClaimToken(erc20Contract);

  // State to track if tokens have been claimed for the current user
  const [tokensClaimed, setTokensClaimed] = useState(false);
  // useEffect(() => {
  //   if (address && !tokensClaimed) {
  //     // Check if address is available and tokens haven't been claimed yet
  //     const claim = async () => {
  //       try {
  //         await claimTokens({ to: address, amount: 20 });
  //         setTokensClaimed(true); // Update state to indicate tokens have been claimed
  //         toast({
  //           title: "Tokens Claimed!",
  //           description: "You have successfully claimed ERC-20 tokens.",
  //           status: "success",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       } catch (err) {
  //         const errorMessage = (err as Error).message; // Type assertion
  //         toast({
  //           title: "Error",
  //           description: "Failed to claim tokens: " + errorMessage,
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     };

  //     claim();
  //   }
  // }, [address, claimTokens, toast, tokensClaimed]);
  // useEffect(() => {
  //   if (address && tokenBalance?.displayValue === "0") {
  //     console.log("tb", tokenBalance);
  //     // Check if address is available, tokens haven't been claimed yet,
  //     // and token balance is zero
  //     const claim = async () => {
  //       try {
  //         await claimTokens({ to: address, amount: 20 });
  //         setTokensClaimed(true); // Update state to indicate tokens have been claimed
  //         toast({
  //           title: "Tokens Claimed!",
  //           description: "You have successfully claimed ERC-20 tokens.",
  //           status: "success",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       } catch (err) {
  //         const errorMessage = (err as Error).message; // Type assertion
  //         toast({
  //           title: "Error",
  //           description: "Failed to claim tokens: " + errorMessage,
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     };

  //     claim();
  //   }
  // }, [address, claimTokens, toast, tokensClaimed, tokenBalance]);
  useEffect(() => {
    console.log("address:", address);
    console.log("tokenBalance:", tokenBalance);
    if (address && tokenBalance?.displayValue === "0.0") {
      console.log("Claiming tokens...");
      // Check if address is available, tokens haven't been claimed yet,
      // and token balance is zero
      const claim = async () => {
        try {
          await claimTokens({ to: address, amount: 10 });
          setTokensClaimed(true); // Update state to indicate tokens have been claimed
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
  }, [address, claimTokens, toast, tokensClaimed, tokenBalance]);

  return (
    <Container maxW={"1200px"} py={5}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"} fontSize={30}>
          Raindrops X
        </Text>
        <Text fontSize={20}>Token Balance: {tokenBalance?.displayValue}</Text>
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
