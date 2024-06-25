import hummus, { PDFReader, WriteStream } from "muhammara";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";

const kTemplateFilePath = "../../public/invitation-template.pdf";
const kFontFilePath = "../../public/Montserrat-Regular.ttf";
const kFontColor = "688680";
const kMaxCharacters = 40;

type Size = {
  height: number;
  width: number;
};

type PdfContent = {
  name: string;
};

class PdfGenerator {
  textYPos: number = 100;

  pdfBuffer: Buffer;
  pageSize: Size;

  constructor(filepath = kTemplateFilePath) {
    this.pdfBuffer = fs.readFileSync(path.join(__dirname, kTemplateFilePath));
    const inStream = new hummus.PDFRStreamForBuffer(this.pdfBuffer);
    const pdfReader = hummus.createReader(inStream);
    const mediaSize = pdfReader.parsePage(0).getMediaBox();
    this.pageSize = {
      height: mediaSize[3],
      width: mediaSize[2],
    };
  }

  generatePdf(text: string) {
    const outStream = new hummus.PDFWStreamForFile(
      path.join(__dirname, `../../public/${text}.pdf`)
    );
    this.generatePdfToStream(text, outStream);
  }

  generatePdfToStream(text: string, outStream: WriteStream) {
    const inStream = new hummus.PDFRStreamForBuffer(this.pdfBuffer);
    const pdfWriter = hummus.createWriterToModify(inStream, outStream);
    const font = pdfWriter.getFontForFile(path.join(__dirname, kFontFilePath));
    const { width } = font.calculateTextDimensions(text, 12);
    const textXPos = (this.pageSize.width - width) / 2;
    const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0, true);
    pageModifier
      .startContext()
      .getContext()
      .writeText(text, textXPos, this.textYPos, {
        font: font,
        size: 12,
        color: kFontColor,
      });
    pageModifier.endContext().writePage();
    pdfWriter.end();
  }
}

export default class PdfGeneratorController {
  pdfGenerator: PdfGenerator;

  constructor() {
    this.pdfGenerator = new PdfGenerator();
  }

  generatePdfWithText(req: Request, res: Response) {
    const pdfContent: PdfContent = req.body;
    res.writeHead(200, { "Content-Type": "application/pdf" });
    const outStream = new hummus.PDFStreamForResponse(res);
    this.pdfGenerator.generatePdfToStream(
      pdfContent.name.substring(0, kMaxCharacters),
      outStream
    );
    res.end();
  }
}
