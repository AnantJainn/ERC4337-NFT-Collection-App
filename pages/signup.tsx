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

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const toast = useToast();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!name || !email || !mobile) {
      toast({
        title: "Error",
        description: "Name, Email, and Mobile are required",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Generate a new unique item
    const item = [...Array(33)]
      .map(() => Math.random().toString(36)[2])
      .join("");

    try {
      // Sign up using the `/new` API
      const response = await axios.post(
        "https://ap-south-1.aws.data.mongodb-api.com/app/bharat-ethers-wiilw/endpoint/accounts/minter/new",
        {
          data: {
            user: {
              name,
              mail: email,
              mobile,
              item,
            },
          },
          srvc: "693a487dff92410b83df70894bc1b1dc1",
        },
        {
          headers: {
            Authorization: "2498e00cf1624c19bbe7b5f2faff55875",
          },
        }
      );

      if (response.data.stat) {
        // Save the item value (you might want to store this in a database or local storage)
        localStorage.setItem(email, item);

        toast({
          title: "Sign Up Successful!",
          description: "You have successfully signed up.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: "Failed to sign up.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign up: " + error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
            Sign Up
          </Text>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={3}
            borderColor="#4B0082"
            height="50px"
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={3}
            borderColor="#4B0082"
            height="50px"
          />
          <Input
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            mb={3}
            borderColor="#4B0082"
            height="50px"
          />
          <Button
            onClick={handleSignUp}
            backgroundColor="#4B0082"
            color="#FFF"
            height="50px"
            fontSize="18px"
            _hover={{ backgroundColor: "#6A0DAD" }}
            width="100%"
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
