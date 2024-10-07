class FileSystem {
  constructor() {
    this.fileSystem = {
      "/": {
        type: "dir",
        children: {},
      },
    };
    this.currentPath = "/"; // Inicializo en el directorio raíz
  }

  // Recibe por parámetro una ruta y posiciona al usuario en la misma. Además, si el parámetro es “..”, se debe volver hacia la ruta anterior.
  cd(dirName) {
    console.log(`> cd ${dirName}`)
    if (dirName === "..") {
      if (this.currentPath !== "/") {
        const pathParts = this.currentPath.split("/");
        pathParts.pop();
        this.currentPath = pathParts.length > 1 ? pathParts.join("/") : "/";
      }
    } else {
      const newPath = this.verificarRaiz(dirName);
      if (this.fileSystem[newPath] && this.fileSystem[newPath].type === "dir") {
        this.currentPath = newPath;
      } else {
        throw new Error(`bash: cd: ${dirName}: No such file or directory`);
      }
    }
  }

  // Recibe el nombre del archivo a crear y lo crea en el directorio en donde el usuario se encuentra
  touch(fileName) {
    const currentDir = this.fileSystem[this.currentPath];
    if (!currentDir.children[fileName]) {
      currentDir.children[fileName] = { type: "file" };
      console.log(`> touch ${fileName}`);
    } else {
      console.log(`touch: cannot create file '${fileName}': File exists`);
    }
  }

  // Recibe por parámetro el nombre de una carpeta y la crea
  mkdir(dirName) {
    console.log(`> mkdir ${dirName}`);
    const currentDir = this.fileSystem[this.currentPath];
    const newDirPath = this.verificarRaiz(dirName);
    if (!currentDir.children[dirName]) {
      currentDir.children[dirName] = { type: "dir", children: {} };
      this.fileSystem[newDirPath] = currentDir.children[dirName];
    } else {
      console.log(`mkdir: cannot create directory '${dirName}': File exists`);
    }
  }

  // Lista los archivos y carpetas del directorio en donde el usuario se encuentra
  ls() {
    console.log(`> ls`)
      const currentDir = this.fileSystem[this.currentPath]; //Se obtiene el directorio actual
      const entries = Object.keys(currentDir.children); // Se obtiene uyna lista de los nombres de los archivos y directores dentro del currentDir
      if (entries.length === 0) {
        console.log('ls: directory is empty');
      } else {
        entries.forEach((entry) => {
          const suffix = currentDir.children[entry].type === "dir" ? "/" : "";
          console.log(entry + suffix);
        });
      }
  }

  // Imprime por pantalla el nombre de la ruta en donde el usuario se encuentra
  pwd() {
    console.log(`> pwd`); // Mostrar el comando en consola
    console.log(this.currentPath);
  }

  // Método que verifica si el usuario está en la raíz y construye la ruta correspondiente
  verificarRaiz(dirName) {
    try {
      return this.currentPath === "/"
        ? `/${dirName}`
        : `${this.currentPath}/${dirName}`;
    } catch (error) {
      console.error(`Error en verificarRaiz: ${error.message}`);
    }
  }

  verificarDirectorio() {
    try {
      return this.fileSystem[this.currentPath];
    } catch (error) {
      console.error(`Error al obtener el directorio actual: ${error.message}`);
      return null;
    }
  }
}

// Ejemplos de uso:
const fs = new FileSystem();

fs.mkdir("inicio"); 
fs.mkdir("inicio"); 
fs.cd("inicio"); 
fs.mkdir("user"); 
fs.cd("user"); 
fs.touch("archivo1.txt");
fs.touch("archivo1.txt");
fs.touch("archivo2.txt");
fs.ls(); 
fs.pwd();
fs.cd("..");
fs.ls();
fs.pwd(); ('/inicio')
fs.cd("..");
fs.pwd(); ('/')
