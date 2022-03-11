"use strict";
exports.id = 416;
exports.ids = [416];
exports.modules = {

/***/ 416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Web3Container)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "web3"
var external_web3_ = __webpack_require__(519);
var external_web3_default = /*#__PURE__*/__webpack_require__.n(external_web3_);
;// CONCATENATED MODULE: ./lib/getWeb3.js

const resolveWeb3 = (resolve)=>{
    let { web3  } = window;
    const alreadyInjected = typeof web3 !== 'undefined' // i.e. Mist/Metamask
    ;
    const localProvider = `http://localhost:9545`;
    if (alreadyInjected) {
        console.log(`Injected web3 detected.`);
        web3 = new (external_web3_default())(web3.currentProvider);
    } else {
        console.log(`No web3 instance injected, using Local web3.`);
        const provider = new (external_web3_default()).providers.HttpProvider(localProvider);
        web3 = new (external_web3_default())(provider);
    }
    resolve(web3);
};
/* harmony default export */ const getWeb3 = (()=>new Promise((resolve)=>{
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener(`load`, ()=>{
            resolveWeb3(resolve);
        });
        // If document has loaded already, try to get Web3 immediately.
        if (document.readyState === `complete`) {
            resolveWeb3(resolve);
        }
    }));

;// CONCATENATED MODULE: ./lib/getContract.js
const getContractInstance = async (web3, contractDefinition)=>{
    // get network ID and the deployed address
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contractDefinition.networks[networkId].address;
    // create the instance
    const instance = new web3.eth.Contract(contractDefinition.abi, deployedAddress);
    return instance;
};
/* harmony default export */ const getContract = (getContractInstance);

;// CONCATENATED MODULE: ../build/contracts/SimpleStorage.json
const SimpleStorage_namespaceObject = JSON.parse('{"contractName":"SimpleStorage","abi":[{"constant":false,"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],"metadata":"{\\"compiler\\":{\\"version\\":\\"0.5.16+commit.9c3226ce\\"},\\"language\\":\\"Solidity\\",\\"output\\":{\\"abi\\":[{\\"constant\\":true,\\"inputs\\":[],\\"name\\":\\"get\\",\\"outputs\\":[{\\"internalType\\":\\"uint256\\",\\"name\\":\\"\\",\\"type\\":\\"uint256\\"}],\\"payable\\":false,\\"stateMutability\\":\\"view\\",\\"type\\":\\"function\\"},{\\"constant\\":false,\\"inputs\\":[{\\"internalType\\":\\"uint256\\",\\"name\\":\\"x\\",\\"type\\":\\"uint256\\"}],\\"name\\":\\"set\\",\\"outputs\\":[],\\"payable\\":false,\\"stateMutability\\":\\"nonpayable\\",\\"type\\":\\"function\\"}],\\"devdoc\\":{\\"methods\\":{}},\\"userdoc\\":{\\"methods\\":{}}},\\"settings\\":{\\"compilationTarget\\":{\\"project:/contracts/SimpleStorage.sol\\":\\"SimpleStorage\\"},\\"evmVersion\\":\\"istanbul\\",\\"libraries\\":{},\\"optimizer\\":{\\"enabled\\":true,\\"runs\\":200},\\"remappings\\":[]},\\"sources\\":{\\"project:/contracts/SimpleStorage.sol\\":{\\"keccak256\\":\\"0xef6f7933e758815c598659db6dc20f64ed77671e4f9723170ba7d550bb4946bd\\",\\"urls\\":[\\"bzz-raw://51a180d66e5edd556e29e02cba24b0bc6e04d3a27028bb2f695f522b018e9522\\",\\"dweb:/ipfs/QmT1KfuMbjravZjEr2ZxgKfPwmdj7jsfBGnywkCVQmWcZ1\\"]}},\\"version\\":1}","bytecode":"0x6080604052348015600f57600080fd5b5060ab8061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea265627a7a72315820d2377b1e9f822c0fbee03884c15ed0a0cf024121753f00c2707ca986f1f78aa564736f6c63430005100032","deployedBytecode":"0x6080604052348015600f57600080fd5b506004361060325760003560e01c806360fe47b11460375780636d4ce63c146053575b600080fd5b605160048036036020811015604b57600080fd5b5035606b565b005b60596070565b60408051918252519081900360200190f35b600055565b6000549056fea265627a7a72315820d2377b1e9f822c0fbee03884c15ed0a0cf024121753f00c2707ca986f1f78aa564736f6c63430005100032","sourceMap":"26:176:1:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:176:1;;;;;;;","deployedSourceMap":"26:176:1:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:176:1;;;;;;;;;;;;;;;;;;;;;;;;73:53;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;73:53:1;;:::i;:::-;;130:70;;;:::i;:::-;;;;;;;;;;;;;;;;73:53;107:10;:14;73:53::o;130:70::-;166:4;185:10;130:70;:::o","source":"\\npragma solidity ^0.5.5;\\n\\ncontract SimpleStorage {\\n  uint storedData;\\n\\n  function set(uint x) public {\\n    storedData = x;\\n  }\\n\\n  function get() public view returns (uint) {\\n    return storedData;\\n  }\\n}\\n","sourcePath":"/home/park/a/const/우리꺼/contracts/SimpleStorage.sol","ast":{"absolutePath":"project:/contracts/SimpleStorage.sol","exportedSymbols":{"SimpleStorage":[79]},"id":80,"nodeType":"SourceUnit","nodes":[{"id":58,"literals":["solidity","^","0.5",".5"],"nodeType":"PragmaDirective","src":"1:23:1"},{"baseContracts":[],"contractDependencies":[],"contractKind":"contract","documentation":null,"fullyImplemented":true,"id":79,"linearizedBaseContracts":[79],"name":"SimpleStorage","nodeType":"ContractDefinition","nodes":[{"constant":false,"id":60,"name":"storedData","nodeType":"VariableDeclaration","scope":79,"src":"53:15:1","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":59,"name":"uint","nodeType":"ElementaryTypeName","src":"53:4:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"},{"body":{"id":69,"nodeType":"Block","src":"101:25:1","statements":[{"expression":{"argumentTypes":null,"id":67,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"argumentTypes":null,"id":65,"name":"storedData","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":60,"src":"107:10:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"argumentTypes":null,"id":66,"name":"x","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":62,"src":"120:1:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"107:14:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":68,"nodeType":"ExpressionStatement","src":"107:14:1"}]},"documentation":null,"id":70,"implemented":true,"kind":"function","modifiers":[],"name":"set","nodeType":"FunctionDefinition","parameters":{"id":63,"nodeType":"ParameterList","parameters":[{"constant":false,"id":62,"name":"x","nodeType":"VariableDeclaration","scope":70,"src":"86:6:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":61,"name":"uint","nodeType":"ElementaryTypeName","src":"86:4:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"85:8:1"},"returnParameters":{"id":64,"nodeType":"ParameterList","parameters":[],"src":"101:0:1"},"scope":79,"src":"73:53:1","stateMutability":"nonpayable","superFunction":null,"visibility":"public"},{"body":{"id":77,"nodeType":"Block","src":"172:28:1","statements":[{"expression":{"argumentTypes":null,"id":75,"name":"storedData","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":60,"src":"185:10:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"functionReturnParameters":74,"id":76,"nodeType":"Return","src":"178:17:1"}]},"documentation":null,"id":78,"implemented":true,"kind":"function","modifiers":[],"name":"get","nodeType":"FunctionDefinition","parameters":{"id":71,"nodeType":"ParameterList","parameters":[],"src":"142:2:1"},"returnParameters":{"id":74,"nodeType":"ParameterList","parameters":[{"constant":false,"id":73,"name":"","nodeType":"VariableDeclaration","scope":78,"src":"166:4:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":72,"name":"uint","nodeType":"ElementaryTypeName","src":"166:4:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":null,"visibility":"internal"}],"src":"165:6:1"},"scope":79,"src":"130:70:1","stateMutability":"view","superFunction":null,"visibility":"public"}],"scope":80,"src":"26:176:1"}],"src":"1:202:1"},"legacyAST":{"attributes":{"absolutePath":"project:/contracts/SimpleStorage.sol","exportedSymbols":{"SimpleStorage":[79]}},"children":[{"attributes":{"literals":["solidity","^","0.5",".5"]},"id":58,"name":"PragmaDirective","src":"1:23:1"},{"attributes":{"baseContracts":[null],"contractDependencies":[null],"contractKind":"contract","documentation":null,"fullyImplemented":true,"linearizedBaseContracts":[79],"name":"SimpleStorage","scope":80},"children":[{"attributes":{"constant":false,"name":"storedData","scope":79,"stateVariable":true,"storageLocation":"default","type":"uint256","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"uint","type":"uint256"},"id":59,"name":"ElementaryTypeName","src":"53:4:1"}],"id":60,"name":"VariableDeclaration","src":"53:15:1"},{"attributes":{"documentation":null,"implemented":true,"isConstructor":false,"kind":"function","modifiers":[null],"name":"set","scope":79,"stateMutability":"nonpayable","superFunction":null,"visibility":"public"},"children":[{"children":[{"attributes":{"constant":false,"name":"x","scope":70,"stateVariable":false,"storageLocation":"default","type":"uint256","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"uint","type":"uint256"},"id":61,"name":"ElementaryTypeName","src":"86:4:1"}],"id":62,"name":"VariableDeclaration","src":"86:6:1"}],"id":63,"name":"ParameterList","src":"85:8:1"},{"attributes":{"parameters":[null]},"children":[],"id":64,"name":"ParameterList","src":"101:0:1"},{"children":[{"children":[{"attributes":{"argumentTypes":null,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"operator":"=","type":"uint256"},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":60,"type":"uint256","value":"storedData"},"id":65,"name":"Identifier","src":"107:10:1"},{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":62,"type":"uint256","value":"x"},"id":66,"name":"Identifier","src":"120:1:1"}],"id":67,"name":"Assignment","src":"107:14:1"}],"id":68,"name":"ExpressionStatement","src":"107:14:1"}],"id":69,"name":"Block","src":"101:25:1"}],"id":70,"name":"FunctionDefinition","src":"73:53:1"},{"attributes":{"documentation":null,"implemented":true,"isConstructor":false,"kind":"function","modifiers":[null],"name":"get","scope":79,"stateMutability":"view","superFunction":null,"visibility":"public"},"children":[{"attributes":{"parameters":[null]},"children":[],"id":71,"name":"ParameterList","src":"142:2:1"},{"children":[{"attributes":{"constant":false,"name":"","scope":78,"stateVariable":false,"storageLocation":"default","type":"uint256","value":null,"visibility":"internal"},"children":[{"attributes":{"name":"uint","type":"uint256"},"id":72,"name":"ElementaryTypeName","src":"166:4:1"}],"id":73,"name":"VariableDeclaration","src":"166:4:1"}],"id":74,"name":"ParameterList","src":"165:6:1"},{"children":[{"attributes":{"functionReturnParameters":74},"children":[{"attributes":{"argumentTypes":null,"overloadedDeclarations":[null],"referencedDeclaration":60,"type":"uint256","value":"storedData"},"id":75,"name":"Identifier","src":"185:10:1"}],"id":76,"name":"Return","src":"178:17:1"}],"id":77,"name":"Block","src":"172:28:1"}],"id":78,"name":"FunctionDefinition","src":"130:70:1"}],"id":79,"name":"ContractDefinition","src":"26:176:1"}],"id":80,"name":"SourceUnit","src":"1:202:1"},"compiler":{"name":"solc","version":"0.5.16+commit.9c3226ce.Emscripten.clang"},"networks":{"5777":{"events":{},"links":{},"address":"0x30655A23d494Cc987e1491e7c79364a69fBac6e1","transactionHash":"0xf00b3b951c797c1e7d7aac641eb3bb1267a14c23ef01d81a9bd435a9d56914e1"}},"schemaVersion":"3.4.5","updatedAt":"2022-02-28T08:24:45.729Z","networkType":"ethereum","devdoc":{"methods":{}},"userdoc":{"methods":{}}}');
;// CONCATENATED MODULE: ./lib/Web3Container.js




class Web3Container extends (external_react_default()).Component {
    state = {
        web3: null,
        accounts: null,
        contract: null
    };
    async componentDidMount() {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const contract = await getContract(web3, SimpleStorage_namespaceObject);
            this.setState({
                web3,
                accounts,
                contract
            });
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.log(error);
        }
    }
    render() {
        const { web3 , accounts , contract  } = this.state;
        return web3 && accounts ? this.props.render({
            web3,
            accounts,
            contract
        }) : this.props.renderLoading();
    }
};


/***/ })

};
;