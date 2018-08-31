/**
 * 测试链表是否有环：快慢指针法
 * 遍历快指针，快指针每次移动两步，慢指针每次移动一步。快慢指针相同时退出循环
 * @param { LinkedNode } head 
 */

module.exports = function hasCycle(head) {
  if (!head || !head.next) return false
  
  let fast = head
  let slow = head

  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) {
      return true
    }
  }
  return false
}