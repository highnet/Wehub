import PageJsApplication from "pagejs";
import { PageContainer } from "pagejs/components";
import CalculatorPage from "./calculatorPage";

class Application extends PageJsApplication {
  screenSaverPage = "";
  screenSaverTimeout = 255;

  start() {
    return;
    function helloServer() {
      wehub.helloworld.logMessage("Hello Server!");
    }

    function sendStatus() {
      wehub.helloworld.sendStatus(document.querySelector('input[name="happyness-status"]:checked').value);
    }

    console.log("Started Application");

    wehub.addEventListener("helloworld", "hello-client", (...args) => {
      console.log("Hello Client!", args[0]);
    });

    let helloServerButton = document.getElementById("helloServer");

    helloServerButton.addEventListener("click", function () {
      helloServer();
    });

    let sendStatusButton = document.getElementById("sendStatus");

    sendStatusButton.addEventListener("click", function () {
      sendStatus();
    });
  }

  render() {
    return (
      <PageContainer>
        <CalculatorPage />
      </PageContainer>
    );
  }
}

let app = new Application(wehub);
