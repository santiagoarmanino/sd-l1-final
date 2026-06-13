# Consigna de implementación: Sistema de Películas (TypeScript)

## Objetivo

Implementar un sistema de gestión de películas utilizando `pelis.json`,
`models.ts`, `controller.ts` e `index.ts`.

## pelis.json

-   Crear `pelis.json` con al menos 3 películas.
-   Estructura:

``` ts
{
  id: number;
  title: string;
  tags: string[];
}
```

-   `tags` es plural porque una película puede tener varios tags.
-   Esto es distinto del argumento `--tag` usado para buscar.

## models.ts

Completar `PelisCollection`. Todos los métodos deben ser asincrónicos.

### add(peli: Peli): Promise`<boolean>`{=html}

-   Agrega una película.
-   No permite IDs repetidos.
-   Devuelve `true` si se guardó correctamente.
-   Devuelve `false` si el ID ya existe o si ocurre un error al
    escribir.

### getAll(): Promise\<Peli\[\]\>

Devuelve todas las películas.

### getById(id: number): Promise\<Peli \| undefined\>

Devuelve la película correspondiente al ID o `undefined` si no existe.

### search(options)

``` ts
type SearchOptions = {
  title?: string;
  tag?: string;
};
```

-   Si `title` está presente, buscar películas cuyo título contenga ese
    texto.
-   Si `tag` está presente, buscar películas cuyo arreglo `tags`
    contenga ese valor.
-   Si ambos existen, aplicar ambos filtros.

## controller.ts

Instanciar `PelisCollection` en el constructor.

### get(options?)

``` ts
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};
```

Comportamiento: - Sin parámetros: devolver todas las películas. - Con
`id`: devolver esa película (como arreglo; si no existe, arreglo
vacío). - Con `search.title`: filtrar por título. - Con `search.tag`:
filtrar por tag. - Con ambos: aplicar ambos filtros.

### getOne(options)

Debe devolver simplemente el primer resultado de `get(options)`.

### add(peli)

Debe delegar la creación de la película al modelo.

## index.ts

Usar `minimist`.

Comandos esperados:

``` bash
npx tsx ./src/index.ts add --id=4411 --title="Título de la nueva peli" --tags=action --tags=classic

npx tsx ./src/index.ts get 4411

npx tsx ./src/index.ts search --title="a"

npx tsx ./src/index.ts search --tag="classic"

npx tsx ./src/index.ts search --title="x" --tag="action"

npx tsx ./src/index.ts
```

## Requisitos generales

-   Usar programación asincrónica.
-   No permitir IDs duplicados.
-   `get` devuelve siempre un arreglo.
-   `getOne` devuelve el primer resultado.
-   Distinguir correctamente `tags` (modelo) de `tag` (búsqueda CLI).
-   Reutilizar la lógica del modelo desde el controlador.
