/**
 * Main application class.
 */
import { Router, RouterConfiguration } from "aurelia-router";

export class App {
    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router): any {
        config.title = "IOTA.eco";
        config.map([
            {
                route: ["", "projects"],
                name: "projects",
                moduleId: "./projects/projects",
                nav: true,
                title: "Projects"
            }
        ]);

        this.router = router;
    }
}
