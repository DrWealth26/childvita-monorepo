// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ChildVitaGrant {
    address public immutable owner;
    uint256 public grantCount;

    struct Grant {
        uint256 id;
        address caregiver;
        string childId;           // string child ID for demo (e.g. CHV-10001)
        uint256 amount;           // in wei (we'll use tiny test amounts)
        bool attendanceVerified;
        bool paid;
        string zkProofHash;       // IPFS-like hash of ZK proof
        uint256 timestamp;
    }

    mapping(uint256 => Grant) public grants;
    mapping(address => bool) public authorizedVerifiers; // e.g. schools/NGOs

    event GrantCreated(uint256 id, address caregiver, string childId, uint256 amount);
    event AttendanceVerified(uint256 id, string zkProofHash);
    event GrantPaid(uint256 id);

    constructor() {
        owner = msg.sender;

        // Pre-authorize deployer as verifier
        authorizedVerifiers[msg.sender] = true;
    }

    function createGrant(
        address _caregiver,
        string memory _childId,
        uint256 _amount
    ) external {
        require(_amount > 0, "Amount must be > 0");

        grantCount++;

        grants[grantCount] = Grant({
            id: grantCount,
            caregiver: _caregiver,
            childId: _childId,
            amount: _amount,
            attendanceVerified: false,
            paid: false,
            zkProofHash: "",
            timestamp: block.timestamp
        });

        emit GrantCreated(grantCount, _caregiver, _childId, _amount);
    }

    function verifyAttendance(uint256 _grantId, string calldata _zkProofHash) external {
        require(authorizedVerifiers[msg.sender], "Not authorized verifier");
        require(!grants[_grantId].attendanceVerified, "Already verified");

        grants[_grantId].attendanceVerified = true;
        grants[_grantId].zkProofHash = _zkProofHash;

        emit AttendanceVerified(_grantId, _zkProofHash);
    }

    function releaseGrant(uint256 _grantId) external {
        Grant storage g = grants[_grantId];

        require(g.attendanceVerified, "Attendance not verified");
        require(!g.paid, "Already paid");
        require(msg.sender == owner || msg.sender == g.caregiver, "Not authorized");

        g.paid = true;

        payable(g.caregiver).transfer(g.amount);

        emit GrantPaid(_grantId);
    }

    function getGrant(uint256 _grantId) external view returns (Grant memory) {
        return grants[_grantId];
    }

    // Receive test ETH for payouts
    receive() external payable {}
}