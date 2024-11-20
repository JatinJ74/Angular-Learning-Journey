import { Routes } from "@angular/router";
import { routes as userRoutes } from "./users/users.routes";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,

    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        //static data binding using data which takes data object
        data: {
            message: "Hello World"
        },
        // dynamic data binding using resolve 
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle,

    },
    {
        path: '**',
        component: NotFoundComponent
    },

]