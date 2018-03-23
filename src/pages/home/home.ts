import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];

  constructor(private todoProvider: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoProvider.getTodos();

  }

  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Tilføj Todo",
      message: "Indtast din Todo",
      inputs:[
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Tilføj Todo",
          handler: (inputData)=>{
          let todoText;
          todoText = inputData.addTodoInput;
          //this.todos.push(todoText);
          this.todoProvider.addTodo(todoText);
        }
        }
      ]
    });
    addTodoAlert.present();

  }

}
