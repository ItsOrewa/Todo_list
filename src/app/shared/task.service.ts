import { Injectable } from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms" ;
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private firebase : AngularFireDatabase) { }
  tasksList : AngularFireList<any>;


  form = new FormGroup({
    $key : new FormControl(null),
    taskName : new FormControl('',Validators.required),
    taskDescription : new FormControl(''),
    taskDate : new FormControl('',Validators.required),
    taskTime : new FormControl('',Validators.required)

  });

getTasks(){

  this.tasksList= this.firebase.list('tasks');
  return this.tasksList.snapshotChanges();
}



insertTask(task){

  this.tasksList.push(
    {
      taskName : task.taskName,
      taskDescription : task.taskDescription,
      taskDate : task.taskDate,
      taskTime : task.taskTime
    }
  );
}

populateForm(task){
  this.form.setValue(task);
}

updateTask(task){
  this.tasksList.update(task.$key,
    {
      taskName : task.taskName,
      taskDescription : task.taskDescription,
      taskDate : task.taskDate,
      taskTime : task.taskTime

    });
}

deleteTask($key : string){
this.tasksList.remove($key);
}

}
