import { Component, OnInit } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import JSPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.page.html',
  styleUrls: ['./pdf.page.scss'],
})
export class PDFPage {

  constructor(private file: File,
    private fileOpener: FileOpener
  ) { }
  createPdf() {
    const pdfEle = document.getElementById("pdf-container");

    const options = {
      background: "white",
      height: pdfEle.clientWidth,
      width: pdfEle.clientHeight
    };

    domtoimage.toPng(pdfEle, options).then((filePath) => {

      var jsPdfDoc = new JSPDF("p", "mm", "a4");

      jsPdfDoc.addImage(filePath, 'PNG', 12, 12, 240, 180);

      let docRes = jsPdfDoc.output();
      let arrayBuffer = new ArrayBuffer(docRes.length);
      let uintArray = new Uint8Array(arrayBuffer);

      for (var i = 0; i < docRes.length; i++) {
        uintArray[i] = docRes.charCodeAt(i);
      }


      const directory = this.file.dataDirectory;
      const pdfFile = "pdfFile.pdf";

      let iWriteOptions: IWriteOptions = {
        replace: true
      };

      this.file.checkFile(directory, pdfFile).then((res) => {
        console.log(res)
        this.file.writeFile(directory, pdfFile, arrayBuffer, iWriteOptions)
          .then((res) => {
            console.log("File generated" + JSON.stringify(res));
            this.fileOpener.open(this.file.dataDirectory + pdfFile, '/pdf')
              .then(() => console.log('File is exported'))
              .catch(e => console.log(e));
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
          });
      })
        .catch((error) => {
          this.file.writeFile(directory, pdfFile, arrayBuffer)
            .then((res) => {

              console.log("File created" + JSON.stringify(res));

              this.fileOpener.open(this.file.dataDirectory + pdfFile, '/pdf')
                .then(() => console.log('File exported'))
                .catch(e => console.log(e));
            })
            .catch((error) => {
              console.log(JSON.stringify(error));
            });
        });
    })
      .catch(function (error) {
        console.error(error);
      });
  }
}