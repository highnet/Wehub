import PageJsApplication from "pagejs";
import { PageContainer } from "pagejs/components";

class Application extends PageJsApplication {
  screenSaverPage = "";
  screenSaverTimeout = 255;
  start() {
    console.log("Started Application");
    wehub.helloworld.logMessage("Hello World!");
  }
  render() {
    return <PageContainer></PageContainer>;
  }
}

let app = new Application(wehub);
