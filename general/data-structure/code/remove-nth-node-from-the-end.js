/**
 * 删除倒数第k个节点
 * 设置双指针，第二个指针先走k步。以同样的步长循环链表，到后者指针到达链表尾节点，则前者即是所求
 */

function removeNode(head, n) {
  let first = head
  let second = head
  let count = 0

  while (count < n) {
    second = second.next
    count ++
  }
  
  while (second.next) {
    first = first.next
    second = second.next
  }

  let temp = first.next
  first.next = first.next.next
  temp.next = null
}

module.exports = removeNode