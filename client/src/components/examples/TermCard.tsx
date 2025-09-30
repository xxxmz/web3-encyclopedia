import TermCard from "../TermCard";

export default function TermCardExample() {
  const mockTerm = {
    id: "1",
    name: "区块链",
    nameEn: "Blockchain",
    brief: "一种分布式账本技术，通过加密链接的区块记录交易数据",
    definition: "区块链是一种去中心化的分布式账本技术...",
    background: "区块链技术起源于 2008 年...",
    applications: "加密货币交易、智能合约执行...",
    category: "基础技术",
    clicks: 1250,
  };

  return (
    <div className="w-full max-w-md p-4">
      <TermCard term={mockTerm} rank={1} onClick={() => console.log("Term clicked")} />
    </div>
  );
}
