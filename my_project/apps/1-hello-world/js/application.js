import PageJsApplication from "pagejs";
import { AppContainer } from "pagejs/components";

class Application extends PageJsApplication {
  screenSaverPage = "";
  screenSaverTimeout = 255;
  start() {}
  render() {
    return <AppContainer></AppContainer>;
  }
}

let app = new Application(wehub);
