import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Box, Button, Text } from '@chakra-ui/react'
import { injected } from 'utils/connectors'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { formatAddress } from 'utils/helpers'
import { withTheme } from '@emotion/react'


const BuythisNFT = () => {

    const { chainId, account, activate, deactivate, setError, active, library, connector } = useWeb3React<Web3Provider>()

    const onClickBuy = () => {
        activate(injected, (error) => {
            if (error instanceof UserRejectedRequestError) {
                // ignore user rejected error
                console.log("user refused")
            } else {
                setError(error)
            }
        }, false)
    }

    const onClickDisconnect = () => {
        deactivate()
    }

    useEffect(() => {
        console.log(chainId, account, active, library, connector)
    })

    return (
        <div>
            <Box>
                {/* <Button tag="a" color={'white'} w='40%' wideMobile href="https://github.com/cruip/> */}
                <a href="http://localhost:3000/demos/dapp/">
                // <Button type="button" backgroundColor="#6163FF" color={'white'} w='40%' alignContent={'center'} onClick={onClickBuy}>
                        Buy this NFT!
                    </Button>
                </a>
            </Box>
        </div >
    )
}

export default BuythisNFT
