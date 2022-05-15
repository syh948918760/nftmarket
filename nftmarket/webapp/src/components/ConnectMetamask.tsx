import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { Box, Button, Text } from '@chakra-ui/react'
import { injected } from 'utils/connectors'
import { UserRejectedRequestError } from '@web3-react/injected-connector'
import { formatAddress } from 'utils/helpers'
import { withTheme } from '@emotion/react'

// import '../assets/scss/settings/base/_colors.scss'


const ConnectMetamask = () => {

    const { chainId, account, activate, deactivate, setError, active, library, connector } = useWeb3React<Web3Provider>()

    const onClickConnect = () => {
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
            {active && typeof account === 'string' ? (
                <Box>
                    <Button type="button" w='100%' onClick={onClickDisconnect}>
                        Account: {formatAddress(account, 4)}
                    </Button>
                    <Text fontSize="sm" w='100%' my='2' align='center'>ChainID: {chainId} connected</Text>
                </Box>
            ) : (
                <Box>
                    <Button type="button" backgroundColor="#6163FF" color={'white'} w='100%' onClick={onClickConnect}>
                        Connect MetaMask
                    </Button>
                    <Text fontSize="sm" w='100%' my='2' align='center' color={'white'}> not connected </Text>
                </Box>

            )
            }
        </div >
    )
}

export default ConnectMetamask
