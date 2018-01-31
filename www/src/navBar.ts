/**
 * NavBar class.
 */
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";
import { bindable, customElement } from "aurelia-templating";

@customElement("nav-bar")
export class NavBar {
    @bindable
    public router: Router;
}
