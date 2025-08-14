declare module "pdf-parse" {
    function pdfParse(
        dataBuffer: Buffer | Uint8Array,
        options?: any
    ): Promise<{ text: string; numpages: number; numrender: number; info: any; metadata: any; version: string }>;

    export = pdfParse;
}
