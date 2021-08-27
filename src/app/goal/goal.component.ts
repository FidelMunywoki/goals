import { Quote } from '../quote-class/quote';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert-service/alert.service';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { QuoteRequestService } from '../quote-http/quote-request.service';


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  alertService:AlertService;
  quote!: Quote;
  
 

 
  


  addNewGoal (goal: Goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date (goal.completeDate)
    this.goals.push (goal)
  }

  toggleDetails(index: number){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  //replaced the toggleDetais
  goToUrl(id: any){
    this.router.navigate(['/goals',id])
  }

  //if use toggle use this below ---> deleteGoal(isComplete: boolean, index: number)
  deleteGoal(index: number){
    
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)
      if (toDelete) {
        this.goals.splice(index,1);
        this.alertService.alertMe("The goal has been deleted")

      }
      
  
  }

  constructor(goalService:GoalService, alertService: AlertService, private quoteService:QuoteRequestService, private router:Router) {
    this.goals = goalService.getGoals()
    this.alertService  = alertService;
  }


  ngOnInit(): void {
    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote

   
  }

}
