// Create
const idb = window.indexedDB
   || window.mozindexedDB
   || window.webkitIndexedDB
   || window.msIndexedDB
   || window.shimIndexedDB;

export const createIndexedDB = () => {
   if (!idb) {
      console.log('No indexedDB');
      return
   };

   const openRequest = idb.open('test-db', 1);

   openRequest.onerror = () => {
      console.error("Error", openRequest.error);
   };

   openRequest.onupgradeneeded = (e) => {
      const db = openRequest.result;

      if (!db.objectStoreNames.contains("todos")) {
         db.createObjectStore("todos", { keyPath: 'id' })
      };
   };

   openRequest.onsuccess = () => {
      console.log('Database opened successfully');
   };
}

// Get
export const getAllTodos = (getTodosList) => {
   const dbPromise = idb.open('test-db', 1);

   dbPromise.onsuccess = () => {

      const db = dbPromise.result;

      const transaction = db.transaction("todos", "readonly");

      const todos = transaction.objectStore("todos");

      const todosList = todos.getAll();

      todosList.onsuccess = (query) => {
         getTodosList(query.srcElement.result);
      };

      todosList.onerror = () => {
         console.error("Error", todosList.error);
      };

      transaction.oncomplete = () => {
         db.close();
      };
   };
};

// Add
export const addTodo = (todo) => {
   const dbPromise = idb.open('test-db', 1);

   dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const transaction = db.transaction("todos", "readwrite");

      const todos = transaction.objectStore("todos");

      const request = todos.put(todo);

      request.onsuccess = () => {

         transaction.oncomplete = () => {
            db.close();
         };

         console.log("Todo added to the store");
      };

      request.onerror = () => {
         console.log("Error", request.error);
      };
   };
};


// Remove
export const removeTodo = (id) => {
   const dbPromise = idb.open('test-db', 1);

   dbPromise.onsuccess = () => {
      const db = dbPromise.result;

      const transaction = db.transaction("todos", "readwrite");

      const todos = transaction.objectStore("todos");

      const request = todos.delete(id);

      request.onsuccess = () => {
         transaction.oncomplete = () => {
            db.close();
         };

         console.log("Todo delete");
      };

      request.onerror = () => {
         console.log("Error", request.error);
      };
   };
};

// Date
const date = new Date();

// Отримуємо день, місяць і рік
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();

// Отримуємо години і хвилини
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');

// Складаємо всі частини разом у бажаному форматі
export const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;