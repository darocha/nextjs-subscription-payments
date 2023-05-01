
import { CopyToClipboardIcon } from "@/icons/index";

export default function CopyToClipboard(textToCopy) {
  
  // const withExecCopy = (text) => {
  //   const textArea = document.createElement("textarea");
  //   textArea.value = text;
  //   document.body.appendChild(textArea);
  //   textArea.focus();
  //   textArea.select();

  //   try {
  //     var successful = document.execCommand("copy");
  //     var msg = successful ? "successful" : "unsuccessful";
  //     console.log("Fallback: Copying text command was " + msg);
  //     text;
  //   } catch (err) {
  //     console.error("Fallback: Oops, unable to copy", err);
  //   }

  //   document.body.removeChild(textArea);
  // };

  const copy = () => {
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };

  // button.addEventListener("click", (e) => {
  //   button.textContent = "COPIED";

  //   setTimeout(() => {
  //     button.textContent = "COPY";
  //   }, 2000);

  //   withClipboardAPICopy(textToCopy);
  //   //withExecCopy(copyText);
  // });

  // input.addEventListener("change", (e) => {
  //   console.log(e.target.value);
  //   copyText = e.target.value;
  // });

  return (<button onClick={() => copy()} >
              <CopyToClipboardIcon />
          </button>);
}
