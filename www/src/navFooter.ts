/**
 * NavFooter class.
 */
/// <reference types="unitejs-types" />
import { customElement } from "aurelia-templating";
import moment from "moment";

@customElement("nav-footer")
export class NavFooter {
    public buildDateTime: string;
    public packageVersion: string;

    constructor() {
        this.buildDateTime = moment(new Date(window.unite.buildDateTime)).format("MMMM Do YYYY, h:mm a");
        this.packageVersion = window.unite.packageVersion;
    }
}
