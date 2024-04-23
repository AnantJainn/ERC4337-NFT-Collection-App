// import {
//   Avatar,
//   Container,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Text,
// } from "@chakra-ui/react";
// import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
// import styles from "../styles/Home.module.css";
// import Link from "next/link";

// export default function Navbar() {
//   const address = useAddress();
//   const disconnect = useDisconnect();

//   return (
//     <Container maxW={"1200px"} py={5}>
//       <Flex justifyContent={"space-between"} alignItems={"center"}>
//         <Text fontWeight={"bold"}>Raindrops X</Text>
//         {!address ? (
//           <ConnectWallet
//             className={styles.walletButton}
//             btnTitle="Sign In"
//             theme="light"
//           />
//         ) : (
//           <Menu>
//             <MenuButton>
//               <Avatar
//                 size={"sm"}
//                 src={`https://avatars.dicebear.com/api/avataaars/${address}.svg`}
//               />
//             </MenuButton>
//             <MenuList>
//               <MenuItem>
//                 <Link href={`/profile/${address}`}>Profile</Link>
//               </MenuItem>
//               <MenuItem onClick={disconnect}>Sign Out</MenuItem>
//             </MenuList>
//           </Menu>
//         )}
//       </Flex>
//     </Container>
//   );
// }
import { Avatar, Container, Flex, Text } from "@chakra-ui/react";
import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Navbar() {
  const address = useAddress();
  const disconnect = useDisconnect();

  return (
    <Container maxW={"1200px"} py={5}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontWeight={"bold"}>Raindrops X</Text>
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
