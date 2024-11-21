import { Routes } from '@angular/router';
import { BlogComponent } from '../components/blog/blog.component';
import { HomeComponent } from '../components/home/home.component';
import { ContactComponent } from '../components/contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
   
];
