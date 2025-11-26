// Máscara telefone (XX) XXXXX-XXXX
const tel = document.getElementById("telefone");
tel.addEventListener("input", function () {
  let v = tel.value.replace(/\D/g, "");
  if (v.length > 2) v = "(" + v.substring(0, 2) + ") " + v.substring(2);
  if (v.length > 10) v = v.substring(0, 10) + "-" + v.substring(10, 14);
  tel.value = v;
});

// Máscara CEP 00000-000
const cep = document.getElementById("cep");
cep.addEventListener("input", () => {
  cep.value = cep.value.replace(/\D/g, "").replace(/(\d{5})(\d{1,3})/, "$1-$2");
});

// Buscar endereço automaticamente via ViaCEP
cep.addEventListener("blur", async () => {
  const cleanCep = cep.value.replace(/\D/g, "");
  if (cleanCep.length !== 8) return;

  const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  const data = await res.json();

  if (!data.erro) {
    document.getElementById("endereco").value = 
      `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
  }
});

// Exibir campos do cartão apenas quando necessário
const pagamento = document.getElementById("pagamento");
const cartaoInfo = document.getElementById("cartao-info");

pagamento.addEventListener("change", () => {
  if (pagamento.value === "credito" || pagamento.value === "debito") {
    cartaoInfo.classList.remove("hidden");
  } else {
    cartaoInfo.classList.add("hidden");
  }
});

// Máscaras cartão
document.getElementById("num-cartao").addEventListener("input", function(){
  this.value = this.value
    .replace(/\D/g, "")
    .replace(/(\d{4})(?=\d)/g, "$1 ");
});

document.getElementById("validade").addEventListener("input", function(){
  this.value = this.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{1,2})/, "$1/$2");
});

// Finalizar pedido
document.getElementById("form-entrega").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Pedido finalizado com sucesso!");
});
