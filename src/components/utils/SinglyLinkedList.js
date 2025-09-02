export class SinglyLinkedListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.address = Math.random().toString(16).substr(2, 6);
    }
  }
  
  export class SinglyLinkedList {
    constructor() {
      this.head = null;
    }
  
    insertAtHead(value) {
      const newNode = new SinglyLinkedListNode(value);
      newNode.next = this.head;
      this.head = newNode;
    }
  
    insertAtTail(value) {
      const newNode = new SinglyLinkedListNode(value);
      if (!this.head) {
        this.head = newNode;
        return;
      }
      let current = this.head;
      while (current.next) current = current.next;
      current.next = newNode;
    }
  
    insertAtIndex(value, index) {
      if (index === 0) return this.insertAtHead(value);
      const newNode = new SinglyLinkedListNode(value);
      let current = this.head;
      let prev = null;
      let i = 0;
  
      while (current && i < index) {
        prev = current;
        current = current.next;
        i++;
      }
  
      if (prev) {
        prev.next = newNode;
        newNode.next = current;
      }
    }
  
    deleteAtIndex(index) {
      if (index === 0 && this.head) {
        this.head = this.head.next;
        return;
      }
  
      let current = this.head;
      let prev = null;
      let i = 0;
  
      while (current && i < index) {
        prev = current;
        current = current.next;
        i++;
      }
  
      if (prev && current) {
        prev.next = current.next;
      }
    }
  
    deleteHead() {
      if (this.head) this.head = this.head.next;
    }
  
    deleteTail() {
      if (!this.head) return;
  
      if (!this.head.next) {
        this.head = null;
        return;
      }
  
      let current = this.head;
      let prev = null;
  
      while (current.next) {
        prev = current;
        current = current.next;
      }
  
      if (prev) prev.next = null;
    }
    search(value, callback) {
      let current = this.head;
      let index = 0;
    
      const searchStep = () => {
        if (!current) {
          callback(-1); // Not found
          return;
        }
    
        callback(index); // Highlight this index
    
        if (current.value === value) return; // Found, stop
        current = current.next;
        index++;
    
        setTimeout(searchStep, 500); // Move to next node after delay
      };
    
      searchStep();
    }
    
    generateRandomList() {
      this.head = null;
      const count = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < count; i++) {
        this.insertAtTail(Math.floor(Math.random() * 100));
      }
    }
  
    toArray() {
      const arr = [];
      let current = this.head;
      while (current) {
        arr.push({
          value: current.value,
          address: current.address,
          nextAddress: current.next ? current.next.address : null,
        });
        current = current.next;
      }
      return arr;
    }
  }
  