/**
 * 1.两链表有交点，则将第二个链表接在第一个链表尾部，必然会形成一个环。环的入口就是交点
 * 2.进入链表交点之后，节点必然是同步的。因为减去两链表长度差，再同步步长循环链表，则可以找出交点
 */
const detectCycle = require('./detect-cycle')

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null

  let tailA = headA
  while (tailA && tailA.next) {
    tailA = tailA.next
  }
  tailA.next = headB

  // 从headA开始寻找环入口
  return detectCycle(headA)
}

module.exports = exports = getIntersectionNode