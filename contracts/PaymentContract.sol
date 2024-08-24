// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PaymentContract is ReentrancyGuard {

    // Event emitted when a payment is made
    event PaymentSent(address indexed recipient, uint256 amount);

    // Function to send amount x to a given wallet
    function sendAmount(address payable recipient) public payable nonReentrant {
        require(msg.value > 0, "Must send a positive amount");
        recipient.transfer(msg.value);
        emit PaymentSent(recipient, msg.value);
    }

    // Function to split x amount equally among n wallets
    function splitAmount(address payable[] memory recipients) public payable nonReentrant {
        uint256 length = recipients.length;
        require(length > 0, "No recipients provided");
        
        uint256 amountPerRecipient = msg.value / length;

        // Use `unchecked` for addition as we know it won't overflow
        unchecked {
            for (uint i = 0; i < length; i++) {
                recipients[i].transfer(amountPerRecipient);
                emit PaymentSent(recipients[i], amountPerRecipient);
            }
        }

        // Return excess Ether to sender if there is any due to rounding
        uint256 remainder = msg.value - (amountPerRecipient * length);
        if (remainder > 0) {
            payable(msg.sender).transfer(remainder);
        }
    }

    // Function to send specified amounts to multiple wallets
    function sendWithAmount(address payable[] memory recipients, uint256[] memory amounts) public payable nonReentrant {
        uint256 length = recipients.length;
        require(length == amounts.length, "Recipients and amounts arrays must have the same length");
        
        uint256 totalAmount = 0;

        // Calculate total amount needed
        for (uint i = 0; i < length; i++) {
            totalAmount += amounts[i];
        }
        require(msg.value >= totalAmount, "Insufficient Ether sent for specified amounts");

        // Send amounts to recipients
        for (uint i = 0; i < length; i++) {
            recipients[i].transfer(amounts[i]);
            emit PaymentSent(recipients[i], amounts[i]);
        }

        // Return any excess Ether to the sender
        uint256 remainder = msg.value - totalAmount;
        if (remainder > 0) {
            payable(msg.sender).transfer(remainder);
        }
    }

    // Fallback function to accept Ether
    receive() external payable {}

    fallback() external payable {}
}
