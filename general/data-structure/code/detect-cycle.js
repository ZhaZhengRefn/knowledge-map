module.exports = function detectCycle(head) {
  if (!head || !head.next) return null
  
  let fast = head
  let slow = head

  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next

    if (fast === slow) break
  }

  if (!fast || !fast.next) return null

  slow = head
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }
  return fast
}