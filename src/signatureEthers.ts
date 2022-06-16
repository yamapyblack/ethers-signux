import { ethers, Signer } from 'ethers'

export const signMessageParameters = async(signer: Signer, types: string[], values: any[]) :Promise<string> => {
    return await signMessage(signer, encodeParameters(types, values))
}

export const signMessage = async(signer: Signer, encodedData: string) :Promise<string> => {
    const encodedDataBytes = ethers.utils.arrayify(encodedData);
    return await signer.signMessage(encodedDataBytes)
}

export const recoverParameters = (types: string[], values: any[], signature: string) :string => {
    return recover(encodeParameters(types, values), signature)
}

export const recover = (encodedData: string, signature: string) :string => {
    const encodedDataBytes = ethers.utils.arrayify(encodedData);
    const hashMsg = ethers.utils.hashMessage(encodedDataBytes)
    return ethers.utils.recoverAddress(hashMsg, "0x" + signature);
}

export const encodeParameters = (types: string[], values: any[]) :string => {
    const abi = new ethers.utils.AbiCoder()
    return ethers.utils.keccak256(abi.encode(types, values))
}
