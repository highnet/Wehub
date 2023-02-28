import PageJsApplication from "pagejs";
import { PageContainer } from "pagejs/components";

class Application extends PageJsApplication {
  screenSaverPage = "";
  screenSaverTimeout = 255;

  start() {
    console.log("Started Application");

    wehub.addEventListener("helloworld", "hello-client", (...args) => {
      console.log("Hello Client!", args[0]);
    });
  }

  render() {
    return (
      <PageContainer>
      </PageContainer>

    );
  }
}

let app = new Application(wehub);
