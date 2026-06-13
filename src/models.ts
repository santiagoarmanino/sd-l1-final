import * as jsonfile from "jsonfile";
import * as path from "path";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    const filePath = path.join(__dirname, "pelis.json");
    const peliculas = await jsonfile.readFile(filePath);
    return peliculas;
  }

  async getById(id: number): Promise<Peli | undefined> {
    const peliculas = await this.getAll();
    return peliculas.find((p) => p.id === id);
  }

  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    const peliculas = await this.getAll();
    return peliculas.filter((peli) => {
      let titleMatch = true;
      let tagMatch = true;

      if (options.title) {
        titleMatch = peli.title.toLowerCase().includes(options.title.toLowerCase());
      }

      if (options.tag) {
        tagMatch = peli.tags.some((t) => t.toLowerCase() === options.tag!.toLowerCase());
      }

      return titleMatch && tagMatch;
    });
  }

  async add(peli: Peli): Promise<boolean> {
    const peliExistente = await this.getById(peli.id);
    if (peliExistente) {
      return false;
    } else {
      const peliculas = await this.getAll();
      peliculas.push(peli);
      const filePath = path.join(__dirname, "pelis.json");
      await jsonfile.writeFile(filePath, peliculas);
      return true;
    }
  }
}
export { PelisCollection, Peli };
