pragma solidity 0.4.25;

contract TransactionRecord {
    uint256 public recordCount = 0;

    struct Record {
        uint256 id;
        string org;
        string signer;
        string medicine;
        int count;
    }

    mapping(uint256 => Record) public records;

    event RecordCreated(
        uint256 id,
        string org,
        string signer,
        string medicine,
        int count
    );

    function createRecord(string memory _org ,string memory _signer, string memory _medicine, int _count)
        public
    {
        records[recordCount] = Record(recordCount, _org, _signer, _medicine, _count);
        emit RecordCreated(recordCount, _org, _signer, _medicine, _count);
        recordCount++;
    }

     function getRecordCount() public view returns (uint256) {
        return recordCount;
    }

      function getRecord (uint256  id)
        public view
        returns (uint , string memory , string memory, string memory ,int)
    {
        Record memory p = records[id];
        return (p.id, p.org, p.signer, p.medicine, p.count);
    }

}