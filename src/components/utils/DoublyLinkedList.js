export class DoublyLinkedListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
      this.address = Math.random().toString(16).substr(2, 6);
    }
  }
  
  export class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    insertAtHead(value) {
      const newNode = new DoublyLinkedListNode(value);
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    }
  
    insertAtTail(value) {
      const newNode = new DoublyLinkedListNode(value);
      if (!this.tail) {
        this.head = this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    search(value, callback) {
      let current = this.head;
      let index = 0;
    
      const searchStep = () => {
        if (!current) {
          callback(-1);
          return;
        }
    
        callback(index);
    
        if (current.value === value) return;
        current = current.next;
        index++;
    
        setTimeout(searchStep, 500);
      };
    
      searchStep();
    }
    
    insertAtIndex(value, index) {
        if (index === 0) {
          this.insertAtHead(value);
          return;
        }
      
        const newNode = new DoublyLinkedListNode(value);
        let current = this.head;
        let i = 0;
      
        while (current && i < index) {
          current = current.next;
          i++;
        }
      
        if (!current) {
          this.insertAtTail(value);
          return;
        }
      
        newNode.prev = current.prev;
        newNode.next = current;
      
        if (current.prev) {
          current.prev.next = newNode;
        }
        current.prev = newNode;
      }
      
  
    deleteAtIndex(index) {
      if (index === 0 && this.head) {
        this.head = this.head.next;
        if (this.head) this.head.prev = null;
        else this.tail = null;
        return;
      }
  
      let current = this.head;
      let i = 0;
  
      while (current && i < index) {
        current = current.next;
        i++;
      }
  
      if (!current) return;
  
      if (current.prev) current.prev.next = current.next;
      if (current.next) current.next.prev = current.prev;
  
      if (current === this.tail) this.tail = current.prev;
    }
  
    deleteHead() {
      if (!this.head) return;
      this.head = this.head.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
    }
  
    deleteTail() {
      if (!this.tail) return;
      this.tail = this.tail.prev;
      if (this.tail) this.tail.next = null;
      else this.head = null;
    }
  
    generateRandomList() {
      this.head = this.tail = null;
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
          prevAddress: current.prev ? current.prev.address : null,
        });
        current = current.next;
      }
      return arr;
    }
  }
  