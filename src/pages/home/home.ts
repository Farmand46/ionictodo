import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import {TodoProvider} from "../../providers/todo/todo";
import {ArchivedTodosPage} from "../archived-todos/archived-todos";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reorderIsEnabled=false;

  // Til brug for det deklarative kald til det andet vindue
  public archivedTodosPage = ArchivedTodosPage;

  constructor(private toastController: ToastController, private todoProvider: TodoProvider, public navCtrl: NavController, private alertController: AlertController) {
    this.todos = this.todoProvider.getTodos();

  }

  archiveTodo(todoIndex){
    this.todoProvider.archiveTodo(todoIndex);
  }

  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){
    this.reorderIsEnabled=!this.reorderIsEnabled;
  }

  itemReorder($event){
    reorderArray(this.todos,$event);
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

          addTodoAlert.onDidDismiss(()=>{
            let addTodoToast = this.toastController.create({
              message: "Tilføjet Todo",
              duration: 2000
            });
            addTodoToast.present();
          });
        }
        }
      ]
    });
    addTodoAlert.present();
  }

  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Ret Todo",
      message: "Ret din Todo",
      inputs:[
        {
          type: "text",
          name: "addTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Gem Todo",
          handler: (inputData)=>{
          let todoText;
          todoText = inputData.addTodoInput;
          //this.todos.push(todoText);
          this.todoProvider.editTodo(todoText,todoIndex);

          editTodoAlert.onDidDismiss(()=>{
            let editTodoToast = this.toastController.create({
              message: "Todo er ændret",
              duration: 2000
            });
            editTodoToast.present();
          });
        }
        }
      ]
    });
    editTodoAlert.present();

  }

}
