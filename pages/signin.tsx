import {
  Container,
  Flex,
  Text,
  useToast,
  Button,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Retrieve the stored item value for the email
    const item = localStorage.getItem(email);

    if (!item) {
      // If no item is found for the email, redirect to sign-up
      router.push("/signup");
      return;
    }

    try {
      // Check user details using the `/details` API
      const response = await axios.post(
        "https://ap-south-1.aws.data.mongodb-api.com/app/bharat-ethers-wiilw/endpoint/accounts/minter/details",
        {
          data: {
            user: item,
          },
          srvc: "693a487dff92410b83df70894bc1b1dc1",
        },
        {
          headers: {
            Authorization: "2498e00cf1624c19bbe7b5f2faff55875",
          },
        }
      );

      if (response.data.stat && response.data.data.user.mail === email) {
        toast({
          title: "Signed In!",
          description: "You have successfully signed in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log("sign in", response);
        router.push("/");
      } else {
        router.push("/signup");
      }
      // } catch (error) {
      //   toast({
      //     title: "Error",
      //     description: "Failed to sign in: " + error.message,
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      // }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: "Failed to sign in: " + error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container
      maxW={"100vw"}
      py={5}
      backgroundColor="#E6E6FA"
      minHeight="100vh"
    >
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection="column"
          padding={10}
          paddingTop={1}
          backgroundColor="#FFF"
          boxShadow="lg"
          borderRadius="md"
          width="400px"
          maxWidth="700px"
          minHeight="70vh"
        >
          <Text fontWeight={"bold"} fontSize={30} mb={5} mt={1} color="#4B0082">
            Sign In
          </Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={3}
            borderColor="#4B0082"
            height="50px"
          />
          <Button
            onClick={handleSignIn}
            backgroundColor="#4B0082"
            color="#FFF"
            height="50px"
            fontSize="18px"
            _hover={{ backgroundColor: "#6A0DAD" }}
            width="100%"
          >
            Sign In
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
