// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Edulive {
    address public owner;

    struct StreamInfo {
        uint256 id;
        string title;
        string slug;
        string description;
        uint256 cost;
    }

    struct Stream {
        uint256 id;
        string title;
        string slug;
        string description;
        uint256 cost;
    }

    struct Order {
        uint256 time;
        uint256 streamId;
    }

    // Mappings
    mapping(uint256 => Stream) public streams;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;
    uint256 public streamCount;
    mapping(address => uint256) public totalDonations; // Track total donations per address
    uint256 public totalDonationsReceived; // Track total donations received

    // Events
    event Buy(address buyer, uint256 orderId, uint256 streamId);
    event List(string title, uint256 cost);
    event createNewStream(
        uint256 streamId,
        string title,
        string slug,
        string description,
        uint256 cost
    );
    event Donation(address indexed donor, uint256 amount, uint256 streamId);

    // Modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "You must be the owner!");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Create New Stream
    function createStream(
        uint256 _id,
        string memory _title,
        string memory _slug,
        string memory _description,
        uint256 _cost
    ) public onlyOwner {
        require(streams[_id].id == 0, "Stream ID already exists!");

        Stream storage newStream = streams[_id];
        newStream.id = _id;
        newStream.title = _title;
        newStream.slug = _slug;
        newStream.description = _description;
        newStream.cost = _cost;

        emit createNewStream(_id, _title, _slug, _description, _cost);
    }

    function buy(uint256 _id) public payable {
        Stream storage stream = streams[_id];

        require(
            msg.value >= stream.cost,
            "Your balanca must be bigger than the cost!"
        );

        Order memory order = Order(block.timestamp, _id);

        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        emit Buy(msg.sender, orderCount[msg.sender], stream.id);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Withdrawal failed!");
    }

    // List Streams
    function list(
        uint256 _id,
        string memory _title,
        string memory _slug,
        string memory _description,
        uint256 _cost
    ) public onlyOwner {
        Stream storage stream = streams[_id];
        stream.id = _id;
        stream.title = _title;
        stream.description = _description;
        stream.slug = _slug;
        stream.cost = _cost;

        emit List(_title, _cost);
    }

    // Function get all courses
    function getAllStreams() public view returns (StreamInfo[] memory) {
        StreamInfo[] memory streamList = new StreamInfo[](streamCount);
        uint256 currentIndex = 0;

        for (uint256 i = 1; i <= streamCount; i++) {
            Stream storage stream = streams[i];
            if (stream.id != 0) {
                // Ensure the course exists
                streamList[currentIndex] = StreamInfo(
                    stream.id,
                    stream.title,
                    stream.slug,
                    stream.description,
                    stream.cost
                );
                currentIndex++;
            }
        }

        return streamList;
    }

    // Add new donation function
    function donate(uint256 _streamId) public payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        require(streams[_streamId].id != 0, "Stream does not exist");
        
        // Track donations for this stream
        totalDonations[msg.sender] += msg.value;
        totalDonationsReceived += msg.value;
        
        // Transfer donation to stream owner
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Donation transfer failed");
        
        emit Donation(msg.sender, msg.value, _streamId);
    }

    // Add function to get donor's total donations
    function getDonorTotalDonations(address _donor) public view returns (uint256) {
        return totalDonations[_donor];
    }
}
