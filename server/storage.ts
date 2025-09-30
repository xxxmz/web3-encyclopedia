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
      {
        name: "工作量证明",
        nameEn: "Proof of Work (PoW)",
        brief: "通过计算难题验证交易的共识机制",
        definition: "工作量证明是一种共识机制，矿工需要解决复杂的数学难题来验证交易并创建新区块。第一个解决问题的矿工获得区块奖励，这种机制确保了网络安全但消耗大量能源。",
        background: "PoW 最早应用于比特币网络，由中本聪在 2008 年提出。它通过经济激励和计算难度保证了网络的去中心化和安全性，但高能耗问题一直备受争议。",
        applications: "比特币、以太坊（已转向 PoS）、莱特币、门罗币等加密货币网络的共识验证。",
        category: "基础技术",
        clicks: 580,
      },
      {
        name: "权益证明",
        nameEn: "Proof of Stake (PoS)",
        brief: "通过质押代币参与共识的机制",
        definition: "权益证明是一种更节能的共识机制，验证者通过质押代币获得验证交易和创建区块的权利。验证者的选择概率与质押数量成正比，恶意行为会导致质押资产被罚没。",
        background: "PoS 作为 PoW 的替代方案被提出，旨在解决能源消耗问题。2022 年以太坊成功从 PoW 转向 PoS（The Merge），标志着这一技术的成熟。",
        applications: "以太坊 2.0、Cardano、Polkadot、Solana 等现代区块链网络。",
        category: "基础技术",
        clicks: 520,
      },
      {
        name: "去中心化应用",
        nameEn: "DApp",
        brief: "运行在区块链上的去中心化应用程序",
        definition: "DApp（Decentralized Application）是运行在区块链网络上的应用程序，其后端逻辑由智能合约实现，前端可以是网页或移动应用。DApp 具有开源、去中心化、数据加密等特点。",
        background: "DApp 概念随着以太坊的推出而兴起，2017-2018 年出现了第一波 DApp 热潮。现在 DApp 已覆盖金融、游戏、社交、存储等多个领域。",
        applications: "去中心化交易所、链游、去中心化社交平台、预测市场、去中心化存储等。",
        category: "应用场景",
        clicks: 760,
      },
      {
        name: "流动性挖矿",
        nameEn: "Yield Farming",
        brief: "通过提供流动性获得代币奖励的机制",
        definition: "流动性挖矿是 DeFi 中的一种激励机制，用户将加密资产存入流动性池，为交易提供流动性，作为回报获得平台代币或交易手续费。这是 DeFi 生态中重要的资金获取方式。",
        background: "流动性挖矿在 2020 年 DeFi Summer 期间爆发，Compound 推出的 COMP 代币分发机制成为标志性事件，随后各大 DeFi 协议纷纷效仿。",
        applications: "Uniswap、SushiSwap、Curve、Balancer 等去中心化交易所，以及各类 DeFi 借贷协议。",
        category: "DeFi 机制",
        clicks: 690,
      },
      {
        name: "闪电贷",
        nameEn: "Flash Loan",
        brief: "无需抵押的即时借贷机制",
        definition: "闪电贷是 DeFi 中的创新借贷方式，允许用户在单笔交易中无抵押借入资金，但必须在同一交易中归还。如果无法归还，整个交易会被回滚。这为套利和清算提供了新工具。",
        background: "闪电贷由 Aave 等 DeFi 协议首创，利用了区块链交易的原子性特性。它既是强大的金融工具，也曾被用于攻击协议漏洞。",
        applications: "套利交易、债务重组、抵押品交换、协议攻击（负面用例）等。",
        category: "DeFi 机制",
        clicks: 450,
      },
      {
        name: "预言机",
        nameEn: "Oracle",
        brief: "连接区块链与外部数据的桥梁",
        definition: "预言机是为智能合约提供外部数据的服务，它将链下数据（如价格、天气、体育赛果）传输到链上，使智能合约能够根据真实世界的信息执行。预言机解决了区块链的数据孤岛问题。",
        background: "随着智能合约应用的复杂化，预言机需求日益增长。Chainlink 作为去中心化预言机网络的代表，成为 DeFi 生态的关键基础设施。",
        applications: "DeFi 价格喂价、参数化保险、预测市场、供应链验证、随机数生成等。",
        category: "基础设施",
        clicks: 510,
      },
      {
        name: "侧链",
        nameEn: "Sidechain",
        brief: "与主链并行运行的独立区块链",
        definition: "侧链是独立于主链运行的区块链，通过双向锚定机制与主链连接。侧链可以有自己的共识机制和规则，用于处理特定应用场景，减轻主链负担。",
        background: "侧链概念早在 2014 年就被提出，作为比特币的扩展方案。Polygon（原 Matic）作为以太坊侧链的成功案例，证明了这一技术的可行性。",
        applications: "Polygon、Ronin（Axie Infinity）、Liquid Network（比特币侧链）等。",
        category: "扩容方案",
        clicks: 480,
      },
      {
        name: "零知识证明",
        nameEn: "Zero-Knowledge Proof",
        brief: "在不泄露信息的情况下证明某事为真",
        definition: "零知识证明是一种加密技术，允许证明者向验证者证明某个陈述是真实的，而无需透露任何额外信息。在区块链中，它可用于隐私保护和扩容。",
        background: "零知识证明由密码学家在 1980 年代提出，近年来在区块链领域找到重要应用。zk-SNARKs 和 zk-STARKs 是两种主要实现方式。",
        applications: "zkSync、StarkNet 等 ZK Rollup、Zcash 等隐私币、身份验证、合规证明等。",
        category: "隐私技术",
        clicks: 420,
      },
      {
        name: "铸造",
        nameEn: "Minting",
        brief: "创建新的代币或 NFT 的过程",
        definition: "铸造是在区块链上创建新代币或 NFT 的过程。对于加密货币，铸造通常指挖矿或质押奖励；对于 NFT，铸造指将数字资产首次记录到区块链上，赋予其唯一性和所有权。",
        background: "铸造概念来源于传统货币制造，在区块链中演变为数字资产的创建过程。NFT 铸造在 2021 年成为热潮，使艺术家和创作者能够将作品代币化。",
        applications: "NFT 艺术品发行、游戏道具生成、社区徽章创建、PoS 网络的质押奖励等。",
        category: "基础概念",
        clicks: 640,
      },
      {
        name: "链上治理",
        nameEn: "On-Chain Governance",
        brief: "通过区块链投票进行协议决策",
        definition: "链上治理是指通过智能合约和代币投票机制，让社区成员直接参与协议的升级和决策。所有提案、投票和执行过程都在链上公开透明地进行。",
        background: "链上治理起源于早期区块链项目的治理探索，DAO 的兴起使其成为主流。它代表了去中心化治理的理想形态，但也面临投票率低、鲸鱼控制等挑战。",
        applications: "协议参数调整、资金分配决策、功能升级投票、社区提案等。",
        category: "治理机制",
        clicks: 380,
      },
      {
        name: "空投",
        nameEn: "Airdrop",
        brief: "向用户免费分发代币的营销方式",
        definition: "空投是项目方向社区成员免费发放代币的行为，通常用于奖励早期支持者、增加代币分发范围或进行市场营销。接收者可能需要完成特定任务或持有特定资产。",
        background: "空投作为区块链项目的营销手段在 2017 年 ICO 热潮期间兴起。2020 年后，DeFi 项目的追溯空投成为趋势，Uniswap 的 UNI 空投成为经典案例。",
        applications: "新项目推广、社区激励、忠诚度奖励、去中心化分发代币等。",
        category: "运营策略",
        clicks: 710,
      },
      {
        name: "白名单",
        nameEn: "Whitelist",
        brief: "优先参与项目的特权名单",
        definition: "白名单是项目方为特定用户提供的优先参与权限，通常用于 NFT 发售、代币众筹等场景。白名单成员可以在公开发售前或以优惠价格参与，避免 Gas 战争和被机器人抢购。",
        background: "白名单机制源于传统金融的优先认购权，在 NFT 和 Web3 项目中被广泛采用，成为社区建设和奖励早期支持者的重要工具。",
        applications: "NFT 预售、代币私募、游戏内测、社区专属活动等。",
        category: "运营策略",
        clicks: 590,
      },
      {
        name: "Gas 优化",
        nameEn: "Gas Optimization",
        brief: "降低交易费用的代码优化技术",
        definition: "Gas 优化是指通过优化智能合约代码和交易逻辑，减少链上操作的计算复杂度，从而降低 Gas 消耗和交易费用。这对于频繁交互的 DApp 尤为重要。",
        background: "随着以太坊使用量增加，Gas 费用成为用户痛点。开发者开始深入研究 EVM 机制，探索各种优化技巧，如批量处理、存储优化、事件使用等。",
        applications: "智能合约开发、批量交易处理、存储结构设计、DApp 用户体验优化等。",
        category: "技术优化",
        clicks: 340,
      },
      {
        name: "多重签名",
        nameEn: "Multi-Signature (MultiSig)",
        brief: "需要多方授权的安全钱包机制",
        definition: "多重签名钱包要求多个私钥持有者共同授权才能执行交易，通常设置为 M-of-N 模式（N 个签名者中需要 M 个同意）。这大大提高了资金安全性，防止单点故障。",
        background: "多重签名技术在比特币早期就已存在，现已成为 DAO 资金管理、团队资产保管的标准做法。Gnosis Safe 是以太坊上最流行的多签钱包。",
        applications: "DAO 资金管理、公司资产托管、大额资金转移、智能合约升级权限等。",
        category: "安全机制",
        clicks: 460,
      },
      {
        name: "Layer 1",
        nameEn: "Layer 1",
        brief: "区块链的基础层网络",
        definition: "Layer 1 是指区块链的基础层，包括主链的共识机制、安全性和去中心化特性。L1 负责最终的交易结算和安全保障，是整个生态的基石。",
        background: "Layer 1 概念随着扩容讨论而明确，用于区分基础链和扩容方案。比特币、以太坊、Solana 等都是 L1 区块链。",
        applications: "比特币、以太坊、Solana、Avalanche、Cosmos 等独立区块链网络。",
        category: "基础架构",
        clicks: 530,
      },
      {
        name: "链游",
        nameEn: "GameFi",
        brief: "融合游戏与金融的区块链游戏",
        definition: "GameFi 是 Game 和 Finance 的结合，指集成了经济系统的区块链游戏。玩家通过游戏获得可交易的 NFT 和代币，实现 Play-to-Earn（边玩边赚）模式。",
        background: "GameFi 在 2021 年爆发，Axie Infinity 开创的 P2E 模式吸引了数百万玩家。尽管面临可持续性挑战，GameFi 仍被视为 Web3 的重要应用方向。",
        applications: "Axie Infinity、The Sandbox、Illuvium、Gods Unchained 等链游项目。",
        category: "应用场景",
        clicks: 870,
      },
      {
        name: "去中心化存储",
        nameEn: "Decentralized Storage",
        brief: "分布式文件存储网络",
        definition: "去中心化存储是通过区块链和分布式网络存储数据的方案，文件被加密、分片并存储在多个节点上。相比中心化云存储，它具有抗审查、高可用和数据主权等优势。",
        background: "IPFS 协议奠定了去中心化存储的基础，Filecoin、Arweave 等项目进一步实现了激励层，让存储提供者获得经济回报。",
        applications: "NFT 元数据存储、DApp 前端托管、档案存储、内容分发网络等。",
        category: "基础设施",
        clicks: 410,
      },
      {
        name: "合并挖矿",
        nameEn: "Merged Mining",
        brief: "同时挖掘多条区块链的技术",
        definition: "合并挖矿允许矿工使用相同的算力同时挖掘多条兼容的区块链，无需额外的硬件投入。这提高了小型区块链的安全性，同时让矿工获得多重收益。",
        background: "合并挖矿最早应用于比特币和 Namecoin，后来 Dogecoin 也采用了这一技术与莱特币合并挖矿，大幅提升了网络安全性。",
        applications: "Namecoin、Dogecoin（与莱特币）、RSK（与比特币）等区块链网络。",
        category: "挖矿技术",
        clicks: 290,
      },
      {
        name: "链上分析",
        nameEn: "On-Chain Analytics",
        brief: "通过区块链数据进行市场分析",
        definition: "链上分析是指通过分析区块链上的公开数据（交易、地址活动、智能合约交互等）来洞察市场趋势、识别鲸鱼行为和评估项目健康度的方法。",
        background: "随着区块链数据的积累，专业的链上分析工具和方法论逐渐成熟。Glassnode、Nansen 等平台为投资者和研究者提供深度分析服务。",
        applications: "投资决策、风险评估、项目尽调、市场趋势预测、异常行为检测等。",
        category: "数据分析",
        clicks: 360,
      },
      {
        name: "Rollup",
        nameEn: "Rollup",
        brief: "将交易批量打包到主链的扩容技术",
        definition: "Rollup 是一种 Layer 2 扩容方案，将多笔交易在链下执行并打包，然后将压缩后的数据批量提交到主链。Rollup 分为 Optimistic Rollup 和 ZK Rollup 两大类。",
        background: "Rollup 在 2019-2020 年开始受到关注，被视为以太坊扩容的最佳路径。Arbitrum、Optimism、zkSync 等项目的成功验证了这一技术方向。",
        applications: "以太坊扩容、降低交易费用、提升 DApp 性能、支持高频交易等。",
        category: "扩容方案",
        clicks: 490,
      },
      {
        name: "燃烧机制",
        nameEn: "Token Burn",
        brief: "永久销毁代币以减少供应量",
        definition: "燃烧机制是将代币发送到无法访问的地址（黑洞地址），使其永久退出流通。这是一种通货紧缩机制，通过减少供应量来增加代币稀缺性和潜在价值。",
        background: "代币燃烧在加密货币项目中被广泛采用，以太坊 EIP-1559 升级引入的 Gas 燃烧机制是重要里程碑，使 ETH 在某些时期呈现通缩特性。",
        applications: "回购销毁、交易手续费燃烧、通胀对冲、价值捕获机制等。",
        category: "经济模型",
        clicks: 550,
      },
      {
        name: "分片",
        nameEn: "Sharding",
        brief: "将区块链网络分割为多个并行分片",
        definition: "分片是一种扩容技术，将区块链网络分割为多个并行处理的分片，每个分片处理一部分交易。这大幅提升了网络吞吐量，同时保持去中心化特性。",
        background: "分片技术借鉴了数据库的分片概念，以太坊 2.0 将分片作为扩容路线图的一部分。Near、Harmony 等新公链已实现分片技术。",
        applications: "以太坊 2.0（计划中）、Near Protocol、Harmony、Zilliqa 等高性能公链。",
        category: "扩容方案",
        clicks: 320,
      },
      {
        name: "MEV",
        nameEn: "Maximal Extractable Value",
        brief: "通过重排交易顺序获取的额外价值",
        definition: "MEV 是指区块生产者（矿工或验证者）通过控制交易顺序、插入或审查交易来获取的额外利润。常见形式包括抢跑交易、三明治攻击等，这既是盈利机会也引发公平性争议。",
        background: "MEV 现象在 DeFi 兴起后变得显著，2020 年后成为研究热点。Flashbots 等项目致力于使 MEV 提取更加透明和公平。",
        applications: "套利机器人、清算操作、DEX 交易优化、区块空间拍卖等。",
        category: "高级概念",
        clicks: 270,
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
