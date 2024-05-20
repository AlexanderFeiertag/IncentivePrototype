import "@openzeppelin/contracts/access/Ownable.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmployeeStorage is Ownable {

    struct Employee {
        address addr;
        bool isAdmin;
        address manager;
    }

    mapping(uint => Employee) public employees;
    uint public employeeCount;

    constructor() {
        employeeCount = 1;
        employees[employeeCount - 1] = Employee(msg.sender, true, address(0)); // Set owner as initial admin
    }

    modifier onlyOwnerOrAdmin() {
        (, bool isAdmin, , ) = getEmployee(msg.sender);
        require(msg.sender == owner() || isAdmin, "Only owner or admin can perform this action");
        _;
    }

    function getEmployee(address employeeAddr) public view returns (address, bool, address, uint) {
        Employee memory resultEmployee;
        uint resultIndex;

        for (uint i = 0; i < employeeCount; i++) {
            Employee memory test = employees[i];
            if (test.addr == employeeAddr) {
                resultEmployee = test;
                resultIndex = i;
                break;
            }
        }

        return (resultEmployee.addr, resultEmployee.isAdmin, resultEmployee.manager, resultIndex);
    }

    function addEmployee(address employeeAddr, bool isAdmin, address manager) public onlyOwnerOrAdmin {
        (address employeeAddress, , , ) = getEmployee(employeeAddr);
        require(employeeAddress == address(0), "Employee already exists");

        employeeCount++;
        employees[employeeCount - 1] = Employee(employeeAddr, isAdmin, manager);
    }

    function updateEmployee(address employeeAddr, bool isAdmin, address manager) public onlyOwnerOrAdmin {
        (address employeeAddress, , , uint index) = getEmployee(employeeAddr);
        require(employeeAddress != address(0), "Employee does not exist");

        employees[index].isAdmin = isAdmin;
        employees[index].manager = manager;
    }

    function deleteEmployee(address employeeAddr) public onlyOwnerOrAdmin {
        (address employeeAddress, , , uint index) = getEmployee(employeeAddr);
        require(employeeAddress != address(0), "Employee does not exist");
        delete employees[index];
    }

    function getEmployees() public view returns (Employee[] memory){
      Employee[] memory result = new Employee[](employeeCount);
      uint resultIndex = 0;

      for (uint i = 0; i < employeeCount; i++) {
        if (employees[i].addr != address(0)) {
            result[resultIndex] = employees[i];
            resultIndex++;
        }
      }
      return result;
  }
}