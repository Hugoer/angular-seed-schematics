import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>Component } from './<%=dasherize(name)%>/<%=dasherize(name)%>.component';

const routes: Routes = [{
    path: '',
    component: <%= classify(name) %>Component,
    data: {
    pageTitle: '<%=dasherize(name)%>.title'
}
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class <%= classify(name) %>RoutingModule { }
