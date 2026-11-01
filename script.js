/* 365 Dias com a Palavra de Deus - Voz do Altíssimo
   JavaScript puro. Estado salvo em localStorage. */
(() => {
  "use strict";

  const CHAVE = "vozAltissimo365";
  const TOTAL = 365;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Estado ---------- */
  const padrao = { atual: 1, feitos: {}, favs: {}, notas: {}, fonte: 1, leitura: false };
  let estado = carregar();

  function carregar() {
    try { return { ...padrao, ...JSON.parse(localStorage.getItem(CHAVE) || "{}") }; }
    catch { return { ...padrao }; }
  }
  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); }
    catch { avisar("Não foi possível salvar neste navegador."); }
  }

  /* ---------- Utilidades ---------- */
  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const getDia = n => window.DIAS.find(d => d.dia === n);
  const hoje = () => new Date().toISOString().slice(0, 10);
  const totalFeitos = () => Object.keys(estado.feitos).length;

  function mesDoDia(n) {
    let acc = 0;
    for (let i = 0; i < window.MESES.length; i++) {
      acc += window.MESES[i].dias;
      if (n <= acc) return i;
    }
    return 11;
  }
  function intervaloMes(i) {
    const ini = window.MESES.slice(0, i).reduce((s, m) => s + m.dias, 1);
    return [ini, ini + window.MESES[i].dias - 1];
  }
  function avisar(msg) {
    const a = $("#aviso");
    a.textContent = msg;
    a.classList.add("mostra");
    clearTimeout(avisar.t);
    avisar.t = setTimeout(() => a.classList.remove("mostra"), 2400);
  }

  /* ---------- Navegação entre telas ---------- */
  function ir(tela) {
    $$(".tela").forEach(t => t.classList.toggle("ativa", t.id === tela));
    $$("#menu button").forEach(b => b.classList.toggle("on", b.dataset.ir === tela));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (tela === "inicio") renderInicio();
    if (tela === "jornada") renderEstudo();
    if (tela === "meses") renderMeses();
    if (tela === "progresso") renderProgresso();
    if (tela === "favoritos") renderFavoritos();
    if (tela === "busca") $("#campoBusca").focus();
  }
  function abrirDia(n) {
    estado.atual = Math.min(TOTAL, Math.max(1, n));
    salvar();
    ir("jornada");
  }

  /* ---------- Início ---------- */
  function renderInicio() {
    const p = Math.round(totalFeitos() / TOTAL * 100);
    $("#barraInicio").style.width = p + "%";
    $("#textoInicio").textContent = `${totalFeitos()} de ${TOTAL} dias concluídos (${p}%)`;
    const indice = Math.floor((Date.now() / 864e5)) % window.DIAS.length;
    const pd = window.DIAS[indice];
    $("#pdRef").textContent = pd.ref;
    $("#pdTexto").textContent = pd.texto;
    $("#msgDia").textContent = window.MENSAGENS[Math.floor(Date.now() / 864e5) % window.MENSAGENS.length];
    $("#comecar").textContent = totalFeitos() ? "Continuar minha jornada" : "Começar minha jornada";
  }

  /* ---------- Estudo do dia ---------- */
  function renderEstudo() {
    const n = estado.atual, d = getDia(n), m = window.MESES[mesDoDia(n)];
    $("#irDia").value = n;
    const el = $("#estudo");

    if (!d) {
      el.innerHTML = `
        <p class="num">Dia ${n} · ${esc(m.nome)}</p>
        <h2>${esc(m.tema)}</h2>
        <div class="preparo"><p>O estudo deste dia ainda está em preparação.</p>
        <p>Navegue pelos dias disponíveis ou volte em breve.</p></div>`;
      return;
    }

    const feito = !!estado.feitos[n], fav = !!estado.favs[n];
    el.innerHTML = `
      <div class="cab">
        <div><p class="num">Dia ${n} de 365 · ${esc(m.nome)}</p>
        <h2>${esc(d.titulo)}</h2>
        <span class="tema">${esc(d.tema)}</span></div>
        ${feito ? '<p class="concluido-tag">✓ Concluído</p>' : ""}
      </div>
      <blockquote class="versiculo">${esc(d.texto)}<cite>${esc(d.ref)} · ARC</cite></blockquote>
      <div class="bloco"><h3>Explicação da passagem</h3><p>${esc(d.explicacao)}</p></div>
      <div class="bloco"><h3>Reflexão para o dia a dia</h3><p>${esc(d.reflexao)}</p></div>
      <div class="bloco destaque"><h3>Ensinamento principal</h3><p>${esc(d.ensino)}</p></div>
      <div class="bloco"><h3>Para refletir</h3><p>${esc(d.pergunta)}</p></div>
      <div class="bloco"><h3>Oração do dia</h3><p class="oracao">${esc(d.oracao)}</p></div>
      <div class="bloco"><h3>Minhas anotações</h3>
        <textarea id="nota" placeholder="Escreva o que Deus falou ao seu coração...">${esc(estado.notas[n] || "")}</textarea></div>
      <div class="acoes">
        <button class="btn" id="concluir">${feito ? "Desmarcar conclusão" : "Marcar como concluído"}</button>
        <button class="btn-sec ${fav ? "ativo" : ""}" id="favoritar">${fav ? "★ Favorito" : "☆ Favoritar"}</button>
        <button class="btn-sec" id="compartilhar">Compartilhar reflexão</button>
      </div>`;

    $("#nota").addEventListener("input", e => {
      if (e.target.value.trim()) estado.notas[n] = e.target.value; else delete estado.notas[n];
      salvar();
    });
    $("#concluir").onclick = () => {
      if (estado.feitos[n]) { delete estado.feitos[n]; avisar("Conclusão desmarcada."); }
      else { estado.feitos[n] = hoje(); avisar("Dia concluído. Deus abençoe!"); }
      salvar(); renderEstudo();
    };
    $("#favoritar").onclick = () => {
      if (estado.favs[n]) delete estado.favs[n]; else estado.favs[n] = true;
      salvar(); renderEstudo();
    };
    $("#compartilhar").onclick = () => compartilhar(d);
  }

  async function compartilhar(d) {
    const texto = `“${d.texto}” (${d.ref})\n\n${d.ensino}\n\n365 Dias com a Palavra de Deus · Voz do Altíssimo`;
    try {
      if (navigator.share) { await navigator.share({ title: d.titulo, text: texto }); return; }
      await navigator.clipboard.writeText(texto);
      avisar("Reflexão copiada. Cole onde quiser compartilhar.");
    } catch (e) {
      if (e && e.name === "AbortError") return;
      window.prompt("Copie a reflexão:", texto);
    }
  }

  /* ---------- Meses ---------- */
  let mesAberto = null;
  function renderMeses() {
    const box = $("#listaMeses");
    box.innerHTML = "";
    window.MESES.forEach((m, i) => {
      const [a, b] = intervaloMes(i);
      const feitos = Object.keys(estado.feitos).filter(k => k >= a && k <= b).length;
      const btn = document.createElement("button");
      btn.className = "cartao mes" + (mesAberto === i ? " on" : "");
      btn.innerHTML = `<h3>${esc(m.nome)}</h3><small>${esc(m.tema)}</small><small>${feitos}/${m.dias} dias</small>`;
      btn.onclick = () => { mesAberto = i; renderMeses(); };
      box.appendChild(btn);
    });
    const dm = $("#diasDoMes");
    dm.innerHTML = "";
    if (mesAberto === null) return;
    const [a, b] = intervaloMes(mesAberto);
    for (let n = a; n <= b; n++) {
      const x = document.createElement("button");
      x.className = "dia-btn" + (estado.feitos[n] ? " ok" : "");
      x.textContent = n;
      x.title = getDia(n)?.titulo || "Em preparação";
      x.onclick = () => abrirDia(n);
      dm.appendChild(x);
    }
  }

  /* ---------- Progresso ---------- */
  function sequencia() {
    const datas = new Set(Object.values(estado.feitos));
    let seq = 0, d = new Date();
    if (!datas.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
    while (datas.has(d.toISOString().slice(0, 10))) { seq++; d.setDate(d.getDate() - 1); }
    return seq;
  }
  function renderProgresso() {
    const f = totalFeitos(), p = Math.round(f / TOTAL * 100);
    $("#stConcluidos").textContent = f;
    $("#stRestantes").textContent = TOTAL - f;
    $("#stPorc").textContent = p + "%";
    $("#stSeq").textContent = sequencia();
    $("#barraProg").style.width = p + "%";
    const cal = $("#calendario");
    cal.innerHTML = "";
    for (let n = 1; n <= TOTAL; n++) {
      const b = document.createElement("button");
      b.textContent = n;
      b.className = (estado.feitos[n] ? "ok " : "") + (n === estado.atual ? "atual" : "");
      b.setAttribute("aria-label", `Dia ${n}`);
      b.onclick = () => abrirDia(n);
      cal.appendChild(b);
    }
  }

  /* ---------- Listas (favoritos e busca) ---------- */
  function itemLista(d) {
    const b = document.createElement("button");
    b.className = "item";
    b.innerHTML = `<span><strong>Dia ${d.dia} · ${esc(d.titulo)}</strong><br><small>${esc(d.tema)} · ${esc(d.ref)}</small></span>
                   <span>${estado.feitos[d.dia] ? "✓" : ""}${estado.favs[d.dia] ? " ★" : ""}</span>`;
    b.onclick = () => abrirDia(d.dia);
    return b;
  }
  function renderFavoritos() {
    const box = $("#listaFav");
    box.innerHTML = "";
    const favs = window.DIAS.filter(d => estado.favs[d.dia]);
    if (!favs.length) { box.innerHTML = '<p class="vazio">Você ainda não favoritou nenhum estudo.</p>'; return; }
    favs.forEach(d => box.appendChild(itemLista(d)));
  }
  const norm = t => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  function buscar() {
    const q = norm($("#campoBusca").value.trim());
    const box = $("#resultados");
    box.innerHTML = "";
    if (!q) return;
    const achou = window.DIAS.filter(d => norm(`${d.titulo} ${d.tema} ${d.ref} dia ${d.dia}`).includes(q));
    if (!achou.length) { box.innerHTML = '<p class="vazio">Nenhum estudo encontrado.</p>'; return; }
    achou.forEach(d => box.appendChild(itemLista(d)));
  }

  /* ---------- Fonte e modo leitura ---------- */
  function aplicarPrefs() {
    document.documentElement.style.setProperty("--fonte", estado.fonte);
    document.body.classList.toggle("leitura", estado.leitura);
    $("#modoLeitura").setAttribute("aria-pressed", estado.leitura);
  }

  /* ---------- Eventos ---------- */
  function iniciar() {
    $("#ano").textContent = new Date().getFullYear();
    $$("[data-ir]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); ir(el.dataset.ir); }));
    $("#comecar").onclick = () => abrirDia(estado.atual);
    $("#continuar").onclick = () => abrirDia(estado.atual);
    $("#diaAnterior").onclick = () => abrirDia(estado.atual - 1);
    $("#diaProximo").onclick = () => abrirDia(estado.atual + 1);
    $("#irDiaBtn").onclick = () => abrirDia(parseInt($("#irDia").value, 10) || 1);
    $("#irDia").addEventListener("keydown", e => { if (e.key === "Enter") $("#irDiaBtn").click(); });
    $("#campoBusca").addEventListener("input", buscar);
    $("#fonteMais").onclick = () => { estado.fonte = Math.min(1.5, +(estado.fonte + .1).toFixed(1)); salvar(); aplicarPrefs(); };
    $("#fonteMenos").onclick = () => { estado.fonte = Math.max(.8, +(estado.fonte - .1).toFixed(1)); salvar(); aplicarPrefs(); };
    $("#modoLeitura").onclick = () => { estado.leitura = !estado.leitura; salvar(); aplicarPrefs(); };
    $("#zerar").onclick = () => {
      if (confirm("Reiniciar a jornada? Seu progresso, favoritos e anotações serão apagados.")) {
        estado = { ...padrao }; salvar(); aplicarPrefs(); renderProgresso(); avisar("Jornada reiniciada.");
      }
    };
    aplicarPrefs();
    ir("inicio");
  }
  document.addEventListener("DOMContentLoaded", iniciar);
})();