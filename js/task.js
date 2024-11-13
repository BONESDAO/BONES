document.addEventListener("DOMContentLoaded",function(){const task1=document.getElementById('task1');const container=document.querySelector('.container');const tg=window.Telegram.WebApp;const user=tg.initDataUnsafe.user;const id=user.id;const flag=[];fetch("/api/task/",{method:'GET'}).then(response=>{if(!response.ok){throw new Error('Network response was not ok');}
return response.json();}).then(data=>{console.log(data);if(data.success){data.tasks.forEach(task=>{const taskElement=document.createElement('div');taskElement.id=`task${task.tid}`;taskElement.classList.add('task');taskElement.innerHTML=`
                <div  class="label2" style="font-weight: bold;">${task.title}</div>
                <div class="checkbox ">
                    <svg viewBox="0 0 24 24" width="16" height="16" >
                        <path d="M9 16.2l-4.2-4.2-1.4 1.4 5.6 5.6 12-12-1.4-1.4z"></path>
                    </svg>
                </div>
                `
container.appendChild(taskElement);taskElement.addEventListener('click',()=>{handleTaskClick(task);});})}
fetch("/api/task/finish",{method:'POST',headers:{'Content-Type':'application/json',},body:JSON.stringify({id}),}).then(response=>response.json()).then(data=>{console.log(data);if(data.success){data.tasks.forEach(task=>{const taskElement=document.getElementById(`task${task.tid}`);if(taskElement){taskElement.classList.add('completed');const checkboxElement=taskElement.querySelector('.checkbox');if(checkboxElement){checkboxElement.classList.add('checked');}
const labelElement=taskElement.querySelector('.label2');if(labelElement){labelElement.classList.remove('label2');labelElement.classList.add('label1');}
taskElement.style.pointerEvents='none';}});}else{console.error("Failed to fetch completed tasks:",data.message);}}).catch(error=>{})}).catch(error=>{console.error('There was a problem with the fetch operation:',error);});function handleTaskClick(task){fetch('/api/task/complete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tid:task.tid,id:id,skull:task.rewards})}).then(response=>response.json()).then(data=>{if(data.success){console.log("Task completed successfully:",data.message);window.location.reload();}})
window.open(task.url,'_blank');}});