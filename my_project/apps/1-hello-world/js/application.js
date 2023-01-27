import PageJsApplication from "pagejs";
import { PageContainer } from "pagejs/components";

class Application extends PageJsApplication {
  screenSaverPage = "";
  screenSaverTimeout = 255;

  start() {
    function helloServer() {
      wehub.helloworld.logMessage("Hello Server!");
    }

    console.log("Started Application");

    wehub.addEventListener("helloworld", "hello-client", (...args) => {
      console.log("Hello Client!", args[0]);
    });

    let helloServerButton = document.getElementById("helloServer");

    helloServerButton.addEventListener("click", function () {
      helloServer();
    });
  }

  render() {
    return <PageContainer />;
  }
}

let app = new Application(wehub);
