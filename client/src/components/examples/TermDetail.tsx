import TermDetail from "../TermDetail";

export default function TermDetailExample() {
  const mockTerm = {
    id: "1",
    name: "区块链",
    nameEn: "Blockchain",
    brief: "一种分布式账本技术",
    definition: "区块链是一种去中心化的分布式账本技术，它通过密码学方法将数据区块按时间顺序链接起来，形成一个不可篡改的数据链。每个区块包含一批交易记录、时间戳和前一个区块的哈希值。",
    background: "区块链技术起源于 2008 年中本聪发布的比特币白皮书，最初是为了解决数字货币的双重支付问题。随着技术的发展，区块链已经扩展到金融、供应链、医疗等多个领域。",
    applications: "加密货币交易、智能合约执行、供应链追踪、数字身份验证、去中心化金融（DeFi）、NFT 发行与交易、投票系统、医疗记录管理等。",
    category: "基础技术",
    clicks: 1250,
  };

  return (
    <div className="w-full max-w-4xl p-4">
      <TermDetail term={mockTerm} onBack={() => console.log("Back clicked")} />
    </div>
  );
}
