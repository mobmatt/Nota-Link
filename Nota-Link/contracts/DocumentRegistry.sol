// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


interface IUserManagement {
    function isRegisteredUser(address userAddress) external view returns (bool);
    // Add other function declarations from the UserManagement contract here
}

contract DocumentRegistry {
    struct Document {
        address sender;      // Address of the user initiating the notarization
        address firstSigner; // Address of the first signer
        address secondSigner;// Address of the second signer
        string title;
        string contentHash;  // Hash of the file content
        uint256 creationDate;
        bool exists;
        bool firstSigned;
        bool secondSigned;
    }

    address public userManagementContract;
    IUserManagement private userManagement;

    constructor(address _userManagementContract) {
        userManagementContract = _userManagementContract;
        userManagement = IUserManagement(_userManagementContract);
    }

    mapping(bytes32 => Document) private documents;

    event DocumentNotarized(address indexed sender, address indexed firstSigner, address indexed secondSigner, bytes32 documentHash, string title);
    event DocumentSigned(address indexed signer, bytes32 indexed documentHash);

function initiateNotarization(address firstSigner, address secondSigner, string memory title, string memory contentHash) external returns (bytes32) {
      require(userManagement.isRegisteredUser(msg.sender), "Sender is not a registered user");
        require(userManagement.isRegisteredUser(firstSigner), "First signer is not a registered user");
        require(userManagement.isRegisteredUser(secondSigner), "Second signer is not a registered user");

    bytes32 documentHash = keccak256(abi.encodePacked(msg.sender, firstSigner, secondSigner, title, contentHash));

    require(!documents[documentHash].exists, "Document already exists");

    documents[documentHash] = Document({
        sender: msg.sender,
        firstSigner: firstSigner,
        secondSigner: secondSigner,
        title: title,
        contentHash: contentHash,
        creationDate: block.timestamp,
        exists: true,
        firstSigned: false,
        secondSigned: false
    });

    emit DocumentNotarized(msg.sender, firstSigner, secondSigner, documentHash, title);

    return documentHash;
}





    function signDocument(bytes32 documentHash) external {
        Document storage doc = documents[documentHash];

        require(doc.exists, "Document does not exist");
        require((msg.sender == doc.firstSigner || msg.sender == doc.secondSigner), "You are not authorized to sign this document");
        
        if (msg.sender == doc.firstSigner) {
            require(!doc.firstSigned, "You have already signed this document");
            doc.firstSigned = true;
        } else if (msg.sender == doc.secondSigner) {
            require(!doc.secondSigned, "You have already signed this document");
            doc.secondSigned = true;
        }

        emit DocumentSigned(msg.sender, documentHash);
    }

    function getDocument(bytes32 documentHash) external view returns (address sender, address firstSigner, address secondSigner, string memory title, string memory contentHash, bool firstSigned, bool secondSigned) {
        Document memory doc = documents[documentHash];
        require(doc.exists, "Document does not exist");

        return (doc.sender, doc.firstSigner, doc.secondSigner, doc.title, doc.contentHash, doc.firstSigned, doc.secondSigned);
    }
}
