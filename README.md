#Недочеты:

1. TextToPdfListProcessor.process должен возвращать Promise<string>, а не Promise<Uint8Array>
2. отправку pdf надо убрать из сервера во внешний класс. PdfExporter, например, наследник AbstractExporter. AbstractExporter.export(data: string, response: FastifyReply) - куда-то экспортирует дату и что-то отправляет в response, например.
3. наверное, лучше все таки processors разделить на этапы, что-то типа: loaders, parsers, processors, exporters.
4.
