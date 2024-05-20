// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./EmployeeStorage.sol";

contract NFT is ERC721Enumerable, Ownable {
    EmployeeStorage public employeeStorage;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    constructor(string memory _name, string memory _symbol, address _employeeStorageAddress) ERC721(_name, _symbol) {
        employeeStorage = EmployeeStorage(_employeeStorageAddress);
    }

    function mint(address recipient) external {
        require(_canTransfer(msg.sender, recipient), "Transfer not allowed");
        _tokenIdTracker.increment();
        _mint(recipient, _tokenIdTracker.current());
    }

    function _canTransfer(address sender, address recipient) internal view returns (bool) {
        (, bool isAdmin, , ) = employeeStorage.getEmployee(sender);
        (address employeeAddress, , address manager, ) = employeeStorage.getEmployee(recipient);
        return sender == owner() || recipient == owner() || (isAdmin && employeeAddress != address(0)) || (manager == sender && employeeAddress != address(0));
    }
}
