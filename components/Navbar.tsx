// import { Container, Flex, Text, Button } from "@chakra-ui/react";
// import { useRouter } from "next/router";
// import styles from "../styles/Home.module.css";

// export default function Navbar() {
//   const router = useRouter();

//   const handleSignInRedirect = () => {
//     router.push("/signin");
//   };
//   const handleSignUpRedirect = () => {
//     router.push("/signup");
//   };
//   return (
//     <Container maxW={"1200px"} py={5}>
//       <Flex
//         justifyContent={"space-between"}
//         alignItems={"center"}
//         flexDirection={{ base: "column", md: "row" }}
//       >
//         <Text fontWeight={"bold"} fontSize={{ base: 20, md: 30 }}>
//           Raindrops X
//         </Text>
//         <Button
//           onClick={handleSignInRedirect}
//           className={styles.walletButton}
//           theme="light"
//         >
//           Sign In
//         </Button>
//         <Button
//           onClick={handleSignUpRedirect}
//           className={styles.walletButton}
//           theme="light"
//         >
//           Sign Up
//         </Button>
//       </Flex>
//     </Container>
//   );
// }
import { Container, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleSignInRedirect = () => {
    router.push("/signin");
  };

  const handleSignUpRedirect = () => {
    router.push("/signup");
  };

  return (
    <Container maxW={"100vw"} py={5} px={10}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        width="100%"
      >
        <Text
          fontWeight={"bold"}
          fontSize={{ base: 24, md: 32 }}
          color="#4B0082"
        >
          Raindrops X
        </Text>
        <Flex gap={4}>
          <Button
            onClick={handleSignInRedirect}
            backgroundColor="#4B0082"
            color="#FFF"
            _hover={{ backgroundColor: "#6A0DAD" }}
            borderRadius="md"
          >
            Sign In
          </Button>
          <Button
            onClick={handleSignUpRedirect}
            backgroundColor="#4B0082"
            color="#FFF"
            _hover={{ backgroundColor: "#6A0DAD" }}
            borderRadius="md"
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
