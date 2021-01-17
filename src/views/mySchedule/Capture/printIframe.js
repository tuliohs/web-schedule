
export default function printIframe(content) {
  console.log('content', content)
  const ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", "printFrame");
  ifrm.setAttribute("name", "printFrame");
  ifrm.style.width = "0px";
  ifrm.style.height = "0px";
  document.body.appendChild(ifrm);
  const printFrame = window.frames["printFrame"];
  printFrame.document.write(content);
  printFrame.document.write(
    "<script>window.onload = function() { window.print(); }</script>"
  );
  printFrame.document.close();
  setTimeout(function () {
    // need to remove print elements on the next tick otherwise print preview doesn't always display styles
    ifrm.remove();
  }, 0);
}
