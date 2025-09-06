const local = "jogadoras";
let jogadoras = [];

const jogadorasIniciais = [{
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/175094512556786bbe51b83ae53c89e68efb23425a.png",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750945261a0833c8a1817526ac555f8d67727caf6.png",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750946630c7b03782920d35145eb4c97556d194a3.png",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/17509469717a68443f5c80d181c42967cd71612af1.png",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://static.corinthians.com.br/uploads/1750946369cdcb2f5c7b071143529ef7f2705dfbc4.png",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }];

const formJogadora = document.querySelector("#formJogadora");
const nomeJogadora = document.querySelector("#nomeJogadora");
const posicaoJogadora = document.querySelector("#posicaoJogadora");
const clubeJogadora = document.querySelector("#clubeJogadora");
const fotoJogadora = document.querySelector("#fotoJogadora");
const golsJogadora = document.querySelector("#golsJogadora");
const assistenciasJogadora = document.querySelector("#assistenciasJogadora");
const jogosJogadora = document.querySelector("#jogosJogadora");
const indiceJogadora = document.querySelector("#indiceJogadora");
const listaJogadoras = document.querySelector("#listaJogadoras");

const campoBusca = document.querySelector("#campoBusca");
const filtroClube = document.querySelector("#filtroClube");
const ordenarNomeBtn = document.querySelector("#ordenarNomeBtn");
const ordenarPosicaoBtn = document.querySelector("#ordenarPosicaoBtn");
const mostrarFavoritasBtn = document.querySelector("#mostrarFavoritasBtn");
const limparBtn = document.querySelector("#limparBtn");

let mostrarApenasFavoritas = false;
let filtroPosicaoAtivo = "";

window.onload = function () {
  carregarJogadoras();
  renderizarFiltros();
  mostrarJogadoras();
};

function salvarJogadoras() {
  localStorage.setItem(local, JSON.stringify(jogadoras));
}

function carregarJogadoras() {
  const salvo = localStorage.getItem(local);
  jogadoras = salvo ? JSON.parse(salvo) : jogadorasIniciais.slice();
  if (!salvo) salvarJogadoras();
}

formJogadora.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = nomeJogadora.value.trim();
  const posicao = posicaoJogadora.value.trim();
  const clube = clubeJogadora.value.trim();
  const foto = fotoJogadora.value.trim();
  const gols = Number(golsJogadora.value) || 0;
  const assistencias = Number(assistenciasJogadora.value) || 0;
  const jogos = Number(jogosJogadora.value) || 0;

  if (!nome || !posicao || !clube) {
    alert("Preencha: Nome, Posição e Clube.");
    return;
  }

  if (!foto) {
    alert("Por favor utilize um link da imagem da jogadora.");
    return;
  }

  const novaJogadora = {
    nome,
    posicao,
    clube,
    foto,
    gols,
    assistencias,
    jogos,
    favorita: false,
  };

  const idx = indiceJogadora.value;
  if (idx === "") {
    jogadoras.unshift(novaJogadora);
    alert("Jogadora adicionada com sucesso!");
  } else {
    novaJogadora.favorita = jogadoras[idx].favorita;
    jogadoras[idx] = novaJogadora;
    alert("Jogadora editada com sucesso!");
  }

  salvarJogadoras();
  limparFormulario();
  renderizarFiltros();
  mostrarJogadoras();
});

limparBtn.addEventListener("click", () => limparFormulario());

function limparFormulario() {
  formJogadora.reset();
  indiceJogadora.value = "";
  nomeJogadora.focus();
}

function mostrarJogadoras() {
  listaJogadoras.innerHTML = "";

  let filtradas = jogadoras.slice();

  const q = campoBusca.value.trim().toLowerCase();
  if (q) {
    filtradas = filtradas.filter(
      (j) =>
        j.nome.toLowerCase().includes(q) ||
        j.posicao.toLowerCase().includes(q)
    );
  }

  const clubeFiltro = filtroClube.value;
  if (clubeFiltro && clubeFiltro !== "Todos") {
    filtradas = filtradas.filter((j) => j.clube === clubeFiltro);
  }

  if (filtroPosicaoAtivo && filtroPosicaoAtivo !== "") {
    filtradas = filtradas.filter((j) => j.posicao === filtroPosicaoAtivo);
  }

  if (mostrarApenasFavoritas) {
    filtradas = filtradas.filter((j) => j.favorita);
  }

  filtradas.forEach((j, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="favorite-toggle ${j.favorita ? "favorited" : ""}" data-action="favoritar" data-indice="${index}">
        <i class="fa-solid fa-star"></i>
      </div>

      <img src="${j.foto}" alt="${j.nome}" />
      <h3>${j.nome}</h3>
      <p><strong>Posição:</strong> ${j.posicao}</p>
      <p><strong>Clube:</strong> ${j.clube}</p>

      <div class="stats">
        <div><small>Gols</small><div>${j.gols}</div></div>
        <div><small>Assist.</small><div>${j.assistencias}</div></div>
        <div><small>Jogos</small><div>${j.jogos}</div></div>
      </div>

      <div class="actions">
        <button class="botao" data-action="editar" data-indice="${index}"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
        <button class="botao" data-action="excluir" data-indice="${index}"><i class="fa-solid fa-trash"></i> Excluir</button>
      </div>
    `;

    card.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", tratarAcaoCard);
    });

    listaJogadoras.appendChild(card);
  });

  if (filtradas.length === 0) {
    listaJogadoras.innerHTML = `<p style="text-align:center;color:#475569">Nenhuma jogadora encontrada.</p>`;
  }
}

function editarJogadora(indice) {
  const j = jogadoras[indice];
  nomeJogadora.value = j.nome;
  posicaoJogadora.value = j.posicao;
  clubeJogadora.value = j.clube;
  fotoJogadora.value = j.foto;
  golsJogadora.value = j.gols;
  assistenciasJogadora.value = j.assistencias;
  jogosJogadora.value = j.jogos;
  indiceJogadora.value = indice;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluirJogadora(indice) {
  if (confirm("Tem certeza que deseja excluir essa jogadora?")) {
    jogadoras.splice(indice, 1);
    salvarJogadoras();
    renderizarFiltros();
    mostrarJogadoras();
    alert("Jogadora removida com sucesso!");
  }
}

function alternarFavorita(indice) {
  jogadoras[indice].favorita = !jogadoras[indice].favorita;
  salvarJogadoras();
  mostrarJogadoras();
}

function tratarAcaoCard() {
  const acao = this.dataset.action; 
  const idx = Number(this.dataset.indice);

  if (acao === "editar") editarJogadora(idx);
  else if (acao === "excluir") excluirJogadora(idx);
  else if (acao === "favoritar") alternarFavorita(idx);
}

campoBusca.addEventListener("input", mostrarJogadoras);
filtroClube.addEventListener("change", mostrarJogadoras);

function renderizarFiltros() {
  const clubes = ["Todos"];
  jogadoras.forEach((j) => {
    if (!clubes.includes(j.clube)) clubes.push(j.clube);
  });

  filtroClube.innerHTML = "";
  clubes.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filtroClube.appendChild(opt);
  });
}

let nomeAsc = true;
ordenarNomeBtn.addEventListener("click", () => {
  jogadoras.sort((a, b) =>
    a.nome.localeCompare(b.nome) * (nomeAsc ? 1 : -1)
  );
  nomeAsc = !nomeAsc;
  salvarJogadoras();
  mostrarJogadoras();
});

mostrarFavoritasBtn.addEventListener("click", () => {
  mostrarApenasFavoritas = !mostrarApenasFavoritas;
  mostrarFavoritasBtn.textContent = mostrarApenasFavoritas
    ? "Mostrar Todas"
    : "Mostrar Favoritas";
  mostrarFavoritasBtn.classList.toggle("favoritas-ativo", mostrarApenasFavoritas);
  mostrarJogadoras();
});

const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector("#ordenarPosicaoBtn");
const dropdownContent = document.querySelector("#dropdownPosicoes");

dropdownBtn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

window.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && e.target !== dropdownBtn) {
    dropdown.classList.remove("show");
  }
});

dropdownContent.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    filtroPosicaoAtivo = btn.dataset.posicao;
    dropdown.classList.remove("show");
    mostrarJogadoras();
  });
})
