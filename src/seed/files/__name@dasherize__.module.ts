import { NgModule } from '@angular/core';

import { <%= classify(name) %>RoutingModule } from './<%=dasherize(name)%>-routing.module';
import { <%= classify(name) %>Component } from './<%=dasherize(name)%>/<%=dasherize(name)%>.component';
import { SharedModule } from '@app/shared/shared.module';

const MATERIAL_<%= name.toUpperCase() %>_MODULES = [
];

@NgModule({
    imports: [
        SharedModule,
        MATERIAL_<%= name.toUpperCase() %>_MODULES,
        <%= classify(name) %>RoutingModule,
    ],
    declarations: [
        <%= classify(name) %>Component,
    ],
    exports: [
        MATERIAL_<%= name.toUpperCase() %>_MODULES,
    ],
})
export class <%= classify(name) %>Module { }
