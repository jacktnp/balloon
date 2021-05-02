<template>
  <div>
    <h4>test</h4>

    <canvas
      id="mycanvas"
      width="940"
      height="570"
      style="display: none"
    ></canvas>
    <h4>test</h4>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";
import { saveAs } from "file-saver";
import { createCanvas, loadImage } from "canvas";
import JSZip from "jszip";
export default {
  components: { navbar },
  data() {
    return {
      equipment: {},
      device: [],
      item: "",
      items: [],
    };
  },
  methods: {
    downloadItem() {
      axios
        .get(
          "https://dev.initerapp.com/qrcode.php?id=1234&name=%E0%B8%9F%E0%B8%AB%E0%B8%81%E0%B8%9F%E0%B8%AB%E0%B8%81%20111&fbclid=IwAR3Z7ISfaxk97wAT7um4oMZSydRWRDr0BsA0ifR18gL3stz4YXacf_-3TvA",
          { responseType: "blob" }
        )
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/png" });

          saveAs(blob, "jackthanapon.png");
        })
        .catch(console.error);
    },
    doDraw() {
      const canvas = createCanvas(400, 500);
      const context = canvas.getContext("2d");
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.src =
        "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=99";
      // Loading Pictures
      img.onload = function () {
        if (img.complete) {
          // The lengths and widths of canvas are reset according to the image
          canvas.setAttribute("width", img.width);
          canvas.setAttribute("height", img.height + 100);
          // Draw pictures
          context.drawImage(img, 0, 0, img.width, img.height);
          context.font = "50px Arial bolder";
          context.fillStyle = "red";
          context.fillText("ณรงค์เดช ปิ่นปรีชาัย", 40, 600);
          let url = canvas.toDataURL("image/jpg");

          // let a = document.createElement("a");
          // let event = new MouseEvent("click");
          // a.download = "name";
          // a.href = url;
          // a.dispatchEvent(event);
          fetch(url)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], "File name", { type: "image/png" });
              let zip = new JSZip();
              zip.file("jackLOVEjabon.png", file);
              zip.generateAsync({ type: "blob" }).then(function (content) {
                saveAs(content, "jackLOVEjabon.zip");
              });
            });
        }
      };
      // Get canvas

      // var canvas = document.getElementById("mycanvas");
      // // Make sure you get it because of the bullet window
      // var a = setInterval(() => {
      //   // Repeated acquisition
      //   var canvas = new Canvas();
      //   console.log('asdsad')
      //   canvas.toBlob(function (blob) {
      //     link.href = URL.createObjectURL(blob);
      //     console.log(blob);
      //     console.log(link.href); // this line should be here
      //   }, "image/png");
      //   if (!canvas) {
      //     return false;
      //   } else {
      //     clearInterval(a);
      //     // Can be understood as a brush, can draw paths, rectangles, text, images
      //     var context = canvas.getContext("2d");
      //     var img = new Image();
      //     img.src =
      //       "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=99";
      //     // Loading Pictures
      //     img.onload = function () {
      //       if (img.complete) {
      //         // The lengths and widths of canvas are reset according to the image
      //         canvas.setAttribute("width", img.width);
      //         canvas.setAttribute("height", img.height + 100);
      //         // Draw pictures
      //         context.drawImage(img, 0, 0, img.width, img.height);
      //         context.font = "50px Arial bolder";
      //         context.fillStyle = "red";
      //         context.fillText("ณรงค์เดช ปิ่นปรีชาัย", 40, 600);
      //       }
      //     };
      //   }
      //   canvas.toBlob(function (blob) {
      //     link.href = URL.createObjectURL(blob);
      //     console.log(blob);
      //     console.log(link.href); // this line should be here
      //   }, "image/png");
      // }, 1);
    },
  },
  mounted() {
    // this.downloadItem();
    this.doDraw();
  },
};
</script>
