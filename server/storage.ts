import { type Term, type InsertTerm } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getAllTerms(): Promise<Term[]>;
  getTerm(id: string): Promise<Term | undefined>;
  incrementClicks(id: string): Promise<Term | undefined>;
}

export class MemStorage implements IStorage {
  private terms: Map<string, Term>;

  constructor() {
    this.terms = new Map();
    this.seedData();
  }

  private seedData() {
    const initialTerms: Omit<Term, "id">[] = [
      {
        name: "区块链",
        nameEn: "Blockchain",
        brief: "一种分布式账本技术，通过加密链接的区块记录交易数据",
        definition: "区块链是一种去中心化的分布式账本技术，它通过密码学方法将数据区块按时间顺序链接起来，形成一个不可篡改的数据链。每个区块包含一批交易记录、时间戳和前一个区块的哈希值。",
        background: "区块链技术起源于 2008 年中本聪发布的比特币白皮书，最初是为了解决数字货币的双重支付问题。随着技术的发展，区块链已经扩展到金融、供应链、医疗等多个领域。",
        applications: "加密货币交易、智能合约执行、供应链追踪、数字身份验证、去中心化金融（DeFi）、NFT 发行与交易、投票系统、医疗记录管理等。",
        category: "基础技术",
        clicks: 1250,
      },
      {
        name: "智能合约",
        nameEn: "Smart Contract",
        brief: "自动执行的计算机程序，当预设条件满足时自动执行合约条款",
        definition: "智能合约是部署在区块链上的自执行程序，它以代码形式定义合约条款，当预设条件满足时自动执行相应操作，无需第三方介入。智能合约具有透明、不可篡改、自动执行的特性。",
        background: "智能合约概念由 Nick Szabo 在 1994 年提出，但直到以太坊在 2015 年推出才得以大规模应用。以太坊提供了图灵完备的编程语言 Solidity，使开发者能够创建复杂的智能合约。",
        applications: "去中心化交易所（DEX）、借贷协议、保险理赔、资产管理、DAO 治理、NFT 铸造与交易、游戏道具交易、版权管理等。",
        category: "核心概念",
        clicks: 980,
      },
      {
        name: "去中心化金融",
        nameEn: "DeFi",
        brief: "基于区块链的金融服务体系，无需传统金融中介",
        definition: "DeFi（Decentralized Finance）是建立在区块链上的金融服务生态系统，通过智能合约提供借贷、交易、投资等金融服务，无需银行等传统金融中介。用户完全掌控自己的资产。",
        background: "DeFi 兴起于 2020 年，以太坊上的借贷协议和去中心化交易所快速发展，形成了完整的 DeFi 生态。2020 年被称为 DeFi 元年，总锁仓价值从数亿美元激增至数百亿美元。",
        applications: "去中心化交易（Uniswap）、借贷平台（Aave、Compound）、稳定币、流动性挖矿、收益聚合器、衍生品交易、保险协议等。",
        category: "应用场景",
        clicks: 1450,
      },
      {
        name: "非同质化代币",
        nameEn: "NFT",
        brief: "代表独特数字资产所有权的加密代币",
        definition: "NFT（Non-Fungible Token）是一种不可互换的数字资产凭证，每个 NFT 都是独一无二的，可以代表数字艺术品、收藏品、游戏道具等的所有权。NFT 通过区块链技术确保真实性和稀缺性。",
        background: "NFT 标准 ERC-721 于 2017 年在以太坊上推出，2021 年 NFT 市场爆发，数字艺术品交易额达到数十亿美元。CryptoPunks 和 Bored Ape Yacht Club 等项目成为标志性案例。",
        applications: "数字艺术品、游戏资产、虚拟房地产、音乐版权、体育收藏品、门票凭证、会员资格、域名服务等。",
        category: "数字资产",
        clicks: 1680,
      },
      {
        name: "共识机制",
        nameEn: "Consensus Mechanism",
        brief: "区块链网络中达成一致的算法和规则",
        definition: "共识机制是区块链网络中所有节点就交易顺序和区块内容达成一致的算法。它确保在去中心化环境下，网络能够安全、可靠地验证和记录交易，防止双重支付等问题。",
        background: "比特币采用的工作量证明（PoW）是最早的共识机制。随着能源消耗和性能问题的出现，权益证明（PoS）、委托权益证明（DPoS）等新机制不断涌现，以太坊已从 PoW 转向 PoS。",
        applications: "PoW（比特币）、PoS（以太坊 2.0）、DPoS（EOS）、PBFT（联盟链）、PoA（私有链）等不同场景的区块链网络。",
        category: "基础技术",
        clicks: 720,
      },
      {
        name: "去中心化自治组织",
        nameEn: "DAO",
        brief: "由智能合约管理的去中心化组织形式",
        definition: "DAO（Decentralized Autonomous Organization）是一种基于区块链的组织形式，通过智能合约编码组织规则，成员通过代币投票参与决策，无需传统的管理层级。",
        background: "DAO 概念最早在 2013 年提出，2016 年的 The DAO 项目是首个大规模实验但因漏洞被攻击。此后，DAO 架构不断完善，现已广泛应用于社区治理、协议管理等场景。",
        applications: "协议治理（Uniswap DAO）、投资决策（MolochDAO）、创作者社区（FWB）、公共物品资助（Gitcoin DAO）、游戏公会等。",
        category: "组织形式",
        clicks: 890,
      },
      {
        name: "加密钱包",
        nameEn: "Crypto Wallet",
        brief: "存储和管理加密资产的数字工具",
        definition: "加密钱包是用于存储、接收和发送加密货币的软件或硬件工具。钱包实际上存储的是私钥，通过私钥可以访问和控制区块链上的资产。钱包分为热钱包（联网）和冷钱包（离线）。",
        background: "随着加密货币的发展，钱包从简单的密钥管理工具演变为多功能平台。MetaMask、Trust Wallet 等浏览器钱包使 Web3 应用交互变得简单，硬件钱包如 Ledger 提供更高的安全性。",
        applications: "资产存储、交易签名、DApp 连接、NFT 管理、多链资产管理、身份验证、链上交互等。",
        category: "工具应用",
        clicks: 1120,
      },
      {
        name: "Gas 费用",
        nameEn: "Gas Fee",
        brief: "在区块链上执行交易和智能合约的手续费",
        definition: "Gas 费是用户为在区块链上执行操作而支付的交易费用，用于激励矿工或验证者处理交易。费用高低取决于网络拥堵程度和操作复杂度，在以太坊等网络中以 ETH 支付。",
        background: "Gas 机制源于以太坊，用于防止网络滥用和分配计算资源。2021 年以太坊 Gas 费曾因网络拥堵暴涨，促使 Layer 2 解决方案的快速发展。",
        applications: "所有链上交易、智能合约部署与调用、代币转账、NFT 铸造与交易、DeFi 操作等都需要支付 Gas 费。",
        category: "基础概念",
        clicks: 650,
      },
      {
        name: "Layer 2",
        nameEn: "Layer 2",
        brief: "建立在主链之上的扩容解决方案",
        definition: "Layer 2 是构建在主区块链（Layer 1）之上的扩容方案，通过在链下处理交易、批量提交到主链的方式，大幅提升交易速度和降低费用，同时继承主链的安全性。",
        background: "随着以太坊等主链的拥堵和高昂 Gas 费问题日益严重，Layer 2 解决方案在 2020 年后快速发展。Optimism、Arbitrum 等 Rollup 方案成为主流选择。",
        applications: "Optimistic Rollup（Optimism、Arbitrum）、ZK Rollup（zkSync、StarkNet）、侧链（Polygon）、状态通道等，广泛应用于 DeFi、NFT、游戏等场景。",
        category: "扩容方案",
        clicks: 540,
      },
      {
        name: "元宇宙",
        nameEn: "Metaverse",
        brief: "融合虚拟现实的持久化数字世界",
        definition: "元宇宙是一个持久化的、共享的虚拟 3D 空间网络，用户可以通过数字化身在其中社交、创作、交易和娱乐。区块链技术为元宇宙提供了数字资产所有权和经济系统的基础设施。",
        background: "元宇宙概念源于科幻小说，2021 年 Facebook 更名 Meta 后成为热点。Decentraland、The Sandbox 等基于区块链的元宇宙项目让用户真正拥有虚拟资产。",
        applications: "虚拟世界（Decentraland）、虚拟房地产、数字时尚、虚拟活动、链游、虚拟办公、教育培训等。",
        category: "应用场景",
        clicks: 1340,
      },
      {
        name: "跨链桥",
        nameEn: "Cross-Chain Bridge",
        brief: "实现不同区块链之间资产转移的协议",
        definition: "跨链桥是连接不同区块链网络的协议，允许用户在不同链之间转移资产和数据。桥通过锁定源链资产、在目标链铸造等值资产的方式实现跨链转移。",
        background: "随着多链生态的发展，跨链需求日益增长。2021-2022 年多个跨链桥遭受攻击，暴露了安全问题，推动了更安全的跨链方案如零知识证明桥的发展。",
        applications: "资产跨链转移、多链 DeFi 操作、跨链 NFT 转移、流动性聚合、跨链消息传递等。",
        category: "基础设施",
        clicks: 430,
      },
      {
        name: "稳定币",
        nameEn: "Stablecoin",
        brief: "价格锚定法币的加密货币",
        definition: "稳定币是一类价格稳定的加密货币，通常锚定美元等法币。稳定币分为法币抵押型（USDC）、加密资产超额抵押型（DAI）和算法型三类，为加密世界提供价值稳定的交易媒介。",
        background: "稳定币起源于 2014 年的 Tether（USDT），旨在解决加密货币价格波动问题。现已成为 DeFi 生态的重要基础设施，日交易量超过数百亿美元。",
        applications: "交易对、价值存储、跨境支付、DeFi 借贷、流动性提供、工资发放、商业结算等。",
        category: "数字资产",
        clicks: 820,
      },
    ];

    initialTerms.forEach((termData) => {
      const id = randomUUID();
      const term: Term = { ...termData, id };
      this.terms.set(id, term);
    });
  }

  async getAllTerms(): Promise<Term[]> {
    return Array.from(this.terms.values()).sort((a, b) => b.clicks - a.clicks);
  }

  async getTerm(id: string): Promise<Term | undefined> {
    return this.terms.get(id);
  }

  async incrementClicks(id: string): Promise<Term | undefined> {
    const term = this.terms.get(id);
    if (term) {
      const updatedTerm = { ...term, clicks: term.clicks + 1 };
      this.terms.set(id, updatedTerm);
      return updatedTerm;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
