# ethers-signux
Realize new UX with signing and validating by ethers.js

** ethers.js ** is the popular web3 library of javascript that can make signature and verify it.
However, it's complex to use it because it have many funcitons and there are little documents.

** ethers-signux ** makes you easy to sign and verify with ethers.js.

## Usage ℹ️

For example, AWS Lambda function.

### sign

```
const ethers = require("ethers");
const sigEthers = require("@yamapyblack/ethers-signux");

exports.handler = async (event) => {
    const privateKey = "......" // set private key
    const types = ["address"];
    const values = ["0x12fA9a179f1db2a97052CcbFD7a4AAAA91Fef780"];

    const signer = new ethers.Wallet(privateKey)
    
    const signature = await sigEthers.signMessageParameters(signer, types, values)
    return signature
};
```

### validate

```
const ethers = require("ethers");
const sigEthers = require("@yamapyblack/ethers-signux");

exports.handler = async (event) => {
    const signature = "..."; // set signature string
    const types = ["address"];
    const values = ["0x12fA9a179f1db2a97052CcbFD7a4AAAA91Fef780"];
    
    const signerAddress = sigEthers.recoverParameters(types, values, signature)

    return signerAddress
};
```

That's all.
