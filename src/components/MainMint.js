import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import RoboPunksNFT from "../RoboPunksNFT.json";

const roboPunksNFTAddress = "0xfACCb53C4dFccd661a49CC8330a3735DC4AD14b4";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        RoboPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
            value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="275px">
      <Box
        width="520px"
        backgroundColor="#D6517D"
        boxShadow="0px 2px 2px 1px #0F0F0F"
        borderRadius="5px"
      >
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            Can the RoboPunks NFT save humans from destructive rampant NFT
            speculation? Mint RoboPunks to find out.
          </Text>
        </div>
        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <button className="buttonStyle" onClick={handleDecrement}>-</button>
              <input type="number" value={mintAmount} />
              <button onClick={handleIncrement}>+</button>
            </Flex>
            <button onClick={handleMint}>Mint Now</button>
          </div>
        ) : (
          <p>You must be connected to Mint.</p>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
