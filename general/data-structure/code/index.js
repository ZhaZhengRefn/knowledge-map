const LinkedList = require('./linked-list')

const linkedList = new LinkedList()

linkedList.addAtHead(1)
linkedList.addAtHead(2)
linkedList.addAtHead(3)
linkedList.addAtHead(4)
linkedList.addAtHead(5)
// linkedList.addAtTail(2)
const delResult = linkedList.deleteAtIndex(4)

const result = linkedList.toString()
console.log(result, delResult)