import React from 'react';
import CopyButton from './CopyButton';

const codeSnippets = {
  'Singly Linked List': {
    Python: `class Node:\n  def __init__(self, data):\n    self.data = data\n    self.next = None\n\nclass SinglyLinkedList:\n  def __init__(self):\n    self.head = None\n\n  def append(self, data):\n    new_node = Node(data)\n    if not self.head:\n      self.head = new_node\n      return\n    temp = self.head\n    while temp.next:\n      temp = temp.next\n    temp.next = new_node`,
    Java: `class Node {\n  int data;\n  Node next;\n  Node(int d) { data = d; next = null; }\n}\n\nclass SinglyLinkedList {\n  Node head;\n  void append(int data) {\n    Node newNode = new Node(data);\n    if (head == null) { head = newNode; return; }\n    Node temp = head;\n    while (temp.next != null) temp = temp.next;\n    temp.next = newNode;\n  }\n}`,
    C: `struct Node {\n  int data;\n  struct Node* next;\n};\n\nvoid append(struct Node** head_ref, int data) {\n  struct Node* new_node = malloc(sizeof(struct Node));\n  new_node->data = data;\n  new_node->next = NULL;\n  if (*head_ref == NULL) {\n    *head_ref = new_node;\n    return;\n  }\n  struct Node* temp = *head_ref;\n  while (temp->next != NULL) temp = temp->next;\n  temp->next = new_node;\n}`
  },
  'Doubly Linked List': {
    Python: `class Node:\n  def __init__(self, data):\n    self.data = data\n    self.prev = None\n    self.next = None\n\nclass DoublyLinkedList:\n  def __init__(self):\n    self.head = None\n\n  def append(self, data):\n    new_node = Node(data)\n    if not self.head:\n      self.head = new_node\n      return\n    temp = self.head\n    while temp.next:\n      temp = temp.next\n    temp.next = new_node\n    new_node.prev = temp`,
    Java: `class Node {\n  int data;\n  Node prev, next;\n  Node(int d) { data = d; prev = next = null; }\n}\n\nclass DoublyLinkedList {\n  Node head;\n  void append(int data) {\n    Node newNode = new Node(data);\n    if (head == null) { head = newNode; return; }\n    Node temp = head;\n    while (temp.next != null) temp = temp.next;\n    temp.next = newNode;\n    newNode.prev = temp;\n  }\n}`,
    C: `struct Node {\n  int data;\n  struct Node *prev, *next;\n};\n\nvoid append(struct Node** head_ref, int data) {\n  struct Node* new_node = malloc(sizeof(struct Node));\n  new_node->data = data;\n  new_node->next = NULL;\n  new_node->prev = NULL;\n  if (*head_ref == NULL) {\n    *head_ref = new_node;\n    return;\n  }\n  struct Node* temp = *head_ref;\n  while (temp->next != NULL) temp = temp->next;\n  temp.next = new_node;\n  new_node.prev = temp;\n}`
  },
  'Circular Linked List': {
  Python: `class Node:\n  def __init__(self, data):\n    self.data = data\n    self.next = None\n\nclass CircularLinkedList:\n  def __init__(self):\n    self.head = None\n\n  def append(self, data):\n    new_node = Node(data)\n    if not self.head:\n      self.head = new_node\n      new_node.next = new_node\n    else:\n      temp = self.head\n      while temp.next != self.head:\n        temp = temp.next\n      temp.next = new_node\n      new_node.next = self.head`,
  Java: `class Node {\n  int data;\n  Node next;\n  Node(int data) {\n    this.data = data;\n    this.next = null;\n  }\n}\n\nclass CircularLinkedList {\n  Node head = null;\n\n  void append(int data) {\n    Node newNode = new Node(data);\n    if (head == null) {\n      head = newNode;\n      newNode.next = head;\n    } else {\n      Node temp = head;\n      while (temp.next != head) {\n        temp = temp.next;\n      }\n      temp.next = newNode;\n      newNode.next = head;\n    }\n  }\n}`,
  C: `#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n  int data;\n  struct Node* next;\n};\n\nvoid append(struct Node** head_ref, int data) {\n  struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));\n  new_node->data = data;\n  if (*head_ref == NULL) {\n    *head_ref = new_node;\n    new_node->next = new_node;\n  } else {\n    struct Node* temp = *head_ref;\n    while (temp->next != *head_ref) {\n      temp = temp->next;\n    }\n    temp->next = new_node;\n    new_node->next = *head_ref;\n  }\n}`
  }
};

const timeComplexities = [
  { operation: 'Insert at Head', best: 'O(1)', avg: 'O(1)', worst: 'O(1)' },
  { operation: 'Insert at Tail', best: 'O(1)*', avg: 'O(n)', worst: 'O(n)' },
  { operation: 'Insert at Position', best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
  { operation: 'Delete at Position', best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
  { operation: 'Search', best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
  { operation: 'Traverse', best: 'O(1)', avg: 'O(n)', worst: 'O(n)' },
];

const CodeDisplay = ({ type }) => {
  const snippets = codeSnippets[type];

  return (
    <div className="bg-white p-4 rounded shadow-md space-y-6">
      <h3 className="font-semibold mb-3">💻 {type} Code</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {snippets &&
          Object.entries(snippets).map(([lang, code]) => (
            <div key={lang} className="relative">
              <strong>{lang}</strong>
              <CopyButton text={code} className="absolute top-0 right-0" />
              <pre className="bg-gray-100 p-2 rounded mt-1 whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          ))}
      </div>

      {/* Time Complexity Table */}
      <div>
        <h4 className="font-semibold mt-6 mb-2">⏱ Time Complexities</h4>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-3 py-1 border">Operation</th>
                <th className="px-3 py-1 border">Best</th>
                <th className="px-3 py-1 border">Average</th>
                <th className="px-3 py-1 border">Worst</th>
              </tr>
            </thead>
            <tbody>
              {timeComplexities.map((row) => (
                <tr key={row.operation} className="border-t">
                  <td className="px-3 py-1 border">{row.operation}</td>
                  <td className="px-3 py-1 border">{row.best}</td>
                  <td className="px-3 py-1 border">{row.avg}</td>
                  <td className="px-3 py-1 border">{row.worst}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs mt-1 text-gray-500">*O(1) if tail pointer is maintained</p>
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
