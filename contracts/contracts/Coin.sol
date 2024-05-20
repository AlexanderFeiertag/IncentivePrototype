// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./EmployeeStorage.sol";


contract Coin is ERC20, Ownable {
    EmployeeStorage public employeeStorage;
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000;

    constructor(string memory _name, string memory _symbol, address _employeeStorageAddress) ERC20(_name, _symbol) {
        employeeStorage = EmployeeStorage(_employeeStorageAddress);
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    // Transfers tokens to an employee
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(_canTransfer(owner(), recipient), "Transfer not allowed");
        _transfer(owner(), recipient, amount);
        return true;
    }

    // Transfers tokens to the owner
    function transferToOwner(uint256 amount) public returns (bool) {
        _transfer(msg.sender, owner(), amount);
        return true;
    }

    function _canTransfer(address sender, address recipient) internal view returns (bool) {
        (, bool isAdmin, , ) = employeeStorage.getEmployee(sender);
        (address employeeAddress, , address manager , ) = employeeStorage.getEmployee(recipient);
        return sender == owner() || recipient == owner() || (isAdmin && employeeAddress != address(0)) || (manager == sender && employeeAddress != address(0));
    }
}