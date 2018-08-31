const LinkedList = require('../linked-list')

describe('LinkedList', () => {
  test('should create empty linked list ', () => {
    const list = new LinkedList()
    expect(list.toString()).toBe('')
  })

  test('should append node to linked list', () => {
    const list = new LinkedList()
    expect(list.head).toBeNull()
    expect(list.tail).toBeNull()

    list.addAtHead(2)
    list.addAtHead(1)

    expect(list.toString()).toBe('1,2')
    expect(list.tail.next).toBeNull()
  })

  test('should prepend node to linked list', () => {
    const list = new LinkedList()

    list.addAtTail(2)
    expect(list.head.toString()).toBe('2')
    expect(list.tail.toString()).toBe('2')
    
    list.addAtHead(1)
    list.addAtTail(3)
    expect(list.toString()).toBe('1,2,3')
  })

  test('should get node by index', () => {
    const list = new LinkedList()

    expect(list.get(0)).toBe(-1)

    list.addAtHead(1)
    expect(list.get(0)).toBeDefined()

    list.addAtHead(2)
    list.addAtHead(3)
    expect(list.get(1).value).toBe(2)
    expect(list.get(3)).toBe(-1)
  })

  test('should add node by index', () => {
    const list = new LinkedList()
    list.addAtHead(1)
    list.addAtHead(2)
    list.addAtTail(3)
    list.addAtHead(4)

    list.addAtIndex(0, 'add-1')
    expect(list.get(0).value).toBe('add-1')
    
    expect(list.addAtIndex(5, 'add-2')).toBe(-1)

    list.addAtIndex(1, 'add-2')
    expect(list.get(1).value).toBe('add-2')
  })
  
  test('should delete node by index', () => {
    const list = new LinkedList()

    expect(list.deleteAtIndex(0)).toBe(-1)

    list.addAtHead(4)
    list.addAtHead(3)
    list.addAtHead(2)
    list.addAtHead(1)
    
    list.deleteAtIndex(0)
    expect(list.toString()).toBe('2,3,4')
    expect(list.deleteAtIndex(3)).toBe(-1)

    list.deleteAtIndex(2)
    expect(list.toString()).toBe('2,3')

    expect(list.deleteAtIndex(4)).toBe(-1)
  })
  
})