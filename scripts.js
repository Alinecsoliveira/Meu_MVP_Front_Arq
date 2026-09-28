const API = "http://127.0.0.1:5000";

/* Utilitário para mensagens */
function showMessage(elementId, message, type = "sucesso") {
  const div = document.getElementById(elementId);
  if (!div) {
    console.error(`Elemento #${elementId} não encontrado`);
    return;
  }
  div.innerHTML = `<p class="${type}">${message}</p>`;
}

/* Listagem */
async function getList() {
  try {
    const resp = await fetch(`${API}/pokemons`);
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const data = await resp.json();

    const table = document.getElementById("myTable");
    table.innerHTML = `
      <tr>
        <th>ID</th><th>Nome</th><th>Tipo</th><th>Nível</th><th>Ações</th>
      </tr>`;

    data.pokemons.forEach(p =>
      insertList(p.id, p.nome, p.tipo, p.nivel)
    );
  } catch (error) {
    console.error("Erro em getList:", error);
    showMessage("cadastroResult", "⚠️ Não foi possível carregar a lista.", "erro");
  }
}
getList();

/* Cadastro */
async function postItem(nome, tipo, nivel) {
  try {
    const body = { nome, tipo, nivel: parseInt(nivel) };
    const resp = await fetch(`${API}/cadastrar_pokemon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const data = await resp.json();

    if (data.erro) {
      showMessage("cadastroResult", `⚠️ ${data.erro}`, "erro");
    } else {
      showMessage("cadastroResult", `✅ Pokémon <strong>${data.nome}</strong> cadastrado com sucesso!`, "sucesso");
      getList();
    }
  } catch (error) {
    console.error("Erro em postItem:", error);
    showMessage("cadastroResult", "⚠️ Falha ao cadastrar Pokémon.", "erro");
  }
}

/* Deletar */
async function deleteItem(id) {
  try {
    const resp = await fetch(`${API}/deletar_pokemon?id=${id}`, { method: "DELETE" });
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const data = await resp.json();

    if (data.erro) {
      showMessage("deletarResult", `⚠️ ${data.erro}`, "erro");
    } else {
      showMessage("deletarResult", `🗑️ Pokémon ID <strong>${id}</strong> deletado com sucesso!`, "sucesso");
      getList();
    }
  } catch (error) {
    console.error("Erro em deleteItem:", error);
    showMessage("deletarResult", "⚠️ Falha ao deletar Pokémon.", "erro");
  }
}

/* Buscar */
async function buscarPokemon() {
  try {
    const id = document.getElementById("buscarId").value;
    const resp = await fetch(`${API}/buscar_pokemon?id=${id}`);
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const data = await resp.json();

    if (data.erro) {
      showMessage("buscarResult", `⚠️ ${data.erro}`, "erro");
    } else {
      document.getElementById("buscarResult").innerHTML = `
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Tipo:</strong> ${data.tipo}</p>
        <p><strong>Nível:</strong> ${data.nivel}</p>
      `;
    }
  } catch (error) {
    console.error("Erro em buscarPokemon:", error);
    showMessage("buscarResult", "⚠️ Falha ao buscar Pokémon.", "erro");
  }
}

/* Formulário */
function newItem() {
  let nome = document.getElementById("nome").value;
  let tipo = document.getElementById("tipo").value;
  let nivel = document.getElementById("nivel").value;

  if (nome === "" || tipo === "" || nivel === "") {
    alert("Preencha todos os campos!");
  } else if (isNaN(nivel)) {
    alert("Nível precisa ser um número!");
  } else {
    postItem(nome, tipo, nivel);
    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("nivel").value = "";
  }
}

/* Inserir na tabela */
function insertList(id, nome, tipo, nivel) {
  const table = document.getElementById("myTable");
  const row = table.insertRow();

  [id, nome, tipo, nivel].forEach(val => {
    const cel = row.insertCell();
    cel.textContent = val;
  });

  // botão excluir
  const cel = row.insertCell();
  const btn = document.createElement("button");
  btn.textContent = "Deletar";
  btn.onclick = () => { deleteItem(id); row.remove(); };
  cel.appendChild(btn);
}

/* Atualizar */
async function updatePokemon() {
  try {
    const id = document.getElementById("updateId").value;
    const nome = document.getElementById("updateNome").value;
    const tipo = document.getElementById("updateTipo").value;
    const nivel = document.getElementById("updateNivel").value;

    const body = { nome, tipo, nivel: parseInt(nivel) };

    const resp = await fetch(`${API}/atualizar_pokemon?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const data = await resp.json();

    if (data.message) {
      showMessage("updateResult", `⚠️ ${data.message}`, "erro");
    } else {
      showMessage("updateResult", `✏️ Pokémon ID <strong>${id}</strong> atualizado com sucesso!`, "sucesso");
      getList();
    }
  } catch (error) {
    console.error("Erro em updatePokemon:", error);
    showMessage("updateResult", "⚠️ Falha ao atualizar Pokémon.", "erro");
  }
}

/* Buscar na PokéAPI */
async function buscarPokemonExterno() {
  try {
    const nome = document.getElementById("buscarNomeExterno").value;
    const resp = await fetch(`${API}/pokemon_externo?nome=${nome}`);
    if (!resp.ok) throw new Error(`Erro HTTP: ${resp.status}`);
    const data = await resp.json();

    document.getElementById("buscarExternoResult").innerHTML = `
      <p><strong>Nome:</strong> ${data.nome}</p>
      <p><strong>Altura:</strong> ${data.altura}</p>
      <p><strong>Peso:</strong> ${data.peso}</p>
      <p><strong>Habilidades:</strong> ${data.habilidades.join(", ")}</p>
    `;
  } catch (error) {
    console.error("Erro em buscarPokemonExterno:", error);
    showMessage("buscarExternoResult", "⚠️ Falha ao buscar na PokéAPI.", "erro");
  }
}





