
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManagement {
    struct User {
        bytes32 publicKey;
        bool isRegistered;
    }

    mapping(address => User) private users;

    event UserRegistered(address indexed userAddress, bytes32 publicKey);

    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User is not registered");
        _;
    }

    function registerUser(address userAddress, bytes32 publicKey) external {
        require(!users[userAddress].isRegistered, "User already registered");

        users[userAddress].publicKey = publicKey;
        users[userAddress].isRegistered = true;

        emit UserRegistered(userAddress, publicKey);
    }

    function getUserPublicKey(address userAddress) external view returns (bytes32) {
        return users[userAddress].publicKey;
    }

    function isRegisteredUser(address userAddress) external view returns (bool) {
        return users[userAddress].isRegistered;
    }
}
