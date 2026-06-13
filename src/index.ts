import minimist from "minimist";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function main() {
  const params = parseaParams(process.argv.slice(2));
  const controller = new PelisController();
  let result;

  if (params._[0] === "add") {
    let tags = [];
    if (params.tags) {
      if (Array.isArray(params.tags)) {
        tags = params.tags;
      } else {
        tags = [params.tags];
      }
    }

    result = await controller.add({
      id: Number(params.id),
      title: params.title,
      tags: tags,
    });
  } else if (params._[0] === "get") {
    const id = Number(params._[1]);
    result = await controller.get({ id: id });
  } else if (params._[0] === "search") {
    result = await controller.get({
      search: {
        title: params.title,
        tag: params.tag,
      },
    });
  } else {
    result = await controller.get();
  }

  console.log(result);
}

main();
