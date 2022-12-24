const state = {
    taskList: [],
  };
 
const taskModal = document.querySelector(".task__modal__body");
const taskContents = document.querySelector(".task__contents");

// console.log(taskModel);

//get
const htmlTaskContent = ({id, title, type, description ,url}) => `
    <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-m task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id}>
                    <i class='fas fa-pencil-alt' name=${id}></i>
                </button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class='fas fa-trash-alt' name=${id}></i>
                </button>               
            </div>
            <div class='card-body'>
                ${
                    url
                      ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                      : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                }
                <h4 class='task__card__title'>${title}</h4>
                <p class='description trim-3-lines text-muted' data-gram_editor='false'>${description}</p>
                <div class='tags text-white d-flex flex-wrap'>
                    <span class='badge bg-primary m-1'>${type}</span>
                </div>
            </div>
            <div class='card-footer'>
                <button 
                type='button' 
                class='btn btn-outline-primary float-right' 
                data-bs-toggle='modal'
                data-bs-target='#showTask'
                id=${id}
                onclick='openTask.apply(this, arguments)'>
                Open Task
                </button>
            </div>
        </div>
    </div>
`;
const htmlModalContent = ({id, title, type, description ,url}) => {
    const date= new Date(parseInt(id));
    return `
    <div id=${id}>
        ${
            url 
                ? `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
                : `<img width='100%' height='150px' style="object-fit: cover; object-position: center"  src="https://tse3.mm.bing.net/th?id=OIP.LZsJaVHEsECjt_hv1KrtbAHaHa&pid=Api&P=0" alt='card image cap' class='card-image-top md-3 rounded-lg' />`
        }
        <strong class="text -sm text-muted">Created On ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="lead">${description}</p>
    </div>`;
};
//i updating our local storage(i.e.,the modals/cards which we see on our ui)

const updateLocalStorage = () => {
    localStorage.setItem(
        "task",
        JSON.stringify({
          tasks: state.taskList,
        })
      );
};

//get gata on ur UI from local storage(Browser Storage)
const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));

  });
};

const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input ={
        url: document.getElementById("imageUrl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };

    if (input.title === "" || input.type === "" || input.description === "") {
        return alert("Please Fill All The Fields");
    
    }

    taskContents.insertAdjacentHTML(
        "beforeend",
        htmlTaskContent({
            ...input,
            id,
        })
    );

    //updated my tasklist
    state.taskList.push({ ...input, id });

    // //update the same on localstorage 
    updateLocalStorage();
};

const openTask = (e) => {
    // pop up the current one
    if (!e) e = window.event;

    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
};

// delete operation the operation

const deleteTask = (e) => {
    if (!e) e = window.event;

   
    const targetID = e.target.getAttribute("name");
    // console.log(targetID);

    const type = e.target.tagName;
    // console.log(type);

    const removeTask = state.taskList.filter(({ id }) => id !== targetID);
    console.log(removeTask);
  
};


