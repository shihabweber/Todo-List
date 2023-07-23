const taskInput=document.querySelector(".task-input input")
const taskbox=document.querySelector(".task-box")
filters=document.querySelectorAll(".filters span")
clearAll = document.querySelector(".clear-btn")

localStorage.clear()

let todos=JSON.parse(localStorage.getItem("todo_list"))

let editId;
let isEditedTask=false;;

filters.forEach((btn,id)=>{
	btn.addEventListener("click",()=>{
	document.querySelector("span.active").classList.remove("active")
	btn.classList.add("active")	
	showtodo(btn.id)
	
	})
})	
showtodo("all")		
function showtodo(filter){
	let li=""
	if (todos){
		todos.forEach((todo,id)=>{
		let isCompleted=todo.status=="completed"?"checked":"";
		if(filter==todo.status||filter=="all"){
			li+=`<li class="task">
					<label for="${id}">	
						<input type="checkbox" id="${id}" ${isCompleted} onclick="updateStatus(this)">
						<p class="${isCompleted}">${todo.name}</p>
					</label>
					<div class="settings">
						<i onclick="showmenu(this)" class="uil uil-ellipsis-h"></i>
						<ul class="task-menu">
							<li onclick="edittask(${id},'${todo.name}')" ><i class="uil uil-pen"></i>Edit</li>
							<li onclick="deletetask(${id})"><i  class="uil uil-trash"></i>Delete</li>
						</ul>
					</div>
			</li>`
		}	
	})
	}
	taskbox.innerHTML=li||`<span>You don't have any task here</span>`; 
}//e.target.tagName!="I"||e.target!=selectedTask


function edittask(taskid,taskname){
	taskInput.value=taskname
	editId=taskid
	isEditedTask=true;
}

clearAll.addEventListener("click", () => {
    isEditedTask=false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo_list", JSON.stringify(todos));
    showtodo("all")
});

function deletetask(deleteid){
	todos.splice(deleteid,1)
	localStorage.setItem("todo_list",JSON.stringify(todos))
	showtodo("all")
	
}
function showmenu(selectedTask){
	
	let taskName=selectedTask.parentElement.lastElementChild;
	taskName.classList.add("show")
	document.addEventListener("click",e=>{
		
		if(e.target.tagName!="I"||e.target!=selectedTask ){
			
			taskName.classList.remove("show")
		}
	})
}

function updateStatus(selectedTask){
	
	let taskName=selectedTask.parentElement.lastElementChild;
	if (selectedTask.checked){
		taskName.classList.add("checked")
		
		todos[selectedTask.id].status="completed"
	}else{
		taskName.classList.remove("checked")
		todos[selectedTask.id].status="pending"
	}
	localStorage.setItem("todo_list",JSON.stringify(todos))
}

taskInput.addEventListener("keyup",e=>{
	
	let usertask=taskInput.value.trim()
	if (e.key=="Enter" && usertask) {
		if(!isEditedTask){
			if (!todos){
			todos=[]
		}
		let taskinfo={name:usertask,status:"pending"}
		todos.push(taskinfo)
		}else{
			isEditedTask=false;
			todos[editId].name=usertask;
		}
		taskInput.value=""
		localStorage.setItem("todo_list",JSON.stringify(todos))
		showtodo("all")
		
	}
})

