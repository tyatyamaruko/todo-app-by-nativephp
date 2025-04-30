import { createTask, deleteTask, updateTaskStatus } from "./apiClient.js";

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
        const hoveredOnPending = event.target.id === "pending" || event.target.closest(".kanban-column-content").id === "pending";
        const hoveredOnInProgress = event.target.id === "in-progress" || event.target.closest(".kanban-column-content").id === "in-progress";
        const hoveredOnDone = event.target.id === "done" || event.target.closest(".kanban-column-content").id === "done";

        if (hoveredOnPending || hoveredOnInProgress || hoveredOnDone) {
            const id = event.dataTransfer.getData("text");
            if (hoveredOnPending) {
                const draggableElement = document.getElementById(id);
                document.getElementById('pending').appendChild(draggableElement);
                updateTaskStatus(id, "pending");
            }
            if (hoveredOnInProgress) {
                const draggableElement = document.getElementById(id);
                document.getElementById('in-progress').appendChild(draggableElement);
                updateTaskStatus(id, "in-progress");
            }
            if (hoveredOnDone) {
                const draggableElement = document.getElementById(id);
                document.getElementById('done').appendChild(draggableElement);
                updateTaskStatus(id, "done");
            }
        }
    }

    function deleteTaskHandle(event) {
        if (confirm("本当にこのタスクを削除しますか？")) {
            const id = event.target.closest(".kanban-card").id;
            deleteTask(id);
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