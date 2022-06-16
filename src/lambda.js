const ethers = require("ethers");
const { KmsEthersSigner } = require("aws-kms-ethers-signer");

const kmsSigner = (rpcUrl) => {
    const keyId = process.env.KMS_KEY_ID;
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const signer = new KmsEthersSigner({ keyId }).connect(provider);
    return signer;
};

const encodeParameters = (types, values) => {
    const abi = new ethers.utils.AbiCoder()
    return ethers.utils.keccak256(abi.encode(types, values))
}

exports.handler = async (event, context, callback) => {
    const uri = event.uri;
    const types = event.types;
    const values = event.values;

    const signer = kmsSigner(uri);

    const encodedData = encodeParameters(types, values)
    const encodedDataBytes = ethers.utils.arrayify(encodedData);
    const signature = await signer.signMessage(encodedDataBytes)
    return signature
    
};

const ethers = require("ethers");
const sigEthers = require("@yamapyblack/signature-ethers");

// const encodeParameters = (types, values) => {
//     const abi = new ethers.utils.AbiCoder()
//     return ethers.utils.keccak256(abi.encode(types, values))
// }

exports.handler = async (event) => {
    const uri = event.uri;
    const signature = event.signature;
    const types = event.types;
    const values = event.values;

    // const encodedData = encodeParameters(types, values)
    const encodedData = sigEthers.encodeParameters(types, values)
    const encodedDataBytes = ethers.utils.arrayify(encodedData);
    const hashMsg = ethers.utils.hashMessage(encodedDataBytes)

    //validate
    const rec = ethers.utils.recoverAddress(hashMsg, "0x" + signature);
    console.log(rec)

    return rec
};
