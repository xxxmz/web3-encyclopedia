import HotTermsBanner from "../HotTermsBanner";

export default function HotTermsBannerExample() {
  const mockTerms = [
    {
      id: "1",
      name: "NFT",
      nameEn: "NFT",
      brief: "代表独特数字资产所有权的加密代币",
      definition: "...",
      background: "...",
      applications: "...",
      category: "数字资产",
      clicks: 1680,
    },
    {
      id: "2",
      name: "DeFi",
      nameEn: "DeFi",
      brief: "基于区块链的金融服务体系",
      definition: "...",
      background: "...",
      applications: "...",
      category: "应用场景",
      clicks: 1450,
    },
    {
      id: "3",
      name: "元宇宙",
      nameEn: "Metaverse",
      brief: "融合虚拟现实的持久化数字世界",
      definition: "...",
      background: "...",
      applications: "...",
      category: "应用场景",
      clicks: 1340,
    },
  ];

  return <HotTermsBanner terms={mockTerms} onTermClick={(term) => console.log("Clicked:", term.name)} />;
}
