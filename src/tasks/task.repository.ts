import { EntityRepository, Repository } from "typeorm";
import { Task } from "../tasks/task.entity";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository <Task> {

  //Getting all task with filters
  async getTask(filterDto : GetTasksFilterDto) : Promise<Task[]> {
    
    const { status, search } = filterDto;

    //Creating a query builder, that interacts with the task table
    const query = this.createQueryBuilder('task');

   if(status) {
     query.andWhere('task.status = :status', { status });
   }


   if (search) {
     query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`});
   }


    //Find the search results for the query
    const tasks = await query.getMany();
    return tasks;

  }
  
  
  
  
  //Creating a task
  async createTask(createTaskDto: CreateTaskDto) : Promise<Task> {

     //destruction title and description from CreateTaskDto
     const { title, description } = createTaskDto;

    const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

       await task.save();

       return task;
  }

}