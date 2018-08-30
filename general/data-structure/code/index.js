import LinkedList from './linked-list'

const linkedList = new LinkedList()

linkedList.addAtHead(1)
linkedList.addAtHead(2)
linkedList.addAtHead(1)

const result = linkedList.toArray()
console.log(result)