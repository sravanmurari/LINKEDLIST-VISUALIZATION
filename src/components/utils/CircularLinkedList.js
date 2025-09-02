// Address generator (simulating memory addresses)
const generateRandomAddress = () => {
    return Math.random().toString(16).slice(2, 10).toUpperCase();
  };
  
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.address = generateRandomAddress();
    }
  }
  
  export class CircularLinkedList {
    constructor() {
      this.head = null;
    }
  
    insertAtHead(value) {
      const newNode = new Node(value);
      if (!this.head) {
        newNode.next = newNode;
        this.head = newNode;
      } else {
        let tail = this.head;
        while (tail.next !== this.head) {
          tail = tail.next;
        }
        newNode.next = this.head;
        tail.next = newNode;
        this.head = newNode;
      }
    }
  
    insertAtTail(value) {
        const newNode = new Node(value);
        if (!this.head) {
          this.head = newNode;
          newNode.next = newNode;
        } else {
          let temp = this.head;
          while (temp.next !== this.head) {
            temp = temp.next;
          }
          temp.next = newNode;
          newNode.next = this.head;
        }
      }
      
  
    insertAtIndex(value, index) {
      if (index === 0) {
        this.insertAtHead(value);
        return;
      }
  
      let newNode = new Node(value);
      let current = this.head;
      let prev = null;
      let count = 0;
  
      while (count < index && current.next !== this.head) {
        prev = current;
        current = current.next;
        count++;
      }
  
      if (count !== index) {
        console.warn('Index out of bounds');
        return;
      }
  
      newNode.next = current;
      prev.next = newNode;
    }
  
    deleteHead() {
      if (!this.head) return;
  
      if (this.head.next === this.head) {
        this.head = null;
        return;
      }
  
      let tail = this.head;
      while (tail.next !== this.head) {
        tail = tail.next;
      }
  
      this.head = this.head.next;
      tail.next = this.head;
    }
  
    deleteTail() {
      if (!this.head) return;
  
      if (this.head.next === this.head) {
        this.head = null;
        return;
      }
  
      let current = this.head;
      let prev = null;
  
      while (current.next !== this.head) {
        prev = current;
        current = current.next;
      }
  
      prev.next = this.head;
    }
  
    deleteAtIndex(index) {
      if (!this.head) return;
  
      if (index === 0) {
        this.deleteHead();
        return;
      }
  
      let current = this.head;
      let prev = null;
      let count = 0;
  
      while (count < index && current.next !== this.head) {
        prev = current;
        current = current.next;
        count++;
      }
  
      if (count !== index || current === this.head) {
        console.warn('Index out of bounds');
        return;
      }
  
      prev.next = current.next;
    }
  
    generateRandomList(length = 4) {
      this.head = null;
      for (let i = 0; i < length; i++) {
        const value = Math.floor(Math.random() * 100);
        this.insertAtTail(value);
      }
    }
    search(value, callback) {
        if (!this.head) {
          callback(-1);
          return;
        }
      
        let current = this.head;
        let index = 0;
      
        const searchStep = () => {
          callback(index);
      
          if (current.value === value) return;
      
          current = current.next;
          index++;
      
          if (current === this.head) {
            callback(-1); // Looped entire list, not found
            return;
          }
      
          setTimeout(searchStep, 500);
        };
      
        searchStep();
      }
      

    toArray() {
        const result = [];
        if (!this.head) return result;
      
        let current = this.head;
        do {
          const isTail = current.next === this.head;
      
          result.push({
            value: current.value,
            address: current.address,
            nextAddress: isTail ? this.head.address : current.next.address,
            nextLabel: isTail ? "HEAD" : undefined,
            prevAddress: null, // Not used in CLL
          });
      
          current = current.next;
        } while (current !== this.head);
      
        return result;
      }
      
      

  }
  