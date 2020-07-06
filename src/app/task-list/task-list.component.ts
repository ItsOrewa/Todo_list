import { Component, OnInit } from '@angular/core';
import{TaskService} from '../shared/task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService : TaskService ) { }

  taskArray=[];
  showDeletedMessage : boolean;
  searchText : string = "" ;

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      list => {
        this.taskArray= list.map(item => {
          return {
            $key : item.key,
            ...item.payload.val()};
        });
      });
  
    
  }
  onDelete($key){
if(confirm ('Are you sure you want to delete this task ?')){
  this.taskService.deleteTask($key);
  this.showDeletedMessage = true;
  setTimeout(() => this.showDeletedMessage=false,3000);
}
  }

  filterCondition(task){
    
    return task.taskDate.indexOf(this.searchText) != -1 ; 

  }



}
