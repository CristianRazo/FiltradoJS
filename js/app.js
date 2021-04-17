//Variables

const buscador = document.querySelector("#buscador");
const marca = document.querySelector("#marca");
const anos = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
  marca: "",
  modelo: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  llenarAnos();
});

buscador.addEventListener("change", (e) => {
  if (e.target.value === "Seleccione") {
    datosBusqueda[e.target.id] = "";
  } else {
    datosBusqueda[e.target.id] = e.target.value;
  }
  filtro = filtrarAutos();
  mostrarAutos(filtro);
});

function mostrarAutos(cars) {
  resultado.innerHTML = "";
  if (cars.length > 0) {
    cars.forEach((auto) => {
      const { marca, modelo, year, precio, puertas, color, transmision } = auto;
      const autoHTML = document.createElement("p");
      autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - Precio: $${precio} - ${puertas} puertas - Color:${color} - Transmision:${transmision}
    `;

      resultado.appendChild(autoHTML);
    });
  } else {
    const sinResultados = document.createElement("div");
    sinResultados.classList.add("alerta", "error");
    sinResultados.textContent = "No se encontraron coincidencias";
    resultado.appendChild(sinResultados);
  }
}

function llenarAnos() {
  for (let i = max; i >= min; i--) {
    const anoHTML = document.createElement("option");
    anoHTML.value = i;
    anoHTML.textContent = i;
    anos.appendChild(anoHTML);
  }
}

function filtrar(autos2, dato) {
  let resultado = [];
  if (datosBusqueda[dato]) {
    if (dato === "maximo") {
      resultado = autos2.filter((auto) => {
        return auto["precio"] <= parseInt(datosBusqueda[dato]);
      });
    } else if (dato === "minimo") {
      resultado = autos2.filter((auto) => {
        return auto["precio"] >= parseInt(datosBusqueda[dato]);
      });
    } else {
      resultado = autos2.filter((auto) => {
        return auto[dato] == datosBusqueda[dato];
      });
    }

    return resultado;
  } else {
    return autos2;
  }
}

function filtrarAutos() {
  let arrayFiltrado = autos;
  campos = Object.keys(datosBusqueda);

  campos.forEach((campo) => {
    arrayFiltrado = filtrar(arrayFiltrado, campo);
  });
  console.log(arrayFiltrado);
  return arrayFiltrado;
}
