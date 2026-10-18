(function(){
  "use strict";
  var D = window.DADOS || {}, C = D.contato || {};
  var $ = function(s){ return document.querySelector(s); };
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt) e.textContent = txt; return e; }
  function tag(){ return el("span","tag","Demonstração"); }

  // Menu mobile
  var burger = $(".burger"), nav = $("#nav");
  burger.addEventListener("click", function(){
    var open = nav.classList.toggle("aberto");
    burger.setAttribute("aria-expanded", open);
  });
  nav.addEventListener("click", function(){ nav.classList.remove("aberto"); burger.setAttribute("aria-expanded","false"); });

  // Cardápio em abas
  var abas = $(".abas"), painel = $("#painel"), btns = [];
  function mostrar(i){
    btns.forEach(function(b,j){ b.setAttribute("aria-selected", i===j); b.tabIndex = i===j ? 0 : -1; });
    var cat = D.cardapio[i];
    painel.innerHTML = "";
    painel.setAttribute("aria-labelledby", "aba-" + cat.id);
    cat.itens.forEach(function(it){
      var d = el("div","item"), l = el("div","linha"), n = el("span","",it.nome);
      if(it.demo) n.appendChild(tag());
      l.appendChild(n);
      if(it.preco) l.appendChild(el("span","preco",it.preco));
      d.appendChild(l);
      if(it.descricao) d.appendChild(el("p","",it.descricao));
      painel.appendChild(d);
    });
  }
  (D.cardapio || []).forEach(function(c,i){
    var b = el("button","aba",c.nome);
    b.id = "aba-" + c.id; b.setAttribute("role","tab");
    b.addEventListener("click", function(){ mostrar(i); });
    b.addEventListener("keydown", function(e){
      var k = e.key, n = btns.length, j = i;
      if(k==="ArrowRight") j = (i+1)%n; else if(k==="ArrowLeft") j = (i-1+n)%n; else return;
      e.preventDefault(); mostrar(j); btns[j].focus();
    });
    abas.appendChild(b); btns.push(b);
  });
  if(btns.length) mostrar(0);

  // Destaques: prato do dia e promoções
  var dl = $("#destaquesLista"), p = D.pratoDoDia || {}, promos = D.promocoes || [];
  if(p.ativo && p.nome){
    var c = el("article","cartao"); c.appendChild(el("h3","","Prato do dia"));
    c.appendChild(el("p","",p.nome + (p.preco ? " · " + p.preco : "")));
    if(p.descricao) c.appendChild(el("p","nota",p.descricao));
    dl.appendChild(c);
  }
  promos.forEach(function(x){
    var c = el("article","cartao"); c.appendChild(el("h3","",x.titulo || "Promoção"));
    if(x.descricao) c.appendChild(el("p","",x.descricao));
    if(x.validade) c.appendChild(el("p","nota","Válido: " + x.validade));
    dl.appendChild(c);
  });
  if(!dl.children.length) dl.appendChild(el("p","vazio","Em breve: prato do dia e promoções. Siga o bistrô para acompanhar."));

  // Galeria
  var gl = $("#galeriaLista");
  (D.galeria || []).forEach(function(g){
    var li = el("li","");
    if(g.src){
      var img = el("img"); img.src = g.src; img.alt = g.alt || ""; img.loading = "lazy"; li.appendChild(img);
    } else {
      li.setAttribute("role","img"); li.setAttribute("aria-label","Espaço reservado: " + (g.alt || "foto")); li.appendChild(tag());
    }
    gl.appendChild(li);
  });

  // Visita
  var end = C.endereco, wa = C.whatsapp, ig = C.instagram;
  $("#endereco").textContent = end || "Endereço a confirmar.";
  var ok = D.horariosConfirmados, h = $("#horarios");
  $("#avisoHorario").textContent = ok ? "" : "Horários em confirmação. Consulte o bistrô antes de ir.";
  (D.horarios || []).forEach(function(x){
    if(!ok || !x.horas) return;
    h.appendChild(el("dt","",x.dia)); h.appendChild(el("dd","",x.horas));
  });
  var links = $("#links");
  function link(txt, href){ var li = el("li"), a = el("a","",txt); a.href = href; a.target = "_blank"; a.rel = "noopener"; li.appendChild(a); links.appendChild(li); }
  if(wa){ link("WhatsApp", "https://wa.me/" + wa.replace(/\D/g,"") + "?text=" + encodeURIComponent("Olá! Vim pelo site do Bistrô Retrô.")); var z = $("[data-zap]"); z.href = links.querySelector("a").href; z.hidden = false; }
  if(C.telefone) links.appendChild(el("li","",C.telefone));
  if(ig) link("Instagram @" + ig, "https://www.instagram.com/" + ig + "/");
  if(end) link("Abrir rota no Google Maps", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(end));
  if(!links.children.length) links.appendChild(el("li","nota","Contatos a confirmar."));

  var mapa = $("#mapa");
  if(end){
    var f = el("iframe"); f.title = "Mapa com a localização do Bistrô Retrô"; f.loading = "lazy";
    f.src = "https://www.google.com/maps?q=" + encodeURIComponent(end) + "&output=embed"; mapa.appendChild(f);
  } else mapa.appendChild(el("p","nota","O mapa aparece aqui quando o endereço for informado em dados.js."));

  $("#ano").textContent = new Date().getFullYear();

  // SEO local: dados estruturados só com o que foi preenchido
  var ld = { "@context":"https://schema.org", "@type":"Restaurant", name: D.nome, servesCuisine: "Restaurante e bar",
    address: { "@type":"PostalAddress", addressLocality: D.cidade, addressRegion: D.estado, addressCountry:"BR" } };
  if(end) ld.address.streetAddress = end;
  if(D.url) ld.url = D.url;
  if(C.telefone) ld.telephone = C.telefone;
  if(ig) ld.sameAs = ["https://www.instagram.com/" + ig + "/"];
  if(ok){
    var dias = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], oh = [];
    D.horarios.forEach(function(x,i){
      var m = /(\d{1,2})h?(?::?(\d{2}))?\s*(?:às|a|-|–)\s*(\d{1,2})h?(?::?(\d{2}))?/i.exec(x.horas || "");
      if(m){ var z2 = function(n){ return ("0"+n).slice(-2); };
        oh.push({ "@type":"OpeningHoursSpecification", dayOfWeek: dias[i], opens: z2(m[1])+":"+(m[2]||"00"), closes: z2(m[3])+":"+(m[4]||"00") }); }
    });
    if(oh.length) ld.openingHoursSpecification = oh;
  }
  var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
})();
