import { FastifyReply } from "fastify";

export abstract class AbstractExporter {
  abstract export(data: string, response: FastifyReply): Promise<void>;
}
