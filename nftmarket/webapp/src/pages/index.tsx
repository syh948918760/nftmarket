// src/pages/samplenft.tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, Heading } from "@chakra-ui/layout"
import ConnectMetamask from 'components/ConnectMetamask'
import BuythisNFT from 'components/BuythisNFT'
import CardERC721 from 'components/CardERC721'
import { BigNumber } from 'ethers'


const nftAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const tokenId = BigNumber.from(1)
const SampleNFTPage: NextPage = () => {

    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
            </Head>

            <Heading as="h3" my={4} color='white'>Fragments</Heading>

            {/* <ConnectMetamask /> */}

            <div>
                <BuythisNFT />

            </div>


            <VStack>
                <CardERC721 addressContract={nftAddress} tokenId={tokenId} ></CardERC721>
            </VStack>

            {/* <div>
                <Image
                    src={require('../assets/images/1.jpg')}
                    // src={require('./../../assets/images/1.jpg')}
                    alt="Features tile icon 01"
                    width={250}
                    height={250} className={undefined} />
            </div> */}

            <div>

            </div>

            <h1>

            </h1>
            <h1>

            </h1>
            <h1>

            </h1>
        </>
    )
}

export default SampleNFTPage
