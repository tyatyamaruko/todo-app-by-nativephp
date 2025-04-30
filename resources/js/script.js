import ApiClient from "./apiClient.js";

document.addEventListener("DOMContentLoaded", function() {
    let cards = document.querySelectorAll(".kanban-card");
    let columns = document.querySelectorAll(".kanban-column-content");
    let deleteButtons = document.querySelectorAll(".deleteTaskButton");
    cards.forEach(card => {
        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);
    });
    columns.forEach(column => {
        column.addEventListener("dragover", dragOver);
        column.addEventListener("drop", drop);
    });
    deleteButtons.forEach(column => {
        column.addEventListener("click", deleteTaskHandle);
    });

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
        setTimeout(() => {
            event.target.classList.add("hidden");
        }, 0);
    }

    function dragEnd(event) {
        event.target.classList.remove("hidden");
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let statusType = null;
        if (event.target.id === "pending" || event.target.closest(".kanban-column-content").id === "pending") {
            statusType = "pending";
        } else if (event.target.id === "in-progress" || event.target.closest(".kanban-column-content").id === "in-progress") {
            statusType = "in-progress";
        } else if (event.target.id === "done" || event.target.closest(".kanban-column-content").id === "done") {
            statusType = "done";
        }
        if (!statusType) {
            return;
        }
        const id = event.dataTransfer.getData("text");
        const draggableElement = document.getElementById(id);
        document.getElementById(statusType).appendChild(draggableElement);
        updateTaskStatus(id, statusType);
    }

    function deleteTaskHandle(event) {
        if (confirm("本当にこのタスクを削除しますか？")) {
            const id = event.target.closest(".kanban-card").id;
            deleteTask(id);
        }
    }

    // Task addition logic
    const addTaskButton = document.getElementById("addTaskButton");
    const modal = document.getElementById("modal");
    const saveTaskButton = document.getElementById("saveTaskButton");
    const taskTitleInput = document.getElementById("taskTitleInput");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");
    const taskDeadlineInput = document.getElementById("taskDeadlineInput");
    addTaskButton.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });
    saveTaskButton.addEventListener("click", () => {
        const taskTitle = taskTitleInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        const taskDeadline = taskDeadlineInput.value.trim() || null;

        if (taskTitle && taskDescription) {

            try {
                // Send data to the server
                createTask(taskTitle, taskDescription, taskDeadline);

                taskTitleInput.value = ""; // Clear the title input
                taskDescriptionInput.value = ""; // Clear the description input
                modal.classList.add("hidden"); // Hide the modal
            } catch (err) {
                alert("タスクの作成に失敗: " + err.message);
            }
        }
    });
    document.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.classList.add("hidden"); // Hide modal if clicked outside
        }
    });
});

const apiClient = new ApiClient("");

function createTask (taskTitle, taskDescription,taskDeadline) {
    apiClient.post('/create', {
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    )
    .then(_ => {
        window.location.reload();
    })
    .catch(err => {
        throw err;
    });
}

function updateTaskStatus(taskId, status) {
    apiClient.post(`/update/${taskId}`, {
        status: status
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(_ => {
        window.location.reload();
    })
    .catch(err => {
        throw err;
    });
}

function deleteTask(taskId) {
    apiClient.post(`/delete/${taskId}`, {})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(_ => {
        window.location.reload();
    })
    .catch(err => {
        throw err;
    });
}

