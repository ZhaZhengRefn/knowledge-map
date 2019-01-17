/**
 * 面试被人问了抽奖系统的实现，一脸懵逼后，卒
 * 一边甘霖娘，一边实现一遍
 */

/**
 * 需求：
 * 如下四个奖品:
 * 1. iPhone xs - 1台
 * 2. 坚果投影仪 - 3台
 * 3. 折叠办公桌 - 5张
 * 4. 维达纸巾 - 10箱
 * 5. “毛都没有”
 */

// 1. 引入权重概念。每个奖品的概率不应该直接定死，而应该由权重设置。如
// 一等奖：1，二等奖：10，三等奖：66，四等奖：77，没中奖：110
// 每个奖品的中奖概率，为当前奖品权重 / 总权重，那么就可以得出这么一个区间
// 0 -- 0.004 ----- 0.044 ---------- 0.294 ----------- 0.585 ----------------------------- 1
// 按随机数 (0, 1] 来讲，落入区间的概率就很显然了
class Roller {
  constructor() {
    this.collection = []
  }

  add(name, weight) {
    this.collection.push({
      name,
      weight
    })
  }

  roll() {
    // 计算总权重
    let totalWeight = 0;
    const list = this.collection.slice().map(item => (totalWeight += item.weight) && item);

    // 抽奖老哥的终点
    const dest = Math.random();
    let start = 0;

    // 看看是哪位小可爱落入奖品区间
    for (let i = 0; i < list.length; i++) {
      const cur = list[i];
      const end = start + cur.weight / totalWeight;
      if (dest > start && dest <= end) {
        // 中奖区间
        console.log(`中奖区间: ${dest}`)
        return cur;
      }
      // 叠加 start
      start += cur.weight / totalWeight
    }
  }

  getPoints() {
    const criticalPoints = []
    let start = 0;
    let totalWeight = 0;
    const list = this.collection.slice().map(item => (totalWeight += item.weight) && item)

    while (list.length) {
      const item = list.shift();
      start += item.weight / totalWeight;
      criticalPoints.push(start);
    }

    return criticalPoints.toString();
  }
}

const roller = new Roller()
roller.add('iPhone', 1)
roller.add('坚果投影仪', 10)
roller.add('折叠办公桌', 20)
roller.add('维达纸巾', 30)
roller.add('毛都没有', 110)

const result = roller.roll();
console.log(roller.getPoints());

console.log(`哈喽啊锦鲤大哥，你抽中的奖品是——${result.name}。`);