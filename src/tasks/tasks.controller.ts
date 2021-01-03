import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasKStatusValidationPipe } from './pipes/task.status.validation';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';


@Controller('tasks')
export class TasksController {
    
    constructor(private tasksService: TasksService) {};

    
    @Get()
    //controller method
    getTasks( @Query(ValidationPipe) filterDto:GetTasksFilterDto): Promise<Task[]>{
     return this.tasksService.getTasks(filterDto);
    };


    //tasks/:id
    @Get('/:id')
    //expecting url params /:id(@Get) 
     getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task> {
      return this.tasksService.getTaskById(id);
   };

   @Delete('/:id')
   DeleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
      return this.tasksService.deleteTask(id); 
 };


   @Patch('/:id/status')
   updateTaskStatus(
     @Param('id', ParseIntPipe) id: number, 
     @Body('status', TasKStatusValidationPipe) status: TaskStatus
    ): Promise<Task>{
    return this.tasksService.updateTaskStatus(id, status);
 };




    @Post()
    //using the whole body payload
    //@Body() body 
    
    //controller method
    @UsePipes(ValidationPipe)
    createTask(
       
    @Body() createTaskDto: CreateTaskDto

    ) :Promise<Task> {
         
      //accessing the getAllTasks from the createTask
      return this.tasksService.createTask(createTaskDto)
    };

    
}








//before using dto
    // destructuring the title and description from the body
    // @Body('title') title: string,
    // @Body('description') description: string