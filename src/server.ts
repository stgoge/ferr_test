import fastify, { FastifyRequest } from "fastify";
import { Builder } from "./Builder.js";

const PORT = 8080;

const isUrl = (str: string) => {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(str);
};

const server = fastify();

export default (builder: Builder) => {
  server.get("/", async (req: CustomRequestType, res) => {
    const { url } = req.query;

    if (!isUrl(url)) {
      res.code(400).send("Incorrect url.");
    }

    try {
      await builder.build(url, res);
      res.code(200).send();
    } catch (err) {
      res.code(500).send(err);
    }
  });

  server.listen({ port: PORT }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

type CustomRequestType = FastifyRequest<{
  Querystring: {
    url: string;
  };
}>;
