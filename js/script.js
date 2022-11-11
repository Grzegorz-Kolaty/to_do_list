{
   let tasks = [
      {
         content: "kodzić troche",
         done: true,
      },
      {
         content: "pograc w gry",
         done: false,
      },
   ];

   let hideDoneTasks = false;

   // funkcja totalnie nic nie dodaje, nie rozumiem dlaczego
   const addNewTask = (newTaskContent, taskIndex) => {
      tasks = tasks.map((task, index) => {
         if (index === taskIndex)   // wiem, że powinien tu być warunek ale nie rozumiem dlaczego
         return {
               ...task,
               content: newTaskContent, done: false,
            }
            return task; // nie wiem dlaczego musze zwrocic task
      });
      render();
   };

   /*  kod który działa ale chciałem go zrobić z użyciem .map
   const addNewTask = (newTaskContent) => {
        tasks = [
           ...tasks,
           { content: newTaskContent, done: false },
        ];
        render();
     };
    
   */

   const removeTask = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };

   const toggleTaskDone = (taskIndex) => {
      tasks = tasks.map((task, index) => {
         if (index === taskIndex) {       // wiem, że powinien tu być warunek ale nie rozumiem dlaczego
            return {
               ...task,
               done: !task.done,
            }
         }
         return task; // nie wiem dlaczego musze zwrocic task
      });

      render();
   };

   /*   kod który działa ale chciałem go zrobić z użyciem .map
   const toggleTaskDone = (taskIndex) => {
      tasks = [
         ...tasks.slice(0, taskIndex),
         { ...tasks[taskIndex], done: !tasks[taskIndex].done },
         ...tasks.slice(taskIndex + 1),
      ];
      render();
   };
   */


   const bindEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButtons, index) => {
         removeButtons.addEventListener("click", () => {
            removeTask(index);
         });
      });

      const toggleDoneButtons = document.querySelectorAll(".js-done");

      toggleDoneButtons.forEach((toggleDoneButton, index) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
         });
      });
   }

   const renderTasks = () => {
      let htmlString = "";
      for (const task of tasks) {
         htmlString += `
         <li class="list__tasks">
           <button class="js-done${task.done ? " list__checkButton--true" : " list__checkButton"}">✔</button>
           <span class="list__item${task.done ? " list__item--done" : ""}">${task.content}</span>
           <button class="js-remove list__removeButton">🗑</button>
         </li>
      `;
      };

      document.querySelector(".js-tasks").innerHTML = htmlString;
   }

   const renderButtons = () => { }

   const bindButtonsEvents = () => {


   }

   const render = () => {
      renderTasks();
      renderButtons();
      bindButtonsEvents()

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const inputField = document.querySelector(".js-newTask");
      const newTaskContent = inputField.value.trim();

      if (newTaskContent === "") {
         return;
      }

      addNewTask(newTaskContent);
      inputField.value = "";  // cleaning up input field 

      const focusField = document.querySelector(".js-newTask--button")
      focusField.addEventListener("click", (event => {
         document.querySelector(".js-newTask").focus(); // input field focus after click
         onFormSubmit(event);

      }));
   };

   const init = () => {
      render();

      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);

   };
   init();
}